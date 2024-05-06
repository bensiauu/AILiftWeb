import { Component } from '@angular/core';
import {chartConfig} from "@dis/settings/chart.config";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  chartConfig = chartConfig;
  data = [75,100-75];
  ColorSeries=[];
  lift_cond_desc = "GOOD";

  public gridView: any[];

  public mySelection: string[] = [];

  labelContent(e: any): string {
    return e.value + '%';
  }



  

  ngOnInit(): void {
    if (this.lift_cond_desc == "GOOD") {
      this.ColorSeries = ['#2dce89', 'grey'];

    } else {
      this.ColorSeries = ['#f5365c', '#40444a'];
    }
  }
}
