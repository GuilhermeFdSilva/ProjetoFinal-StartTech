import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  itens: any[] = [];
  usuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.itens = dummy.itens;
      this.usuarios = dummy.usuarios;
    });
  }

  getNomeUsuario(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nome : 'Desconhecido';
  }

  verDetalhes(itemID: number) {
    // Implementar a lógica para ver detalhes do item
  }
}
