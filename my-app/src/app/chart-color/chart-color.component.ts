import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-chart-color',
  templateUrl: './chart-color.component.html',
  styleUrls: ['./chart-color.component.scss']
})
export class ChartColorComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  @Input() color:  any;

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
    this.updateChart(this.color);
  }

  onChartTypeSelected(type) {
    this.chartType = type;
    this.updateChart(this.color);
  }

  onXSelected(xAxes) {
    this.xAxes = xAxes;
    console.log(this.xAxes)
    this.updateChart(this.color);
  }
  onYSelected(yAxes) {
    this.yAxes = yAxes;
    this.updateChart(this.color);
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
      if(this.chart.chart) {
        // console.log("bla");
        this.chart.chart.config.data.labels = this.labels;
        this.chart.chart.config.type = this.chartType;
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
        backgroundColor: '#b8d7ea',
        hoverBackgroundColor: '#0279c1'
      }
    ];
    this.chartData = [
      {
        label: 'Experiment',
        data: []
      }
    ];
  }


}
