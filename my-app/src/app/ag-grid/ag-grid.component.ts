import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss']
})
export class AgGridComponent implements OnInit {

  public items;
  private gridApi;
  private gridColumnApi;
  private rowData: any[];

  private columnDefs;
  private defaultColDef;
  private defaultColGroupDef;
  private columnTypes;


  constructor( public af: AngularFire) {
    this.columnDefs = [
      {
        headerName: "Picture",
        field: "picture"
      },
      {
        headerName: "Mark",
        field: "mark"
      }
    ];
   }

  ngOnInit() {
    this.getWaternarkList();
  }

  getWaternarkList(){
    this.af.database.list('/watermark').subscribe((data) => {
      this.rowData = data;
      console.log(this.rowData)
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

}
