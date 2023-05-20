import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css'],
})
export class CryptoDetailsComponent implements OnInit {
  coinName: string | null = '';
  coinData: any = [];
  constructor(private link: ActivatedRoute, private api: ApiService) {
    this.coinName = this.link.snapshot.paramMap.get('id');
    console.log(this.coinName);
    if (this.coinName != null) {
      this.api.getCoinData(this.coinName).subscribe((result) => {
        console.log(result);
        this.coinData = result;
      });
    }
  }
  ngOnInit(): void {}
}
