import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { products } from "./productData";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updateCart: any;
  cartCount = 0;
  subject$ = new Subject<number>();


  getProduct() {
    return products;
  }
  getProductId(id: any) {
    let product
    products.map((element: any) => element.id == id ? product = element : {});
    return product;
  }
  getFavouriteProduct() {
    let fav: any = []
    debugger;
    products.map((element: any) => element.fav == true ? fav.push(element) : null);
    return fav;
  }

  getCart() {
    let cart: any = [];
    products.map((element: any) => element.cart == true ? cart.push(element) : null);
    return cart;
  }

  updateFavourite(id: number, status: boolean) {
    debugger;
    products.map((element: any) => element.id == id ? element.fav = status : null);
    return products;
  }

  setCartCount(count: number) {
    debugger;
    this.subject$.next(count);
  }

}


