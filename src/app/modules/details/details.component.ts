import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../home/shared/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  // providers: [ProductService]
})
export class DetailsComponent implements OnInit {

  id: number = 0;
  product: any;
  products: any;
  color='red';
  cartCount:number;
  constructor(private route: ActivatedRoute,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    private productService: ProductService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.cartCount= productService.cartCount;

  }
  ngOnInit(): void {
    this.product = this.productService.getProductId(this.id);
    }
    updateFavourite(event: any, id: number, status: boolean) {
      event.stopPropagation();
      let toggleStatus = !status;
      this.products = this.productService.updateFavourite(id, toggleStatus)
      console.log(this.products);
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
