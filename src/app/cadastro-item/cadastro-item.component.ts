import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/assets/services/usuario/usuario.service';
import { ProdutoService } from 'src/assets/services/produto/produto.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.scss']
})
export class CadastroItemComponent implements OnInit {
  cadastrarItem: FormGroup;

  itemId: string;
  cadastro: boolean = true;

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
    const produto = {
      usuarioId: this.usuarioService.getUsuarioPrincipal().getId(),
      titulo: this.titulo.value,
      descricao: this.descricao.value,
      preco: this.preco.value ? parseFloat(this.preco.value) : 0,
      imagens: arrayDeImagens,
      tags: this.tags
    }
    this.imagens = [{ url: '' }];
    if (this.cadastro) {
      this.produtoService.criarItem(produto);
      this.limparFormulario();
    } else {
      this.produtoService.alterarItem(produto);
      this.limparFormulario();
    }
    this.mensagem();
  }

  validarNumeros(control: any) {
    const numero = control.value;
    if (/^\d+(\.\d{1,2})?$/.test(numero)) {
      return null;
    } else {
      return { numerosInvalidos: true };
    }
  }

  mensagem() {
    document.getElementById('mensagem')?.classList.add('mensagem');
    setTimeout(() => {
      document.getElementById('mensagem')?.classList.remove('mensagem');
    }, 5000)
  }

  limparFormulario() {
    this.itemId = '';
    this.cadastro = true;
    this.imagens = [{ url: '' }];
    this.titulo.setValue('');
    this.descricao.setValue('');
    this.preco.setValue('');
    document.getElementsByName('categorias').forEach((element) => {
      if (element instanceof HTMLInputElement) {
        if (this.tags.includes(element.value)) {
          element.checked = false;
        }
      }
    });
    this.verificarCheck();
    this.tags = [];
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.activatedRoute.paramMap.subscribe((param) => {
      this.itemId = param.get('id') ?? '';
    });
    if (!this.usuarioService.getLogado()) {
      this.router.navigate(['/home']);
    }
    if (this.itemId && this.itemId !== '') {
      this.cadastro = false;
      this.usuarioService.atualizarDados.subscribe((response) => {
        if (response === 'Item pronto') {
          this.imagens = [];
          this.produtoService.getItem().getImagens().forEach((imagem) => {
            this.imagens.push({ url: imagem });
          });
          this.titulo.setValue(this.produtoService.getItem().getTitulo());
          this.descricao.setValue(this.produtoService.getItem().getDescricao());
          this.preco.setValue(this.produtoService.getItem().getPreco().toString());
          this.produtoService.getItem().getTags().forEach((tag) => {
            this.tags.push(tag);
          });
          document.getElementsByName('categorias').forEach((element) => {
            if (element instanceof HTMLInputElement) {
              if (this.tags.includes(element.value)) {
                element.checked = true;
              }
            }
          });
          this.verificarCheck();
        }
      })
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    protected usuarioService: UsuarioService,
    protected produtoService: ProdutoService) {
  }
}

