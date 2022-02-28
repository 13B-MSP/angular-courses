import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle = 'Product List?';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor (private productService: ProductService) {}

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
        console.log('set the filter:', this._listFilter);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('OnInit called');
        this.listFilter = '';
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter(
            (product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy));
    }
    onRatingClicked(message: string): void {
        console.log(message);
        this.pageTitle = 'Product List: ' + message;
    }
}