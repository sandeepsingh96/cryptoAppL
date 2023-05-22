import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private currency: CurrencyService) {
    this.getCurrency();
  }
  ngOnInit(): void {}
  @ViewChild(MatSelect) select!: MatSelect;
  title: string = 'CrytoApp';
  selected!: string;
  onSelectionChange() {
    this.select.writeValue(this.selected);

    this.currency.setCurrency(this.selected);
    this.getCurrency();
  }
  getCurrency() {
    this.selected = this.currency.getCurrency();
  }
}
