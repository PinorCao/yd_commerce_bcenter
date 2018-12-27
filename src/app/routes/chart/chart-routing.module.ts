import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartG2Component } from './g2/g2.component';
import { ChartTrendComponent } from './trend/trend.component';
import { ChartNgxChartsComponent } from './ngx-charts/ngx-charts.component';

const routes: Routes = [
  { path: 'g2', component: ChartG2Component },
  { path: 'ngx-trend', component: ChartTrendComponent },
  { path: 'ngx-charts', component: ChartNgxChartsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
