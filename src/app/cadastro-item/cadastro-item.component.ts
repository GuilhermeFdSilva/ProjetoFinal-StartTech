import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GptService } from 'src/assets/services/openai/gpt.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.scss']
})
export class CadastroItemComponent {
  titulo: string = '';
  descricao: string = '';

  adicionarImagem() {
    let imagens = document.getElementById('imagens');
    if (imagens) {
      imagens.innerHTML += '<input type="url" class="form-control" style="margin-top: 5px;" placeholder="Ex: https://url-da-imagem.com">';
    }
  }

  removerImagem() {
    let imagens = document.getElementById('imagens');
    if (imagens && imagens.lastChild && imagens.childElementCount > 1) {
      imagens.removeChild(imagens.lastChild);
    }
  }

  limitarCaracteres() {
    const limite = 200;
    const erro = document.getElementById('erro-descricao');
    if (erro) {
      erro.innerHTML = ''
    }
    if (this.descricao.length > limite) {
      this.descricao = this.descricao.substring(0, limite);
      if (erro) {
        erro.innerHTML = 'Máximo 200 caracteres'
      }
    }
  }

  gerarDescricao() {
    if ( true ){

    }
    this.gptHelp.gerarDescricao('abc').subscribe()
  }

  constructor(private gptHelp: GptService) { }
}
