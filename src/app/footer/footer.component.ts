import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links: Array<any> = ['pedra', 'papel', 'tesoura'];
  redesSociais: Array<any> = [{ imagem: '123', descricao: 'Facebook', link: '123' }]
}
