import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private URL: string =
    'https://netflixscope-default-rtdb.firebaseio.com//collection.json';
  constructor(private http: HttpClient) { }

  getResponse() {
    return this.http.get(this.URL);
  }
}
