import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  item$: Observable<any[]>;
  currentWeather$: Observable<any[]>;
  last12Hours$: Observable<any[]>;
  yesterdayWeather$: Observable<any[]>;
  constructor(private http: HttpClient, afs: AngularFirestore) {
    this.item$ = afs
      .collection('weather', (ref) => ref.orderBy('current.dt', 'asc'))
      .valueChanges();
    this.currentWeather$ = afs
      .collection('weather', (ref) =>
        ref.orderBy('current.dt', 'desc').limit(1)
      )
      .valueChanges();
    this.last12Hours$ = afs
      .collection('weather', (ref) =>
        ref.where(
          'current.dt',
          '>',
          new Date(Date.now() - 12 * 60 * 60 * 1000).getTime() / 1000
        )
      )
      .valueChanges();
    this.yesterdayWeather$ = afs
      .collection('weather', (ref) =>
        ref
          .where(
            'current.dt',
            '>',
            new Date(Date.now() - 24 * 60 * 60 * 1000).getTime() / 1000
          )
          .limit(1)
      )
      .valueChanges();
  }
}
