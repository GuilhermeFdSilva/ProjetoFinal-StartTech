import { Router } from '@angular/router';
import { UsuarioService } from './../../assets/services/usuario/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  nome: string = '';
  logado: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuarioService.atualizarDados.subscribe((response) => {
      this.logado = usuarioService.getLogado();
      this.nome = usuarioService.getUsuarioPrincipal().getNome();
    });
  }

  logout():void {
    this.usuarioService.fazerLogout();
    this.router.navigate(['home']);
  }
}
