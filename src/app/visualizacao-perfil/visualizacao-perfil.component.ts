import { Usuario, UsuarioService } from '../../assets/services/usuario/usuario.service';
import { ProdutoService } from '../../assets/services/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-visualizacao-perfil',
  templateUrl: './visualizacao-perfil.component.html',
  styleUrls: ['./visualizacao-perfil.component.scss']
})

export class VisualizacaoPerfilComponent implements OnInit {

  usuario: any = {};
  numeroSeguidores: number = 0;
  numeroSeguindo: number = 0;

  itens: any[] = [];
  usuarios: any[] = [];

  usuarioId: string = '';
  
  itensDoUsuario: any[] = [];

  constructor(private UsuarioService: UsuarioService, private ProdutoService: ProdutoService,private activatedRouter: ActivatedRoute, private router: Router) {
    this.UsuarioService.atualizarDados.subscribe((response) => {
      this.UsuarioService.getUsuarioById(parseInt(this.usuarioId)).subscribe((usuario) => {this.usuario = Object.assign(new Usuario, usuario)});});
      this.itensDoUsuario = this.ProdutoService.getItensUsuarioMain();
      
      console.log (this.usuario);
    };
   

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.usuarioId = params.get('id') ?? '';
    }); // seta o id do usuario

    this.usuario = this.UsuarioService.getUsuarioById(parseInt(this.usuarioId));
    this.numeroSeguidores = this.usuario.seguidores().length;
    this.numeroSeguindo = this.usuario.seguindo().length;

    console.log (this.usuarioId)
    console.log (this.usuario)
    console.log (this.numeroSeguidores)
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
