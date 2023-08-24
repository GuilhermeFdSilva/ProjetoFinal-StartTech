import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTesteComponent } from './component-teste/component-teste.component';
import { HomeComponent } from './home/home.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'perfil-cliente', component: PerfilClienteComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'detalhes/:id', component: DetalhesComponent },

  // Excluir
  { path: 'teste', component: ComponentTesteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }