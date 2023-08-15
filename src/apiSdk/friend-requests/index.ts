import axios from 'axios';
import queryString from 'query-string';
import { FriendRequestInterface, FriendRequestGetQueryInterface } from 'interfaces/friend-request';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFriendRequests = async (
  query?: FriendRequestGetQueryInterface,
): Promise<PaginatedInterface<FriendRequestInterface>> => {
  const response = await axios.get('/api/friend-requests', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFriendRequest = async (friendRequest: FriendRequestInterface) => {
  const response = await axios.post('/api/friend-requests', friendRequest);
  return response.data;
};

export const updateFriendRequestById = async (id: string, friendRequest: FriendRequestInterface) => {
  const response = await axios.put(`/api/friend-requests/${id}`, friendRequest);
  return response.data;
};

export const getFriendRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/friend-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFriendRequestById = async (id: string) => {
  const response = await axios.delete(`/api/friend-requests/${id}`);
  return response.data;
};
