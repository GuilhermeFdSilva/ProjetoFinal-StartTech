import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent {
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
}
