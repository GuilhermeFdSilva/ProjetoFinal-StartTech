import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UsuarioService,
  Usuario,
} from 'src/assets/services/usuario/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cadastroForm = this.fb.group(
      {
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        endereco: ['', Validators.required],
        whatsapp: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        senha: ['', Validators.required],
        senha2: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator, // Adiciona um validador personalizado para confirmar senhas
      }
    );
  }

  cadastroForm: FormGroup;
  mensagemErro: string = '';

  email: string = '';
  senha: string = '';
  nome: string = '';
  endereco: string = '';
  celular: string = '';

  cadastra() {
    if (this.cadastroForm && this.cadastroForm.valid) {
      const email = this.cadastroForm.get('email');
      const senha = this.cadastroForm.get('senha');
      const nome = this.cadastroForm.get('nome');
      const endereco = this.cadastroForm.get('endereco');
      const whatsapp = this.cadastroForm.get('whatsapp');
  
      if (email && senha && nome && endereco && whatsapp) {
        const usuario: any = {
          email: email.value,
          senha: senha.value,
          nome: nome.value,
          endereco: endereco.value,
          celular: whatsapp.value,
        };
        this.usuarioService.criarUsuario(usuario);
        this.login();
      }
    }
  }
  

  loga() {
    this.usuarioService.fazerLogin(this.email, this.senha);
    this.usuarioService.atualizarDados.subscribe((Response) => {
      if (Response === 'Bem-vindo') {
        this.router.navigate(['/home']);
      } else {
        this.mensagemErro = 'E-mail ou senha inválidos, tente novamente';
      }
    });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.usuarioService.getLogado()) {
      this.router.navigate(['home']);
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const senha2 = group.get('senha2')?.value;
    return senha === senha2 ? null : { passwordMismatch: true };
  }
}
