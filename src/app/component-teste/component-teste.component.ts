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

  constructor(private gptService: GptService, private usuario: UsuarioService) {
    usuario.eventoLogin.subscribe(resposta => {
      alert('login com sucesso?' + resposta)
    })
  }

  chamaGeradorDescricao(evento: any) {
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

  fazerLogin(){
    this.usuario.fazerLogin('usuarioa@example.com', 'senha123');
  }

  criarUsuario() {
    // this.usuario.cirarUsuario()
    //   .subscribe((response) => {
    //     console.log(true);
    //   },
    //   (error) => {
    //     console.log(false + error.mesage);
    //   });
    
    // this.usuario.atualizarCadastro(
    //   {
    //     "id": 1,
    //     "nome": "Usuário A",
    //     "endereco": "Rua A, 123",
    //     "celular": "(11) 1234-5678",
    //     "email": "usuarioa@example.com",
    //     "senha": "funfandoComSucesso",
    //     "seguidores": [
    //       2,
    //       3
    //     ]
    //   }
    // ).subscribe((response) => console.log("foi"), (error) => console.log("nao foi"));
    this.usuario.toggleSeguir(3);
  }

}
