import { Component, OnInit } from '@angular/core';
import { API_ENDPOINT, EXAMPLE_RESPONSE, ITEMS_PER_PAGE } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  items: any = [];
  itemIds: any = null;
  fetchingDetails: boolean = false;
  currentPage: number = 0;

  async ngOnInit(): Promise<any> {
    await this.fetchItems(this.currentPage);
  }

  async fetchItems(currpage: any): Promise<any> {
    this.currentPage = currpage;
    this.fetchingDetails = true;

    let itemList = this.itemIds;
    if (itemList === null) {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`);
      itemList = await response.json();
      this.itemIds = itemList;
    }
    const itemIdsForPage = itemList.slice(
      currpage * ITEMS_PER_PAGE,
      currpage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId: any) =>
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((res) => res.json())
      )
    );
    this.items = [...this.items, ...itemsForPage];
    this.fetchingDetails = false;
  }
}
