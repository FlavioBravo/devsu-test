import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { getYYYYMMDDFormat } from '../../utils/utils';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProductList();
  }

  loadProductList() {
    this.productService.getProductList().subscribe((response) => {
      this.productList = response;
    });
  }

  editProduct(item: Product) {
    item.date_release = getYYYYMMDDFormat(item.date_release);
    item.date_revision = getYYYYMMDDFormat(item.date_revision);
    this.router.navigate(['productos/crear-editar'], {
      state: {
        response: { item },
      },
    });
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe((response) => {
      if (response) {
        this.loadProductList();
      }
    });
  }

  onSubmit() {
    const word = this.searchForm.get('search')?.value;
    if (word) {
      this.productList = this.productList.filter(
        (product) =>
          product.name.includes(word) || product.description.includes(word)
      );
    } else {
      this.loadProductList();
    }
  }
}
