import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product list!';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMessage: string;

  constructor(private productService: ProductService) {
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this._listFilter ? this.performFilter(this._listFilter) : this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((item: IProduct) => (item.productName.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

  toggleImg(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  ngOnInit(): void {
    console.log('On init hook');
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );
  }
}
