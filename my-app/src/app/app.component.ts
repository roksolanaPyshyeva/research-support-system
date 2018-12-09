import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public rowData: any;
  public color: any;
  public blackAndWhite: any;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.getExperimentsList();
  }

  getExperimentsList(){
    this.af.database.list('/experiments').subscribe((data) => {
      this.rowData = data;      
    });
    this.af.database.list('/color').subscribe((data) => {
      this.color = data;      
    });
    this.af.database.list('/black-and-white').subscribe((data) => {
      this.blackAndWhite = data;      
    });
  }
}
