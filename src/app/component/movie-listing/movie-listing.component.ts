import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-movie-listing',
  templateUrl: './movie-listing.component.html',
  styleUrls: ['./movie-listing.component.css']
})
export class MovieListingComponent implements OnInit {
  title;
  movies = [];
  baseUrl;
  imageSize = 'w200';
  page = 1;
  category;
  wishlistMovies = [];
  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params =>
      this.category = params.get('category')
    );
    this.title = this.category === 'topRated' ? 'Top Rated Movies' : 'Recently Released/ Releasing Movies';
    this.getConfiguration();
    if (this.category === 'topRated') {
      this.getTopRatedMovies();

    } else {
      this.getLatestMovies();
    }
    if (localStorage.getItem('wishListMovies')) {
      this.wishlistMovies = JSON.parse(localStorage.getItem('wishListMovies')) || [];
    }
  }

  getLatestMovies(): void {
    this.moviesService.getLatestMoviesApi(this.page).subscribe(
      res => {
        this.movies = this.movies.concat(res.results);
      }
    );
  }

  getTopRatedMovies(): void {
    this.moviesService.getTopRatedMoviesApi(this.page).subscribe(
      res => {
        this.movies = this.movies.concat(res.results);
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

  // When scroll down the screen
  onScroll() {
    console.log("Scrolled");
    this.page = this.page + 1;
    if (this.category === 'topRated') {
      this.getTopRatedMovies();

    } else {
      this.getLatestMovies();
    }
  }

  addToWishlist(movie): void {
    this.wishlistMovies.push(movie);
    this.moviesService.refreshWishlistCount(this.wishlistMovies.length);
    localStorage.setItem('wishListMovies', JSON.stringify(this.wishlistMovies));
  }

  checkMovieExistInWishlist(movieId): boolean {
    return this.wishlistMovies.find(movie => movie.id === movieId);
  }
}
