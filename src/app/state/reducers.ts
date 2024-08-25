import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './actions';
import { Character, Main } from '../interfaces/main.interface';

export interface CharacterState {
  characters: Main | null;
  characterDetail: Character | null;
  loading: boolean;
  error: any;
  query: string;
  currentPage: number;
}

export const initialState: CharacterState = {
  characters: null,
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
    error: null,
  })),
  on(CharacterActions.loadCharactersSuccess, (state, { data }) => ({
    ...state,
    characters: data,
    loading: false,
  })),
  on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
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
