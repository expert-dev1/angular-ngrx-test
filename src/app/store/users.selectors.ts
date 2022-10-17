import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUserDataState = createFeatureSelector<fromUsers.UsersState>('users');

export const selectAllUsers = createSelector(
  selectUserDataState,
  fromUsers.selectAll
);