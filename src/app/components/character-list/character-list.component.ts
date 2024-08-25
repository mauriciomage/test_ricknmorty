import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from '../../interfaces/main.interface';
import * as fromCharacterSelectors from '../../state/selectors';
import * as fromCharacterActions from '../../state/actions';
import { loadCharacters } from '../../state/actions';
import { selectCharactersByPage } from '../../state/selectors';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  public characters$: Observable<Character[]> = new Observable<Character[]>();
  public loading$: Observable<boolean> = new Observable<boolean>();
  public currentPage: number = 1;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.loadCharacters();
    // this.loading$ = this.store.select(fromCharacterSelectors.selectLoading);
    // this.characters$ = this.store.select(
    //   fromCharacterSelectors.selectAllCharacters
    // );

    this.store
      .select(fromCharacterSelectors.selectCurrentPage)
      .subscribe((page) => {
        this.currentPage = page;
        this.characters$ = this.store.select(selectCharactersByPage(page));
        this.store.dispatch(loadCharacters({ page }));
      });
  }

  loadCharacters(): void {
    this.store.dispatch(
      fromCharacterActions.loadCharacters({ page: this.currentPage })
    );
  }

  onSearch(query = ''): void {
    if (query) {
      this.store.dispatch(fromCharacterActions.searchCharacters({ query }));
    } else {
      this.loadCharacters();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.store.dispatch(
        fromCharacterActions.loadCharacters({ page: this.currentPage - 1 })
      );
    }
  }

  onNextPage(): void {
    this.store.dispatch(loadCharacters({ page: this.currentPage + 1 }));
  }
}
