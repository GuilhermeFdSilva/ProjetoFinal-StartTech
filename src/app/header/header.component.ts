import { UsuarioService } from './../../assets/services/usuario/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  usuario: any = {};
  nome: string = '';
  logado: boolean = false;

  constructor (private usuarioService: UsuarioService) {
    this.usuarioService.atualizarDados.subscribe((response) => {
      this.usuario = usuarioService.getUsuarioPrincipal();
      this.logado = usuarioService.getLogado();
      this.nome = usuarioService.getUsuarioPrincipal().getNome();
    })
  }
}
