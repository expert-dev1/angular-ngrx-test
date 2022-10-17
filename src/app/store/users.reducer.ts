import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../model/user';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { UserActions } from './action-types';

export const usersFeatureKey = 'users';

export interface UsersState extends EntityState<User> {}

export const adapter = createEntityAdapter<User>({
  selectId: ({ email }) => email
});

export const initialUserDataState = adapter.getInitialState({});

export const { selectAll } = adapter.getSelectors();

const usersReducer = createReducer<UsersState>(
  initialUserDataState,
  on(UserActions.getAllUsers, (state, { users }) => adapter.setAll(users, { ...state })),
  on(UserActions.createUser, (state, { user }) => adapter.addOne(user, { ...state})),
);

export function reducer(state: UsersState, action: Action) {
  return usersReducer(state, action);
}
