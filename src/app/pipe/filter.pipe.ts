import {Component, NgModule, Pipe, PipeTransform } from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
/*     transform(links: any[], value: string, prop: string): any[] {
        if (!links) return [];
        if (!value) return links;

        return links.filter(singleItem =>
            singleItem[prop].toLowerCase().startsWith(value.toLowerCase())
        );
   
    } */

    transform(links: Array<any>, filter: {[key: string]: any }): Array<any> {
        return links.filter(link => {
                let notMatchingField = Object.keys(filter)
                                             .find(key => link[key] !== filter[key]);

                return !notMatchingField; // true if matches all fields
            });
    }
}