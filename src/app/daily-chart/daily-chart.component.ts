import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
})
export class DailyChartComponent implements OnInit {
  loading = true;
  multi: {
    name: string;
    series: any[];
  }[] = [
    {
      name: 'Pressure',
      series: [],
    },
  ];
  view: [number, number] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Hour';
  yAxisLabel: string = 'Pressure';
  timeline: boolean = false;
  yScaleMin: number = 29.5;
  yScaleMax: number = 30.5;
  curve = d3.curveNatural;
  currentDate = new Date();
  referenceLines = [
    {
      name: new Date(915138 * 1000 * 1800),
      value: 30.03,
    },
  ];
  showReferenceLines = false;

  colorScheme = 'vivid';

  constructor(weatherService: WeatherService) {
    weatherService.yesterdayWeather$.subscribe((data) => {
      // Group by hour and average the pressure

      this.multi[0].series[0] = {
        name: new Date(data[0].current.dt * 1000),
        value: data[0].current.pressure / 33.864,
      };
      // this.loading = false;
      weatherService.currentWeather$.subscribe((data) => {
        console.log(data);
        this.currentDate = new Date(data[0].current.dt * 1000);
        console.log(this.currentDate);
        this.multi[0].series = this.multi[0].series.concat(
          data[0].daily.map((item) => {
            // console.log(item);
            return {
              name: new Date(item.dt * 1000),
              value: item.pressure / 33.864,
            };
          })
        );
        // .filter((item) => {
        //   // Only show the next 5 days
        //   return (
        //     item.name.getTime() <
        //     this.currentDate.getTime() + 24 * 60 * 60 * 1000
        //   );
        // });
        console.log(this.multi);
        this.loading = false;
      });
    });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
