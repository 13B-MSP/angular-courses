import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Product List?';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    errorMessage: string = '';
    sub!: Subscription;

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
        this.sub = this.productService.getProducts().subscribe(
            {
                next: products => {
                    this.products = products
                    this.filteredProducts = this.products;
                },
                error: err => this.errorMessage = err
            }
        );
    }

    ngOnDestroy() : void {
        this.sub.unsubscribe();
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