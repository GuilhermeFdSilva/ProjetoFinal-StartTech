import { GptService } from './../../assets/services/gpt.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-teste',
  templateUrl: './component-teste.component.html',
  styleUrls: ['./component-teste.component.scss']
})
export class ComponentTesteComponent {

  teste: string;

  textoGerado = '';

  constructor (private gptService: GptService) { }

  functionName () {
    this.gptService.gerarDescricao(this.teste).subscribe(
      (response) => {
        this.textoGerado = response.choices[0].text;
      },
      (error) => {
        alert("Erro");
      }
    )
  }
}
