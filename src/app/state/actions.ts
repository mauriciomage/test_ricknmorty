import { createAction, props } from '@ngrx/store';
import { Character, Main } from '../interfaces/main.interface';

export const loadCharacters = createAction(
  '[Character List] Load Characters',
  props<{ page: number }>()
);
export const loadCharactersSuccess = createAction(
  '[Character API] Load Characters Success',
  props<{ data: Main }>()
);
export const loadCharactersFailure = createAction(
  '[Character API] Load Characters Failure',
  props<{ error: any }>()
);

export const searchCharacters = createAction(
  '[Character List] Search Characters',
  props<{ query: string }>()
);
export const searchCharactersSuccess = createAction(
  '[Character API] Search Characters Success',
  props<{ data: Main }>()
);

export const loadCharacterDetail = createAction(
  '[Character Detail] Load Character Detail',
  props<{ id: number }>()
);
export const loadCharacterDetailSuccess = createAction(
  '[Character API] Load Character Detail Success',
  props<{ character: Character }>()
);
export const loadCharacterDetailFailure = createAction(
  '[Character API] Load Character Detail Failure',
  props<{ error: any }>()
);
