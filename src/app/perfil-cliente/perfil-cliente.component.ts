import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/assets/services/produto/produto.service';
import { UsuarioService } from 'src/assets/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {
  usuario: any = {};
  itemAExcluir: string = '';
  titulo: string = '';
  senha: string = '';
  itensDoUsuario: any[] = [];
  seguidores: any[] = [];
  seguindo: any[] = [];

  ngOnInit(): void {
    if (!this.usuarioService.getLogado()) {
      this.router.navigate(['home'])
    }
  }

  editarCampo(campo: string) {
    document.getElementById(`p-${campo}`)?.classList.add('invisivel');
    document.getElementById(`button-${campo}`)?.classList.add('invisivel');
    document.getElementById(`input-${campo}`)?.classList.remove('invisivel');
  }

  enviar(campo: string) {
    document.getElementById(`p-${campo}`)?.classList.remove('invisivel');
    document.getElementById(`button-${campo}`)?.classList.remove('invisivel');
    document.getElementById(`input-${campo}`)?.classList.add('invisivel');
  }

  constructor(private usuarioService: UsuarioService, private produtoService: ProdutoService, private router: Router) {
    this.usuarioService.atualizarDados.subscribe((response) => {
      this.usuario = this.usuarioService.getUsuarioPrincipal();
      this.senha = this.usuarioService.getUsuarioPrincipal().getSenha();
      this.itensDoUsuario = this.produtoService.getItensUsuarioMain();
      this.seguidores = this.usuarioService.getSeguidores();
      this.seguindo = this.usuarioService.getSeguindo();
    });
  }
}
