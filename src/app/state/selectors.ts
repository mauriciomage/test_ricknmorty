import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CharacterState } from './reducers';

export const selectCharacterState =
  createFeatureSelector<CharacterState>('character');

export const selectAllCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characters?.results
);

export const selectCharacterDetail = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characterDetail
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.loading
);

export const selectCurrentPage = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.currentPage
);
