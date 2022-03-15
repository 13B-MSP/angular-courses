import { Injectable } from "@angular/core";
import { IProduct, Query } from "./product";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Apollo, gql } from "apollo-angular";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private apollo: Apollo) {}

    getProducts(): Observable<IProduct[]> {
        return this.apollo.watchQuery<Query>({
            query: gql`
            query {
                allProducts {
                    productId
                    productName
                    productCode
                    releaseDate
                    description
                    price
                    starRating
                    imageUrl
                }
            }
            `
        }).valueChanges.pipe(map((result) => result.data.allProducts));
    }
}