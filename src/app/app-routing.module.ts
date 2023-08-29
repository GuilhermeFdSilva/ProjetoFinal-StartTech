import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { VizualizacaoPerfilComponent } from './vizualizacao-perfil/vizualizacao-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'meu-perfil', component: PerfilClienteComponent },
  { path: 'login', component: CadastroClienteComponent },
  { path: 'perfil/:id', component: VizualizacaoPerfilComponent },
  { path: 'quem-somos', component: QuemSomosComponent },
  { path: 'detalhes/:id', component: DetalhesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }