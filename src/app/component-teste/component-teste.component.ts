import { GptService } from '../../assets/services/openai/gpt.service';
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

  chamaGeradorDescricao (evento: any) {
    const botaoDeEnvio = evento.target as HTMLButtonElement;
    botaoDeEnvio.setAttribute('disabled', 'true');
    this.gptService.gerarDescricao(this.teste).subscribe(
      (response) => {
        this.textoGerado = response.choices[0].text;
        botaoDeEnvio.removeAttribute('disabled');
      },
      (error) => {
        alert("Erro na requisição: " + error.message);
      }
    )
  }
}
