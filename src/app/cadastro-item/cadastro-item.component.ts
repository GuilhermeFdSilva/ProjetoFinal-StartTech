import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/assets/services/usuario/usuario.service';
import { ProdutoService } from 'src/assets/services/produto/produto.service';
import { GptService } from 'src/assets/services/openai/gpt.service'

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.scss']
})
export class CadastroItemComponent implements OnInit {
  cadastrarItem: FormGroup;

  itemId: string;

  imagens: Array<{ url: string }> = [{ url: '' }];
  titulo = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]);
  descricao = new FormControl('', [Validators.required, Validators.minLength(30), Validators.maxLength(200)]);
  preco = new FormControl('', [Validators.required, this.validarNumeros]);
  tags: Array<string> = [];

  adicionarImagem() {
    this.imagens.push({ url: '' });
  }

  removerImagem(index: number) {
    this.imagens.splice(index, 1);
  }

  verificarCheck() {
    const checks = document.getElementsByName('categorias');
    let checked = false;
    checks.forEach((element) => {
      if (element instanceof HTMLInputElement && element.checked) {
        checked = true;
        return;
      }
      console.log(checked)
    });
    checks.forEach((element) => {
      if (checked) {
        element.removeAttribute('required');
      } else {
        element.setAttribute('required', 'true');
      }
    });
    this.listarChecks(checks);
  }

  listarChecks(checks: NodeListOf<HTMLElement>) {
    this.tags = [];
    checks.forEach((element) => {
      if (element instanceof HTMLInputElement && element.checked) {
        this.tags.push(element.value);
      }
    });
  }

  enviarDados() {
    const arrayDeImagens: Array<string> = [];
    this.imagens.forEach((imagem) => {
      if (!(imagem.url === '')) {
        arrayDeImagens.push(imagem.url);
      }
    });
    const novoProduto = {
      usuarioId: this.usuarioService.getUsuarioPrincipal().getId(),
      titulo: this.titulo.value,
      descricao: this.descricao.value,
      preco: this.preco.value ? parseFloat(this.preco.value) : 0,
      imagens: arrayDeImagens,
      tags: this.tags
    }
    this.imagens = [{ url: '' }];
    this.produtoService.criarItem(novoProduto);
  }

  validarNumeros(control: any) {
    const numero = control.value;
    if (/^\d+$/.test(numero)) {
      return null;
    } else {
      return { numerosInvalidos: true };
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.itemId = param.get('id') ?? '';
    });
    // if (!this.usuarioService.getLogado()) {
    //   this.router.navigate(['/home']);
    // }
    if (this.itemId) {
      this.produtoService.getItem().getImagens().forEach((imagem) => {
        this.imagens.push({ url: imagem });
      });
      this.titulo.setValue(this.produtoService.getItem().getTitulo());
      this.descricao.setValue(this.produtoService.getItem().getDescricao());
      this.preco.setValue(this.produtoService.getItem().getPreco().toString());
      this.produtoService.getItem().getTags().forEach((tag) => {
        this.tags.push(tag);
      });
      // document.getElementsByName('categorias').forEach((element) => {
      //   const elementValue = element instanceof
      //   if (this.tags.includes(element.value))
      // });
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private router: Router, protected usuarioService: UsuarioService, protected produtoService: ProdutoService) { }
}
