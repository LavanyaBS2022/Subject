import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../home/shared/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
  providers: [ProductService]

})
export class FavouriteComponent {

  products: any;

  constructor(private productService: ProductService,private router:Router) {
    this.products = productService.getFavouriteProduct();
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

}