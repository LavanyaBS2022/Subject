import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Route } from '@angular/router';
import { ApiService } from '../home/shared/api.service';
import { ProductService } from '../home/shared/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  // providers: [ProductService]
})
export class DetailsComponent implements OnInit {

  id: any;
  product: any;
  products: any;
  color='red';
  cartCount:number;
  constructor(private activeRoute: ActivatedRoute,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    private productService: ProductService,
    private apiService:ApiService,
    private sanitizer:DomSanitizer) {
    console.log(this.id);
    this.cartCount= productService.cartCount;
    this.id = this.activeRoute.snapshot.paramMap.get('id');

   
  }
  ngOnInit(): void {
    this.getProduct()
  }

    updateFavourite(event: any, id: number, status: boolean) {
      // event.stopPropagation();
      // let toggleStatus = !status;
      // this.products = this.productService.updateFavourite(id, toggleStatus)
      // console.log(this.products);
    }
    toggleCart(event: Event, prod: any) {
      // event.stopPropagation();
      // prod.cart = !prod.cart;
      // if (prod.cart == true) {
      //   this.cartCount++;
      // }
      // else {
      //   this.cartCount--;
      // }
      // this.productService.setCartCount(this.cartCount);
    }
  getProduct(){
    debugger
    this.apiService.getProductById('/products',this.id).subscribe((sResponse) => {
      this.product = sResponse.data;
      debugger
    }) 
  }
  sanitize(url: string) {

    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
