import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.example.com/data';
  constructor(private http: HttpClient) {}
  getAllCurrencies(currency: string): Observable<any> {
    return this.http
      .get<any>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
`);
  }
  getCoinData(coin: string): Observable<any> {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=true&market_data=false&community_data=false&developer_data=false&sparkline=false`
    );
  }
}
