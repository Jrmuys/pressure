import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';
import { HourlyChartComponent } from './hourly-chart/hourly-chart.component';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { DailyChartComponent } from './daily-chart/daily-chart.component';

@NgModule({
  declarations: [AppComponent, HourlyChartComponent, DailyChartComponent],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    AngularFireFunctionsModule,
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
