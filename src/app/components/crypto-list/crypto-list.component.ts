import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyService } from 'src/app/services/currency.service';
@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css'],
})
export class CryptoListComponent implements OnInit {
  someTesting: string[] = [];
  coinsData: any = [];
  favList: string[] = [];
  storedItems = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
  currency!: string;
  displayedColumns: string[] = ['Coin', 'Price', '24 Hrs', 'Market cap'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private currencyVal: CurrencyService
  ) {}

  ngOnInit(): void {
    this.currencyVal.getCurrency().subscribe((val) => {
      this.currency = val;
      this.getAllData();
    });
  }

  getAllData() {
    this.api.getAllCurrencies(this.currency).subscribe((res) => {
      console.log(res);
      const apiNames = res as any[];
      apiNames.forEach((data) => {
        if (this.storedItems.includes(data.id)) {
          this.favList.push(data.id);
        }
      });
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  gotoDetails(row: any) {
    this.router.navigate(['details/', row.id]);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  isFavoriteItem(val: string) {
    const storedItems = JSON.parse(
      localStorage.getItem('favoriteItems') || '[]'
    );
    return storedItems.includes(val);
  }
}
