import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MainService } from '../services/main.service';
import * as CharacterActions from './actions';

@Injectable()
export class CharacterEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      mergeMap(({ page }) =>
        this.characterService.getCharacters(page).pipe(
          map((data) => CharacterActions.loadCharactersSuccess({ data })),
          catchError((error) =>
            of(CharacterActions.loadCharactersFailure({ error }))
          )
        )
      )
    )
  );

  searchCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.searchCharacters),
      switchMap(({ query }) =>
        this.characterService.searchCharacters(query).pipe(
          map((data) => CharacterActions.searchCharactersSuccess({ data })),
          catchError((error) =>
            of(CharacterActions.loadCharactersFailure({ error }))
          )
        )
      )
    )
  );

  loadCharacterDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacterDetail),
      switchMap(({ id }) =>
        this.characterService.getCharacterDetail(id).pipe(
          map((character) =>
            CharacterActions.loadCharacterDetailSuccess({ character })
          ),
          catchError((error) =>
            of(CharacterActions.loadCharacterDetailFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private characterService: MainService
  ) {}
}
