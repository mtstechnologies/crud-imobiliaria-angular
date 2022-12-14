import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserRead2Item {
  name: string;
  email: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserRead2Item[] = [
  {id: 1, name: 'Hydrogen', email: 'davi@gmail.com'},
  {id: 2, name: 'Helium', email: 'davi@gmail.com'},
  {id: 3, name: 'Lithium', email: 'davi@gmail.com'},
  {id: 4, name: 'Beryllium', email: 'davi@gmail.com'},
  {id: 5, name: 'Boron', email: 'davi@gmail.com'},
  {id: 6, name: 'Carbon', email: 'davi@gmail.com'},
  {id: 7, name: 'Nitrogen', email: 'davi@gmail.com'},
  {id: 8, name: 'Oxygen', email: 'davi@gmail.com'},
  {id: 9, name: 'Fluorine', email: 'davi@gmail.com'},
  {id: 10, name: 'Neon', email: 'davi@gmail.com'},
  {id: 11, name: 'Sodium', email: 'davi@gmail.com'},
  {id: 12, name: 'Magnesium', email: 'davi@gmail.com'},
  {id: 13, name: 'Aluminum', email: 'davi@gmail.com'},
  {id: 14, name: 'Silicon', email: 'davi@gmail.com'},
  {id: 15, name: 'Phosphorus', email: 'davi@gmail.com'},
  {id: 16, name: 'Sulfur', email: 'davi@gmail.com'},
  {id: 17, name: 'Chlorine', email: 'davi@gmail.com'},
  {id: 18, name: 'Argon', email: 'davi@gmail.com'},
  {id: 19, name: 'Potassium', email: 'davi@gmail.com'},
  {id: 20, name: 'Calcium', email: 'davi@gmail.com'},
];

/**
 * Data source for the UserRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserRead2DataSource extends DataSource<UserRead2Item> {
  data: UserRead2Item[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserRead2Item[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserRead2Item[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserRead2Item[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
