import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links: Array<any> = ['pedra', 'papel', 'tesoura'];
  redesSociais: Array<any> = [
    {
      nome: 'Facebook',
      link: 'http://www.facebook.com',
      icone: ''
    },
    {
      nome: 'Instagram',
      link: 'http://www.instagram.com',
      icone: ''
    },
    {
      nome: 'LinkedIn',
      link: 'http://www.linkedin.com',
      icone: ''
    }
  ];
}
