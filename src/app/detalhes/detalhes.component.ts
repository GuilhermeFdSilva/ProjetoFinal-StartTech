import { UsuarioService } from './../../assets/services/usuario/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/assets/services/produto/produto.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  produtoId: string;

  abrir: boolean = false;

  ngOnInit() {
    this.activatedRouter.paramMap.subscribe(params => {
      this.produtoId = params.get('id') ?? '';
    });
  }

  verVendedor(usuarioId: number) {
    this.router.navigate(['/perfil', usuarioId]);
  }

  contato() {
    window.open(`https://wa.me/55${this.produtoService.getVendedorItem().getCelular()}`, '_blank');
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    protected produtoService: ProdutoService,
    private usuarioService: UsuarioService) {
      this.usuarioService.atualizarDados.subscribe((response) => {
        if(response === 'Item pronto') {
          this.abrir = true;
        }
      });
  }
}
