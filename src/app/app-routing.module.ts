import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'table-view' },
  { path: 'table-view', component: TableViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
