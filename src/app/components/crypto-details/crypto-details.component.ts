import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from 'src/app/services/currency.service';
@Component({
  selector: 'app-crypto-details',
  templateUrl: './crypto-details.component.html',
  styleUrls: ['./crypto-details.component.css'],
})
export class CryptoDetailsComponent implements OnInit {
  coinName!: string | null;
  coinData: any = [];
  days: number = 30;
  currency!: string;
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      },
    ],
    labels: [],
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1,
      },
    },

    plugins: {
      legend: { display: true },
    },
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) myLineChart!: BaseChartDirective;
  constructor(
    private link: ActivatedRoute,
    private api: ApiService,
    private currencyApi: CurrencyService
  ) {}
  ngOnInit(): void {
    this.getCurrency();
  }
  getCurrency() {
    this.currencyApi.getCurrency().subscribe((result) => {
      this.currency = result;
      this.getData();
      this.getGraphData(this.days);
    });
  }
  getData() {
    this.coinName = this.link.snapshot.paramMap.get('id');
    console.log(this.coinName);
    if (this.coinName != null) {
      this.api.getCoinData(this.coinName).subscribe((result) => {
        console.log(result);
        if (this.currency === 'USD') {
          result.market_data.current_price.cad =
            result.market_data.current_price.usd;
          result.market_data.market_cap.cad = result.market_data.market_cap.usd;
        }
        if (this.currency === 'INR') {
          result.market_data.current_price.cad =
            result.market_data.current_price.inr;
          result.market_data.market_cap.cad = result.market_data.market_cap.inr;
        }
        result.market_data.current_price.cad =
          result.market_data.current_price.cad;
        result.market_data.market_cap.cad = result.market_data.market_cap.cad;
        this.coinData = result;
      });
    }
  }
  getGraphData(days: number) {
    this.days = days;
    this.api
      .getGrpahicalCurrencyData(this.coinName, this.currency, this.days)
      .subscribe((res) => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          let date = new Date(a[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}: ${date.getMinutes()} PM`
              : `${date.getHours()}: ${date.getMinutes()} AM`;
          return this.days === 1 ? time : date.toLocaleDateString();
        });
      });
  }
}
