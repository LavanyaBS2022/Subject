import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'details', loadChildren: () => import('./modules/details/details.module').then(m => m.DetailsModule) },
  { path: 'favourite', loadChildren: () => import('./modules/favourite/favourite.module').then(m => m.FavouriteModule) },
  { path: 'Cart', loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule) },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
