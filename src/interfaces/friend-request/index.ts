import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FriendRequestInterface {
  id?: string;
  sender_id?: string;
  receiver_id?: string;
  created_at?: any;
  updated_at?: any;

  user_friend_request_sender_idTouser?: UserInterface;
  user_friend_request_receiver_idTouser?: UserInterface;
  _count?: {};
}

export interface FriendRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  sender_id?: string;
  receiver_id?: string;
}
