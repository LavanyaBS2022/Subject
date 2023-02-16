import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import { ProductService } from '../../shared/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  // providers: [ProductService]
})
export class CardComponent {
  color='red';
  gColor='green';
  products: any;
  cartCount:number=0;
  constructor(private productService: ProductService,private apiService: ApiService,
    private router: Router) {}

  ngOnInit(){
    this.getProducts();
  }

  productDetail(id: number) {
    this.router.navigate(['/details', id])
  }

  updateFavourite(event: any, id: number, status: boolean) {
    event.stopPropagation();
    // let toggleStatus = !status;
    // this.products = this.productService.updateFavourite(id, toggleStatus)
    // console.log(this.products);
  }
  toggleFav(event:Event,prod:any){
    event.stopPropagation();
    prod.fav =prod.fav;
  }

  toggleCart(event:Event,prod:any){
    event.stopPropagation();
    prod.cart=!prod.cart
    if(prod.cart== true){
      this.cartCount++;
    }
    else{
      this.cartCount--;
    }
    this.productService.setCartCount(this.cartCount);
  }
 
  getProducts(){
    this.apiService.getRequest('/products').subscribe((sResponse) => {
      this.products = sResponse.data;
    })
  }
}


