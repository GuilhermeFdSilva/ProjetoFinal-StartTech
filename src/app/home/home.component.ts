import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/assets/services/produto/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  itens: any[] = [];
  itensFiltrados: any[] = [];
  usuarios: any[] = [];

  constructor(private http: HttpClient, private router: Router, protected produtoService: ProdutoService) {
    this.itensFiltrados = [...this.itens];

    window.addEventListener('scroll', () => {
      if (window.scrollY > 66) {
        document.getElementById('botao-topo')?.classList.add('visivel');
      } else {
        document.getElementById('botao-topo')?.classList.remove('visivel');
      }
    });
  }

  ngOnInit(): void {
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.itens = dummy.itens;
      this.usuarios = dummy.usuarios;
      this.itensFiltrados = [...this.itens];
      // O operador ..., chamado operador de propagação ou spread operator em
      // JavaScript/TypeScript, é usado para criar cópias de arrays e objetos,
      // bem como para espalhar os elementos de um array ou objeto em outro.
    });
  }

  getNomeUsuario(usuarioId: number): string {
    const usuario = this.usuarios.find((u) => u.id === usuarioId);
    return usuario ? usuario.nome : 'Desconhecido';
  }
  

  verDetalhes(itemId: number) {
    this.router.navigate(['detalhes', itemId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contato(usuarioId: number) {
    const usuario = this.usuarios.find((u) => u.id === usuarioId);
    window.location.href = `https://wa.me/55${usuario.celular}`;
  }

  voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filtrarItensPorTag(tag: string) {
    if (tag === '') {
      this.itensFiltrados = this.itens; // Mostrar todos os itens
    } else {
      this.itensFiltrados = this.itens.filter((item) =>
        item.tags.includes(tag)
      );
    }
  }
}
