import { Component, NgZone, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { SignalRGraphsService } from '../services/signalrgraphs.service';
import { Observable } from 'rxjs';

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-signalrgraphs',
  templateUrl: './signalrgraphs.component.html'
})

export class SignalRGraphsComponent implements OnInit {
  private chart: am4charts.XYChart;
  signalrConnectionEstablished$: Observable<boolean>;
  public hasBackendData: boolean = false;
  constructor(private zone: NgZone, private _signalRGraphsService: SignalRGraphsService) {

  }
  ngOnInit(): void {
    this.signalrConnectionEstablished$ = this._signalRGraphsService.connectionEstablished$;
    this._signalRGraphsService.priorityNumberRecieved$.subscribe(message => {
      console.log("from component : " + message);
      this.disposeAndGenerateNewChart(message);
    });
  }
  disposeAndGenerateNewChart(message: any) {
    let data: any = Object.keys(message).map(x => message[x]);
    if (!this.hasBackendData) {
      this.chart.dispose();
    
      console.log(data);
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;
      chart.data = data;
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "dateTimeValue";
      series.dataFields.valueY = "data";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
      this.hasBackendData = true;
    }
    else {
      this.chart.data = data;
    }
   
  }



  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  startGettingData() {
    this._signalRGraphsService.getHeartRate().then((res) => {
    
    });
  }
}
