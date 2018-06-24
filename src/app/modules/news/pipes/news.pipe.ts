import { Pipe, PipeTransform } from '@angular/core';
import { News } from '../../../shared/models/news.model';

@Pipe({
    name: 'newsFilter'
})
export class NewsFilterPiple implements PipeTransform {
    transform(items: News[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.title.toLowerCase().includes(searchText) || it.content.toLowerCase().includes(searchText);
        });
    }
}

