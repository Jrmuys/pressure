import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import * as d3 from 'd3';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-hourly-chart',
  templateUrl: './hourly-chart.component.html',
  styleUrls: ['./hourly-chart.component.scss'],
})
export class HourlyChartComponent implements OnInit {
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
  units: 'inHg' | 'hPa' = 'inHg';
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Hour';
  yAxisLabel: string = 'Pressure';
  timeline: boolean = false;
  yScaleMin: number = 29.5;
  yScaleMax: number = 30.5;
  yAxisTicks = [29.5, 30, 30.5];
  activeEntries = [
    {
      name: '2022-03-14T13:30:00.000Z',
      value: 29.91377273801087,
      series: 'Pressure',
    },
  ];
  curve = d3.curveNatural;
  currentDate = new Date();
  referenceLines = [
    {
      name: new Date(915138 * 1000 * 3600),
      value: 29.9213,
    },
  ];
  showReferenceLines = false;

  colorScheme = 'vivid';

  constructor(weatherService: WeatherService) {
    weatherService.last12Hours$.subscribe((data) => {
      // Group by hour and average the pressure
      const grouped = data.reduce((acc, cur) => {
        const hour = Math.round(
          new Date(cur.current.dt * 1000).getTime() / 1000 / 3600
        );
        if (!acc[hour]) {
          acc[hour] = {
            hour: hour,
            pressure: 0,
            count: 0,
          };
        }
        acc[hour].pressure += cur.current.pressure;
        acc[hour].count += 1;
        return acc;
      }, {});
      // Average the pressure
      const averages = Object.keys(grouped).map((key) => {
        return {
          hour: grouped[key].hour,
          pressure: grouped[key].pressure / grouped[key].count,
        };
      });

      console.log(averages);
      this.multi[0].series = averages.map((d) => {
        return {
          name: new Date(d.hour * 1000 * 3600),
          value: d.pressure / 33.864,
        };
      });
      // this.loading = false;
      weatherService.currentWeather$.subscribe((data) => {
        console.log(data);
        this.currentDate = new Date(data[0].current.dt * 1000);
        console.log(this.currentDate);
        this.multi[0].series = this.multi[0].series.concat(
          data[0].hourly
            .map((item) => {
              // console.log(item);
              return {
                name: new Date(item.dt * 1000),
                value: item.pressure / 33.864,
              };
            })
            .filter((item) => {
              // Only show the next 24 hours
              return (
                item.name.getTime() <
                  this.currentDate.getTime() + 24 * 60 * 60 * 1000 &&
                item.name.getTime() > new Date().getTime()
              );
            })
        );
        // Calculate the max and min
        this.yScaleMin = Math.min(
          ...this.multi[0].series.map((item) => item.value),
          29.5
        );
        this.yScaleMax = Math.max(
          ...this.multi[0].series.map((item) => item.value),
          30.5
        );

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
