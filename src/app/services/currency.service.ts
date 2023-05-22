import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  currency: string = 'CAD';
  getCurrency() {
    return this.currency;
  }
  setCurrency(val: string) {
    return (this.currency = val);
  }
}
