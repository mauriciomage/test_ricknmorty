import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { characterReducer } from './state/reducers';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(characterReducer, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retiene los últimos 25 estados
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
