import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';

import { TableComponent } from './table.component';

const productItem: Product = {
  date_release: '2023-08-23T00:00:00.000+00:00',
  date_revision: '2024-08-23T00:00:00.000+00:00',
  description: 'tarjeta de consumo bajo la molidad de credito',
  id: 'trj-crdt',
  logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
  name: 'tarjetas de credito',
  open: false,
};

const productList = [
  {
    date_release: '2023-08-23T00:00:00.000+00:00',
    date_revision: '2024-08-23T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de credito',
    id: 'trj-crdt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de credito',
    open: false,
  },
  {
    date_release: '2023-08-30T00:00:00.000+00:00',
    date_revision: '2024-08-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de debito',
    id: 'trj-dbt',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de debito',
    open: false,
  },
  {
    date_release: '2023-09-30T00:00:00.000+00:00',
    date_revision: '2024-09-30T00:00:00.000+00:00',
    description: 'tarjeta de consumo bajo la molidad de prepago',
    id: 'trj-prpg',
    logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
    name: 'tarjetas de prepago',
    open: false,
  },
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableComponent],
    });
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.list = productList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call edit', () => {
    const emitEdit = spyOn(component.editItem, 'emit');
    component.edit(productItem);
    expect(emitEdit).toHaveBeenCalledWith(productItem);
  });

  it('should call delete', () => {
    const emitRemove = spyOn(component.removeItem, 'emit');
    component.delete(productItem.id);
    expect(emitRemove).toHaveBeenCalledWith(productItem.id);
  });

  it('should call dropdown', () => {
    component.dropdown(productItem);
    expect(productItem.open).toBe(true);
  });
});
