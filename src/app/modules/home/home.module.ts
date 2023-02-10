import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginModule } from "../login/login.module";


@NgModule({
    declarations: [
        HomeComponent,
        CardComponent,
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MaterialModule,
        LoginModule,
        LoginModule
    ]
})
export class HomeModule { }
