import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { QuemSomosComponent } from './quem-somos/quem-somos.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { PerfilClienteComponent } from './perfil-cliente/perfil-cliente.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { VisualizacaoPerfilComponent } from './visualizacao-perfil/visualizacao-perfil.component';
import { CadastroItemComponent } from './cadastro-item/cadastro-item.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    QuemSomosComponent,
    DetalhesComponent,
    PerfilClienteComponent,
    CadastroClienteComponent,
    VisualizacaoPerfilComponent,
    CadastroItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
