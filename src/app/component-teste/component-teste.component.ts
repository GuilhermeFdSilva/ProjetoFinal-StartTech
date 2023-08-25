import { Usuario, UsuarioService } from 'src/assets/services/usuario/usuario.service';
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

  usuarioPrincipal: Usuario;

  usuarioService: UsuarioService;

  todosUsuarios: Array<Usuario>;

  usuarioAlvo: Usuario;

  constructor(private gptService: GptService, usuarioService: UsuarioService) {  
    this.usuarioService = usuarioService;
    this.usuarioPrincipal = usuarioService.getUsuarioPrincipal();
    this.todosUsuarios = usuarioService.getUsuarios();
    this.usuarioService.eventoLogin.subscribe((evento) => {
      this.usuarioPrincipal = usuarioService.getUsuarioPrincipal();
      this.usuarioAlvo = this.todosUsuarios[2];
      alert(evento);
    });
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
    this.usuarioService.fazerLogin('usuarioa@example.com', 'senha123');
  }

  criarUsuario() {
    // this.usuarioService.cirarUsuario()
    //   .subscribe((response) => {
    //     console.log(true);
    //   },
    //   (error) => {
    //     console.log(false + error.mesage);
    //   });
    
    // this.usuarioService.atualizarCadastro(
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
    this.usuarioService.toggleSeguir(3);
  }

}
