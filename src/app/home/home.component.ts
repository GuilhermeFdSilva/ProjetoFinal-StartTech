import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  itens: any[] = [];
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

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

  verDetalhes(itemId: number) {
    this.router.navigate(['detalhes', itemId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contato(usuarioId: number) {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    window.location.href = `https://wa.me/55${usuario.celular}`;
  }
}
