import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ProdutoService } from 'src/assets/services/produto/produto.service';
import { UsuarioService } from 'src/assets/services/usuario/usuario.service';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {
  // Variaveis de exibição
  protected usuario: any = {};
  seguidores: boolean;
  itemAExcluir: string = '';
  idItemAExcluir: number = -1;
  titulo: string = '';
  verSenha: boolean = false;

  // Variaveis de Controle
  nome = new FormControl('', Validators.required);
  email = new FormControl('', Validators.required);
  senhaAtt = new FormControl('', Validators.required);
  senhaAttConfirm = new FormControl('', Validators.required);
  endereco = new FormControl('', Validators.required);
  celular = new FormControl('', Validators.required);

  ngOnInit(): void {
    if (!this.usuarioService.getLogado()) {
      this.router.navigate(['home']);
    }
    document.getElementById('ver-senha')?.addEventListener('touchstart', () => this.ver());
    document.getElementById('ver-senha')?.addEventListener('touchend', () => this.esconder());
  }

  temSeguidores() {
    return this.usuarioService.getUsuarioPrincipal().getSeguidores().length > 0;
  }
  
  eSeguido() {
    return this.usuarioService.getUsuarioPrincipal().getSeguindo().length > 0;
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

  ver() {
    this.verSenha = true;
  }

  esconder() {
    this.verSenha = false;
  }

  submeter() {
    const usuarioAtualizado = {
      nome: this.nome.value === '' ? this.usuario.nome : this.nome.value,
      email: this.email.value === '' ? this.usuario.email: this.email.value,
      senha: this.senhaAtt.value === '' ? this.usuario.senha : this.senhaAtt.value,
      endereco: this.endereco.value === '' ? this.usuario.endereco : this.endereco.value,
      celular: this.celular.value === '' ? this.usuario.celular : this.celular.value
    }

    this.usuarioService.atualizarCadastro(usuarioAtualizado);
  }

  camuflar() {
    if (this.usuarioService.getUsuarioPrincipal().getSenha()){
      if (this.usuarioService.getUsuarioPrincipal().getSenha().length <= 0) {
        return '';
      }
      const regular = /./g;
      const camuflada = this.usuarioService.getUsuarioPrincipal().getSenha().replaceAll(regular, '*');
      return camuflada;
    }
    return '';
  }

  deletar(nomeItem:string, idItem: number) {
    this.itemAExcluir = nomeItem;
    this.idItemAExcluir = idItem;
  }

  confirmarDeletar() {
    this.produtoService.deletar(this.idItemAExcluir);
  }

  constructor(protected usuarioService: UsuarioService, protected produtoService: ProdutoService, private router: Router) {
    this.usuarioService.atualizarDados.subscribe((response) => {
      this.usuario = this.usuarioService.getUsuarioPrincipal();
    });
  }
}
