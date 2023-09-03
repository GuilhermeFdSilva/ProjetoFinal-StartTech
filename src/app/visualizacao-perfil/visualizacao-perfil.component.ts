import { UsuarioService } from '../../assets/services/usuario/usuario.service';
import { ProdutoService } from '../../assets/services/produto/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-visualizacao-perfil',
  templateUrl: './visualizacao-perfil.component.html',
  styleUrls: ['./visualizacao-perfil.component.scss']
})

export class VisualizacaoPerfilComponent implements OnInit {

  usuarioId: string = '';

  abrir: boolean = false;

  seguindo: boolean = false;

  verDetalhes(itemId: number) {
    this.router.navigate(['detalhes', itemId]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  contato() {
    window.open(`https://wa.me/55${this.produtoService.getVendedorItem().getCelular()}`, '_blank');
  }

  seguir() {
    if (!this.UsuarioService.getLogado()) {
      return;
    }
    this.UsuarioService.toggleSeguir(this.produtoService.getVendedorItem());
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      this.usuarioId = params.get('id') ?? '';
    }); // seta o id do usuario
  }

  constructor(private UsuarioService: UsuarioService, protected produtoService: ProdutoService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.UsuarioService.atualizarDados.subscribe((response) => {
      if (response === 'Vendedor pronto') {
        this.abrir = true;
      }
      if (this.UsuarioService.getLogado()) {
        if (this.produtoService.getVendedorItem().getSeguidores().includes(this.UsuarioService.getUsuarioPrincipal().getId())) {
          this.seguindo = true;
        }
      }
      if (response === 'Seguindo :)') {
        this.seguindo = true;
      }
      if (response === 'Deixou de seguir :(') {
        this.seguindo = false;
      }
    });
  }
}
