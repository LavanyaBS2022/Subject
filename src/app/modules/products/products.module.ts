import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddProductsComponent } from './add-products/add-products.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ProductsComponent,
    ListProductComponent,
    DeleteProductComponent,
    AddProductsComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    MatPaginatorModule
  ],
  entryComponents:[AddProductsComponent]
})
export class ProductsModule { }
