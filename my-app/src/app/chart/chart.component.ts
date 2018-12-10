import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Input() rowData:  any;
  // @Input() blackAndWhite:  any;
  // @Input() color:  any;

  public chartOptions: Object;
  public labels: Object;
  public chartData: Object;
  public colors: Object;
  public chartType: string = 'bar';
  public xAxes: string = 'KP';
  public yAxes: string = 'OriginalPSNR';
  

  constructor() { }

  ngOnInit() {
    this.setChartOptions();
    this.updateChart(this.rowData);
  }

  ngOnChanges() {
    this.updateChart(this.rowData);
  }

  onChartTypeSelected(type) {
    this.chartType = type;
    this.updateChart(this.rowData);
  }

  onXSelected(xAxes) {
    this.xAxes = xAxes;
    this.updateChart(this.rowData);
  }
  onYSelected(yAxes) {
    this.yAxes = yAxes;
    this.updateChart(this.rowData);
  }

  updateChart(data): void {
    if (data) {
      this.labels = data.map((el) => {
        return el[this.xAxes];
      });
      if(this.chartType === 'bar' || this.chartType === 'line' || this.chartType === 'pie') {
        this.chartData = [
          {
            label: 'Experiment ',
            data: data.map((el) => {
                    return el[this.yAxes];
                  })
          }
        ];
      }
      if(this.chartType === 'scatter' || this.chartType === 'bubble' ) {
        this.chartData = [
          {
            label: 'Experiment ',
            data: data.map((el) => {
                    return {
                      x: el[this.xAxes],
                      y: el[this.yAxes],
                      r: 10
                    }
                  })
          }
        ];
      }
     
      // const callbacks = {
      //   label: function(tooltipItem) {
      //     console.log(tooltipItem)
      //     return this.yAxes + ' : ' + tooltipItem.yLabel.toFixed(4);
      //   }
      // };
      var colors = [];
      while (colors.length < 100) {
        do {
          var color = Math.floor((Math.random()*1900000)+1);
        } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
      }
      if(this.chart.chart) {
        this.chart.chart.config.data.labels = this.labels;
        this.chart.chart.config.type = this.chartType;

       if(this.chartType === 'pie') {
          this.chart.chart.config.data.datasets[0].backgroundColor = colors;
       } else {
        
        this.chart.chart.config.data.datasets[0].backgroundColor ='#006865';
       }
        console.log( this.chart.chart.config.data.datasets[0].backgroundColor)
        // this.chart.chart.config.options.tooltips.callbacks = callbacks;
        this.chart.chart.update();
      }
    }
  }

  setChartOptions(): void {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      borderWidth: 0,
      borderColor: '#fff',
      legend: {
        display: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawBorder: false,
          },
          maxBarThickness : 100
        }],
        yAxes: [{
          gridLines: {
            drawBorder: false,
          },
          ticks: {
            padding: 15,
            beginAtZero: true
          }
        }],
      },
      tooltips: {
        backgroundColor: '#FFF',
        xPadding: 10,
        yPadding: 10,
        position: 'average',
        titleFontStyle: 'bold',
        titleFontColor: '#4e5154',
        bodyFontStyle: 'bold',
        bodyFontColor: '#4e5154',
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        displayColors: false
      }
    };
    this.colors = [
      {
        backgroundColor: '#006865',
        hoverBackgroundColor: '#4c9593'
      }
    ];
    this.chartData = [
      {
        label: 'Experiment',
        data: [],
      }
    ];
  }

}
