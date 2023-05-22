import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title: string = 'CrytoApp';
  selected!: string;
  constructor(private currency: CurrencyService) {}
  ngOnInit(): void {
    this.currency.getCurrency().subscribe((result) => {
      this.selected = result;
    });
  }

  onSelectionChange(event: string): void {
    this.currency.setCurrency(event);
  }
}
