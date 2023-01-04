import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddProductComponent } from '../../product/add-product/add-product.component';
import { DeleteProductComponent } from '../../product/delete-product/delete-product.component';
import { ListProductComponent } from '../../product/list-product/list-product.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardComponent,
    AddProductComponent,
    DeleteProductComponent,
    ListProductComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
   
  ]
})
export class HomeModule { }
