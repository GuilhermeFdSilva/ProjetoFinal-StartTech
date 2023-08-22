import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTesteComponent } from './component-teste/component-teste.component';

const routes: Routes = [
  { path : 'teste', component : ComponentTesteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }