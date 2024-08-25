import { createReducer, on } from '@ngrx/store';
import { Main, Character } from '../interfaces/main.interface';
import * as CharacterActions from './actions';

export const characterStateFeatureKey = 'charactersState';

export interface CharacterState {
  characters: Main | null;
  charactersByPage: { [page: number]: Character[] };
  characterDetail: Character | null;
  loading: boolean;
  error: any;
  query: string;
  currentPage: number;
}

export const initialState: CharacterState = {
  characters: null,
  charactersByPage: {},
  characterDetail: null,
  loading: false,
  error: null,
  query: '',
  currentPage: 1,
};

export const characterReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharacters, (state, { page }) => ({
    ...state,
    loading: true,
    currentPage: page,
  })),
  on(CharacterActions.loadCharactersSuccess, (state, { data, page }) => ({
    ...state,
    charactersByPage: { ...state.charactersByPage, [page]: data.results },
    loading: false,
  })),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(CharacterActions.searchCharacters, (state, { query }) => ({
    ...state,
    loading: true,
    query: query,
  })),
  on(CharacterActions.searchCharactersSuccess, (state, { data }) => ({
    ...state,
    characters: data,
    loading: false,
  })),
  on(CharacterActions.loadCharacterDetail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CharacterActions.loadCharacterDetailSuccess, (state, { character }) => ({
    ...state,
    characterDetail: character,
    loading: false,
  })),
  on(CharacterActions.loadCharacterDetailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
