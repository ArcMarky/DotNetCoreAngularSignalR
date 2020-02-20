"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var am4core = require("@amcharts/amcharts4/core");
var am4charts = require("@amcharts/amcharts4/charts");
var animated_1 = require("@amcharts/amcharts4/themes/animated");
am4core.useTheme(animated_1.default);
var SignalRGraphsComponent = /** @class */ (function () {
    function SignalRGraphsComponent(zone, _signalRGraphsService) {
        this.zone = zone;
        this._signalRGraphsService = _signalRGraphsService;
        this.hasBackendData = false;
    }
    SignalRGraphsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.signalrConnectionEstablished$ = this._signalRGraphsService.connectionEstablished$;
        this._signalRGraphsService.priorityNumberRecieved$.subscribe(function (message) {
            console.log("from component : " + message);
            _this.disposeAndGenerateNewChart(message);
        });
    };
    SignalRGraphsComponent.prototype.disposeAndGenerateNewChart = function (message) {
        var data = Object.keys(message).map(function (x) { return message[x]; });
        if (!this.hasBackendData) {
            this.chart.dispose();
            console.log(data);
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.paddingRight = 20;
            chart.data = data;
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "dateTimeValue";
            series.dataFields.valueY = "data";
            series.tooltipText = "{valueY.value}";
            chart.cursor = new am4charts.XYCursor();
            var scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
            this.chart = chart;
            this.hasBackendData = true;
        }
        else {
            this.chart.data = data;
        }
    };
    SignalRGraphsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.paddingRight = 20;
            var data = [];
            var visits = 10;
            for (var i = 1; i < 366; i++) {
                visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
                data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
            }
            chart.data = data;
            var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;
            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";
            series.tooltipText = "{valueY.value}";
            chart.cursor = new am4charts.XYCursor();
            var scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;
            _this.chart = chart;
        });
    };
    SignalRGraphsComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.chart) {
                _this.chart.dispose();
            }
        });
    };
    SignalRGraphsComponent.prototype.startGettingData = function () {
        this._signalRGraphsService.getHeartRate().then(function (res) {
        });
    };
    SignalRGraphsComponent = __decorate([
        core_1.Component({
            selector: 'app-signalrgraphs',
            templateUrl: './signalrgraphs.component.html'
        })
    ], SignalRGraphsComponent);
    return SignalRGraphsComponent;
}());
exports.SignalRGraphsComponent = SignalRGraphsComponent;
//# sourceMappingURL=signalrgraphs.component.js.map