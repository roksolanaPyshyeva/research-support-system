import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'

import { AppComponent } from './app.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from "ag-grid-angular";

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
    AgGridComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
