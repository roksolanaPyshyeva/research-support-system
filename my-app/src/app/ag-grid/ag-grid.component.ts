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
  public encryptionExperiments = [];
  public decryptionExperiments = [];
  public timeMin: any;
  public timeMax: any;
  public timeAvg: any;
  public OriginalPsnrMin: any;
  public OriginalPsnrMax: any;
  public OriginalPsnrAvg: any;
  public OriginalSsimMin: any;
  public OriginalSsimMax: any;
  public OriginalSsimAvg: any;
  public WatermarkPsnrMin: any;
  public WatermarkPsnrMax: any;
  public WatermarkPsnrAvg: any;
  public WatermarkSsimMin: any;
  public WatermarkSsimMax: any;
  public WatermarkSsimAvg: any;


  constructor( public af: AngularFire) {
    this.columnDefs = [
      {
        headerName: "Original Image",
        field: "OriginalImage"
      },
      {
        headerName: "Water mark",
        field: "Watermark"
      },
      {
        headerName: "Operation",
        field: "Operation"
      },
      {
        headerName: "Color",
        field: "Color",
        width: 100
      },
      {
        headerName: "Frame Size",
        field: "FrameSize",
        width: 110
      },
      {
        headerName: "KP",
        field: "KP",
        width: 100
      },
      {
        headerName: "Repeats",
        field: "Repeats",
        width: 100
      },
      {
        headerName: "Start Time",
        field: "StartTime"
      },
      {
        headerName: "End Time",
        field: "EndTime"
      },
      {
        headerName: "Processing Time",
        field: "ProcessingTime",
        width: 100
      },
      {
        headerName: "Original PSNR",
        field: "OriginalPSNR"
      },
      {
        headerName: "Original SSIM",
        field: "OriginalSSIM"
      },
      {
        headerName: "Watermark PSNR",
        field: "WatermarkPSNR"
      },
      {
        headerName: "Watermark SSIM",
        field: "WatermarkSSIM"
      },
    ];
   }

  ngOnInit() {
    this.getExperimentsList();
  }

  getExperimentsList(){
    this.af.database.list('/experiments').subscribe((data) => {
      this.rowData = data;
      this.divideEncryptionAndDecryption();
      this.countAnalyticalIndicators();
      
    });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  divideEncryptionAndDecryption() {
    this.rowData.forEach((item) => {
      item.Operation === "Encryption" 
      ? this.encryptionExperiments.push(item) 
      : this.decryptionExperiments.push(item);
    })
  }

  countAnalyticalIndicators(){
    this.encryptionExperiments.sort((a,b) => {
      return a.OriginalPSNR - b.OriginalPSNR;
    })
    this.OriginalPsnrMin = (this.encryptionExperiments[0].OriginalPSNR).toFixed(2);
    this.OriginalPsnrMax = (this.encryptionExperiments[this.encryptionExperiments.length-1].OriginalPSNR).toFixed(2);
    
    this.encryptionExperiments.sort((a,b) => {
      return a.OriginalSSIM - b.OriginalSSIM;
    })
    
    this.OriginalSsimMin = (this.encryptionExperiments[0].OriginalSSIM).toFixed(2);
    this.OriginalSsimMax = (this.encryptionExperiments[this.encryptionExperiments.length-1].OriginalSSIM).toFixed(2);

    this.decryptionExperiments.sort((a,b) => {
      return a.WatermarkPSNR - b.WatermarkPSNR;
    })
    this.WatermarkPsnrMin = (this.decryptionExperiments[0].WatermarkPSNR).toFixed(2);
    this.WatermarkPsnrMax = (this.decryptionExperiments[this.decryptionExperiments.length-1].WatermarkPSNR).toFixed(2);

    this.decryptionExperiments.sort((a,b) => {
      return a.WatermarkSSIM - b.WatermarkSSIM;
    })
    this.WatermarkSsimMin = (this.decryptionExperiments[0].WatermarkSSIM).toFixed(4);
    this.WatermarkSsimMax = (this.decryptionExperiments[this.decryptionExperiments.length-1].WatermarkSSIM).toFixed(4);
    
    this.OriginalPsnrAvg = this.encryptionExperiments.reduce((total, el) => {
      return total+el.OriginalPSNR;
    }, 0)
    this.OriginalPsnrAvg = (this.OriginalPsnrAvg/this.encryptionExperiments.length).toFixed(2);

    this.OriginalSsimAvg = this.encryptionExperiments.reduce((total, el) => {
      return total+el.OriginalSSIM;
    }, 0)
    this.OriginalSsimAvg = (this.OriginalSsimAvg/this.encryptionExperiments.length).toFixed(2);

    this.WatermarkPsnrAvg= this.decryptionExperiments.reduce((total, el) => {
      return total+el.WatermarkPSNR;
    }, 0)
    this.WatermarkPsnrAvg = (this.WatermarkPsnrAvg/this.decryptionExperiments.length).toFixed(2);

    this.WatermarkSsimAvg= this.decryptionExperiments.reduce((total, el) => {
      return total+el.WatermarkSSIM;
    }, 0)
    this.WatermarkSsimAvg = (this.WatermarkSsimAvg/this.decryptionExperiments.length).toFixed(4);

    this.rowData.sort((a,b) => {
      return a.ProcessingTime-b.ProcessingTime;
    })
    this.timeMin = this.rowData[0].ProcessingTime;
    this.timeMax = this.rowData[this.rowData.length-1].ProcessingTime;

    this.timeAvg = this.rowData.reduce((total, el) => {
      return total+ el.ProcessingTime
    }, 0);
    this.timeAvg = (this.timeAvg / this.rowData.length).toFixed(2);
  }
}
