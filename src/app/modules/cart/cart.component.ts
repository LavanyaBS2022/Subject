import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../home/shared/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']

})
export class CartComponent {
  products: any;
  cartCount:number;

  constructor(private productService: ProductService, private router: Router) {
    this.products = productService.getCart();
    this.cartCount= productService.cartCount;
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
