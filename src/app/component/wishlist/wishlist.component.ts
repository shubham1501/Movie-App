import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistMovies = [];
  baseUrl;
  imageSize = 'w200';

  constructor(private moviesService: MoviesService) {
    this.getConfiguration();
   }

  ngOnInit() {
    if (localStorage.getItem('wishListMovies')) {
      this.wishlistMovies = JSON.parse(localStorage.getItem('wishListMovies'));
      }
  }

  getConfiguration(): void {
    this.moviesService.getConfiguration().subscribe(
      res => {
        this.baseUrl = res.images.base_url;
      }
    );
  }
}
