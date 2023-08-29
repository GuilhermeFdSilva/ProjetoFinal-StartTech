import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  itens: any[] = [];
  usuarios: any[] = [];

  produto: any;

  produtoId: string;

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.produtoId = params.get('id') ?? '';
    });
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.itens = dummy.itens;
      this.usuarios = dummy.usuarios;
      this.produto = this.itens.find((item) => {
        return item.id === parseInt(this.produtoId);
      });
    });
  }

  getNomeUsuario(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nome : 'Desconhecido';
  }

  verVendedor(usuarioId: string){
    this.router.navigate(['perfil', usuarioId]);
  }

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private http: HttpClient) { }
}
