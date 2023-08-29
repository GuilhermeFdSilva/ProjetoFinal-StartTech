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
  seguindo: any;

  ngOnInit(): void {
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.usuario = dummy.usuarios[0];
    });
  }

  editarCampo(campo: string) {

  }

  constructor(private http: HttpClient) { }
}
