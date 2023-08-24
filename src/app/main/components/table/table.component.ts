import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() list: Product[] = [];
  @Output() removeItem = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<Product>();
  isDropdownOpen = false;

  constructor() {}

  edit(item: Product) {
    this.editItem.emit(item);
  }

  delete(productId: string) {
    this.removeItem.emit(productId);
  }

  dropdown(item: Product) {
    item.open = !item.open;
  }
}
