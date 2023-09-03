import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UsuarioService,
  Usuario,
} from 'src/assets/services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router ) { 
    
  }


  
  mensagemErro: string = '';

  email: string = '';
  senha: string = '';
  nome: string = '';
  endereco: string = '';
  celular: string = '';

  cadastra() {
    const usuario: any = { email: this.email, senha: this.senha, nome: this.nome, endereco: this.endereco, celular: this.celular }
    this.usuarioService.criarUsuario(usuario);
    this.login();
  }

  loga() {
    this.usuarioService.fazerLogin(this.email, this.senha);
    this.usuarioService.atualizarDados.subscribe((Response) => {
      if (Response === 'Bem-vindo'){
        this.router.navigate(['/home'])
      }
      else {
        this.mensagemErro = "E-mail ou senha inválidos, tente novamente"
      }
    } );
  }

  cadastrar() {
    document.getElementById('login')?.classList.remove('activate');
    document.getElementById('cadastro')?.classList.add('activate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  login() {
    document.getElementById('cadastro')?.classList.remove('activate');
    document.getElementById('login')?.classList.add('activate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    if(this.usuarioService.getLogado()) {
      this.router.navigate(['home']);
    }
  }
}
