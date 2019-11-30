import { Component, OnDestroy } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { MoviesService } from './service/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'movie-app';
  wishlistMovies = [];
  subscription;
  constructor(private router: Router,
              private moviesService: MoviesService) {
    this.subscription = router.events.subscribe((event) => {
    });
    this.moviesService.computeServiceVariable.subscribe(
      res => {
        setTimeout(() => this.wishlistMovies = JSON.parse(localStorage.getItem('wishListMovies')) || [], 100);
      }
    );
  }

  /**
   * @method goToPage()
   * @desc goToPage is method for navigation.
   * @param page :number - route.
   */
  goToPage(page): void {
    if (page === 'home') {
      this.router.navigate(['home']);
    } else if (page === 'wishlist') {
      this.router.navigate(['wishlist']);
    } else {
      this.wishlistMovies = [];
      localStorage.setItem('email', null);
      localStorage.setItem('wishListMovies', null);
      this.router.navigate(['login']);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
