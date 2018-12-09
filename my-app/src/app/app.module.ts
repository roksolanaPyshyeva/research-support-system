import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'

import { AppComponent } from './app.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from "ag-grid-angular";
import { ChartComponent } from './chart/chart.component';
import { ChartsModule } from 'ng2-charts';
import { ChartColorComponent } from './chart-color/chart-color.component';

export const firebaseConfig = {
  apiKey: "AIzaSyA2asS4za8BxKFsSuBGedAm1vyoY53fsGs",
  authDomain: "research-support-system.firebaseapp.com",
  databaseURL: "https://research-support-system.firebaseio.com",
  projectId: "research-support-system",
  storageBucket: "research-support-system.appspot.com",
  messagingSenderId: "942933076025"
};

@NgModule({
  declarations: [
    AppComponent,
    AgGridComponent,
    ChartComponent,
    ChartColorComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgGridModule.withComponents([]),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
