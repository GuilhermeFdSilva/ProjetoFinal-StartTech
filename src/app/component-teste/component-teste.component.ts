import { UsuarioService } from 'src/assets/services/usuario/usuario.service';
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

  constructor (private gptService: GptService, private usuario: UsuarioService) { }

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

  criarUsuario() {
    this.usuario.cirarUsuario('Guilherme', 'Rua dos Alfeneiros n°4', '(11) 4002-8922', 'guilherminho@gmail.com', '123456');
  }
}
