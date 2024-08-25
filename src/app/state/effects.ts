import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { MainService } from '../services/main.service';
import * as CharacterActions from './actions';
import { CharacterState } from './reducers';
import { Store } from '@ngrx/store';
import { selectCharactersByPage, selectCurrentPage } from './selectors';

@Injectable()
export class CharacterEffects {
  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      withLatestFrom(this.store.select(selectCurrentPage)), // Primero seleccionamos la página actual
      switchMap(([action, currentPage]) => {
        return this.store.select(selectCharactersByPage(currentPage)).pipe(
          switchMap((characters) => {
            if (characters.length > 0) {
              // Si los datos ya están en el estado, solo emitimos la acción de éxito
              return of(
                CharacterActions.loadCharactersSuccess({
                  data: { results: characters, info: null },
                  page: currentPage,
                })
              );
            } else {
              // Si los datos no están en el estado, realiza la solicitud HTTP
              return this.characterService.getCharacters(action.page).pipe(
                map((data) =>
                  CharacterActions.loadCharactersSuccess({
                    data,
                    page: action.page,
                  })
                ),
                catchError((error) =>
                  of(
                    CharacterActions.loadCharactersFailure({
                      error: error.message,
                    })
                  )
                )
              );
            }
          })
        );
      })
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
    private characterService: MainService,
    private store: Store<CharacterState>
  ) {}
}
