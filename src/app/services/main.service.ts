import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, Main } from '../interfaces/main.interface';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private API_URL = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<Main> {
    return this.http.get<Main>(`${this.API_URL}/character?page=${page}`);
  }

  searchCharacters(query: string): Observable<Main> {
    return this.http.get<Main>(`${this.API_URL}/character?name=${query}`);
  }

  getCharacterDetail(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.API_URL}/character/${id}`);
  }
}
