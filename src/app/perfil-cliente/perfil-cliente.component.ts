import { HttpClient } from '@angular/common/http';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss']
})
export class PerfilClienteComponent implements OnInit {
  titulo:string = '';
  usuario: any;
  senha: string = '';
  itensDoUsuario: any[];
  seguidores: any[] = [
      {
        "id": 2,
        "nome": "Ludmila Pavilsecov",
        "endereco": "Rua B, 456",
        "celular": "(22) 9876-5432",
        "email": "usuariob@example.com",
        "senha": "senha456",
        "seguidores": [1]
      },
      {
        "id": 3,
        "nome": "Linus Torvalds",
        "endereco": "Rua C, 789",
        "celular": "(33) 5555-1234",
        "email": "usuarioc@example.com",
        "senha": "senha789",
        "seguidores": []
      }
  ];

  ngOnInit(): void {
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.usuario = dummy.usuarios[0];
      this.itensDoUsuario = dummy.itens.filter((item: any) => {
         return item.id % 2 === 0;
      });
      let numero = 0;
      while(numero < this.usuario.senha.length) {
        this.senha += '*';
        numero++;
      }
    });
  }

  editarCampo(campo: string) {
     document.getElementById(`p-${campo}`)?.classList.add('invisivel');
     document.getElementById(`button-${campo}`)?.classList.add('invisivel');
     document.getElementById(`input-${campo}`)?.classList.remove('invisivel');
  }

  enviar(campo: string) {
    document.getElementById(`p-${campo}`)?.classList.remove('invisivel');
    document.getElementById(`button-${campo}`)?.classList.remove('invisivel');
    document.getElementById(`input-${campo}`)?.classList.add('invisivel');
  }

  constructor(private http: HttpClient) { }
}
