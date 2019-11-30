import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  apiKey = 'aac6c628ad7173f0ab2c9e302a609827';
  serviceVariable = new BehaviorSubject(0);
  computeServiceVariable = this.serviceVariable.asObservable();
  constructor(private http: HttpClient) { }

  /**
   * @method getLatestMoviesApi()
   * @desc getLatestMoviesApi is common method getting latest movies.
   * @param pageNumber :number - page number.
   */
  getLatestMoviesApi(pageNumber?: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&page=${pageNumber || 1}`);
  }

  /**
   * @method getTopRatedMoviesApi()
   * @desc getTopRatedMoviesApi is common method getting top rated movies.
   * @param pageNumber :number - page number.
   */
  getTopRatedMoviesApi(pageNumber?: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&page=${pageNumber || 1}`);
  }

  /**
   * @method getConfiguration()
   * @desc getConfiguration is used to get configurations.
   */
  getConfiguration(): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/configuration?api_key=${this.apiKey}`);
  }

  /**
   * @method searchData()
   * @desc searchData is common method getting filtered movies.
   * @param searchedData :string - key.
   */
  searchData(searchedData): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&query=${searchedData}`);
  }

  refreshWishlistCount(message): void {
    this.serviceVariable.next(message);
  }
}
