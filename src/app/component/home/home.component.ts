import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  search = '';
  searchedResults = '';
  upcomingMovies = [];
  topRatedMovies = [];
  baseUrl;
  imageSize = 'w200';
  constructor(private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    this.getConfiguration();
    this.getLatestMovies();
    this.getTopRatedMovies();
  }

  getLatestMovies(): void {
    this.moviesService.getLatestMoviesApi().subscribe(
      res => {
        this.upcomingMovies = res.results;
      }
    );
  }

  getTopRatedMovies(): void {
    this.moviesService.getTopRatedMoviesApi().subscribe(
      res => {
        this.topRatedMovies = res.results;
      }
    );
  }

  getConfiguration(): void {
    this.moviesService.getConfiguration().subscribe(
      res => {
        this.baseUrl = res.images.base_url;
      }
    );
  }

  searchData(): void {
    this.moviesService.searchData(this.search).subscribe(
      res => {
        this.searchedResults = res.results;
      }
    );
  }

  loadMovies(movieCategory): void {
    this.router.navigate(['movies/' + movieCategory]);
  }
}
