import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { friendRequestValidationSchema } from 'validationSchema/friend-requests';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.friend_request
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFriendRequestById();
    case 'PUT':
      return updateFriendRequestById();
    case 'DELETE':
      return deleteFriendRequestById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFriendRequestById() {
    const data = await prisma.friend_request.findFirst(convertQueryToPrismaUtil(req.query, 'friend_request'));
    return res.status(200).json(data);
  }

  async function updateFriendRequestById() {
    await friendRequestValidationSchema.validate(req.body);
    const data = await prisma.friend_request.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteFriendRequestById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.friend_request.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
