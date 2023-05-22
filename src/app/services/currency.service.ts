import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  private selectedCurrency$: BehaviorSubject<string> =
    new BehaviorSubject<string>('CAD');
  getCurrency() {
    return this.selectedCurrency$.asObservable();
  }
  setCurrency(val: string) {
    return this.selectedCurrency$.next(val);
  }
}
