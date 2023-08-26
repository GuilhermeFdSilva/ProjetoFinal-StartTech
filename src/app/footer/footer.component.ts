import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links: Array<any> = [
    {
      rota: 'home',
      pagina: 'Home'
    },
    {
      rota: 'cadastro',
      pagina: 'Cadastro'
    },
    {
      rota: 'quem-somos',
      pagina: 'Quem somos'
    },
  ];
  redesSociais: Array<any> = [
    {
      nome: 'Instagram',
      link: 'https://www.instagram.com/antiquary02/',
      icone: 'bi bi-instagram'
    },
    {
      nome: 'LinkedIn',
      link: 'http://www.linkedin.com',
      icone: 'bi bi-linkedin'
    },
    {
      nome: 'Email',
      link: 'mailto:antiquary507@gmail.com',
      icone: 'bi bi-envelope-fill'
    }
  ];
}
