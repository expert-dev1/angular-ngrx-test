import { createAction, props } from '@ngrx/store';
import { User } from '../model/user';

export const getAllUsers = createAction(
  '[User Component] Get all users',
  props<{ users: User[] }>()
);

export const createUser = createAction(
  '[Add User Component] Create new user',
  props<{ user: User }>()
);
