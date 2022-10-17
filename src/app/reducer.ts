import { ActionReducerMap } from '@ngrx/store';
import * as fromUsers from './store/users.reducer';

export interface AppState {
  users: fromUsers.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  users: fromUsers.reducer
};
