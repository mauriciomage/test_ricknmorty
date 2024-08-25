import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CharacterState, characterStateFeatureKey } from './reducers';

const selectCharacterState = createFeatureSelector<CharacterState>(
  characterStateFeatureKey
);

export const selectAllCharacters = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characters?.results || []
);

export const selectCharactersByPage = (page: number) =>
  createSelector(
    selectCharacterState,
    (state: CharacterState) => state.charactersByPage[page] || []
  );

export const selectCharacterDetail = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.characterDetail
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state: CharacterState) => {
    return state.loading;
  }
);

export const selectCurrentPage = createSelector(
  selectCharacterState,
  (state: CharacterState) => state.currentPage
);
