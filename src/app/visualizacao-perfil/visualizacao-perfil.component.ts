import { Usuario } from '../../assets/services/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizacao-perfil',
  templateUrl: './visualizacao-perfil.component.html',
  styleUrls: ['./visualizacao-perfil.component.scss']
})
export class VisualizacaoPerfilComponent implements OnInit {
  itens: any[] = [];
  usuarios: any[] = [];

  usuarioId: string;

  usuario: any;
  itensDoUsuario: any[];

  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.usuarioId = params.get('id') ?? '';
    });
    this.http.get<any>('./assets/dummy.json').subscribe((dummy) => {
      this.itens = dummy.itens;
      this.usuarios = dummy.usuarios;
      this.usuario = this.usuarios.find((u) => u.id === parseInt(this.usuarioId));
      this.itensDoUsuario = this.itens.filter((item) => item.usuario_id === parseInt(this.usuarioId));
    });
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
