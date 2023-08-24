import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddEditComponent } from './pages/product-add-edit/product-add-edit.component';
import { MainComponent } from './main.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { LocalTimePipe } from './pipes/localTime.pipe';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductAddEditComponent,
    MainComponent,
    HeaderComponent,
    TableComponent,
    PaginationComponent,
    LocalTimePipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
})
export class MainModule {}
