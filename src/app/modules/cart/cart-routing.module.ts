import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullLayoutComponent } from 'src/app/layouts/full-layout/full-layout.component';
import { CartComponent } from './cart.component';

const routes: Routes = [{  path: '', component: FullLayoutComponent,
children: [{
  path: '',
  component: CartComponent
}] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
