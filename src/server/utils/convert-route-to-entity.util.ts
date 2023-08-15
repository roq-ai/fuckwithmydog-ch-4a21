const mapping: Record<string, string> = {
  companies: 'company',
  'friend-requests': 'friend_request',
  pets: 'pet',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
