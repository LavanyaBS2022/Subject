import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../home/shared/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
  // providers: [ProductService]

})
export class FavouriteComponent {

  products: any;
  cartCount:number;

  constructor(private productService: ProductService,private router:Router) {
    this.products = productService.getFavouriteProduct();
    this.cartCount= productService.cartCount;

  }
  productDetails(id:number){
    this.router.navigate(['/details',id])
  }

  updateFavourite(event: any, id: number, status: boolean) {
    event.stopPropagation();
    let toggleStatus = !status;
    this.products = this.productService.updateFavourite(id, toggleStatus)
    console.log(this.products);
  }
  
  productDetail(id: number) {
    this.router.navigate(['/details', id])
  }
  toggleCart(event: Event, prod: any) {
    event.stopPropagation();
    prod.cart = !prod.cart;
    if (prod.cart == true) {
      this.cartCount++;
    }
    else {
      this.cartCount--;
    }
    this.productService.setCartCount(this.cartCount);
  }

}