import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pressure';
  loading = true;
  single: any[];
  view: [number, number] = [400, 200];
  colorScheme = 'vivid';
  value: number = 30;
  previousValue: number = 30.03;
  units: string = 'inHg';
  min: number = 29.5;
  max: number = 30.5;

  constructor(weatherService: WeatherService) {
    weatherService.currentWeather$.subscribe((data) => {
      this.value = data[0].current.pressure / 33.864;
      this.loading = false;
    });
  }

  onSelect(event) {
    console.log(event);
  }
}
