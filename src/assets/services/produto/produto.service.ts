import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private itensUsuarioMain: Array<Produto> = [];
  private item: Produto = new Produto();
  private vendedor: Usuario = new Usuario();
  private itensVendedor: Array<Produto> = [];
  private todosItens: Array<Produto> = [];

  getItem(): Produto {
    return this.item;
  }

  getVendedorItem(): Usuario {
    return this.vendedor;
  }

  getItens(): Array<Produto> {
    return this.todosItens;
  }

  getItensVendedor(): Array<Produto> {
    return this.itensVendedor;
  }

  getItensUsuarioMain(): Array<Produto> {
    return this.itensUsuarioMain;
  }

  getItensEMainItens(): void {
    this.todosItens = [];
    this.getDados().subscribe((response: Array<Produto>) => {
      response.forEach((item) => {
        this.todosItens.push(Object.assign(new Produto, item));
      });
      this.itensUsuarioMain = [];
      this.todosItens.forEach((item: Produto) => {
        if (this.usuarioService.getUsuarioPrincipal().getId() === item.getUsuarioId()) {
          this.itensUsuarioMain.push(Object.assign(new Produto, item));
        }
      });
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  selecionarItem(itemId: number): void {
    this.getDados().subscribe((response: Array<Produto>) => {
      this.item = Object.assign(new Produto, response.find((item: Produto) => {
        item = Object.assign(new Produto, item);
        return item.getId() === itemId;
      }));
      this.usuarioService.getUsuarioById(this.item.getUsuarioId()).subscribe(response => {
        this.vendedor = Object.assign(new Usuario, response);
      });
      this.getItensUsuario(this.vendedor.getId());
      this.usuarioService.atualizarDados.next('Item pronto');
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  selecionaVendedor(donoId: number): void {
    this.usuarioService.getUsuarioById(donoId).subscribe((response) => {
      this.vendedor = Object.assign(new Usuario, response);
      this.getItensUsuario(this.vendedor.getId());
      this.usuarioService.atualizarDados.next('');
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      })
  }

  criarItem(objeto: any): void {
    const item = Object.assign(new Produto, objeto);
    this.addDados(item).subscribe(() => {
      this.getItensEMainItens()
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  alterarItem(objeto: any): void {
    const itemAtualizado = Object.assign(new Produto, objeto);
    this.atualizarItem(itemAtualizado).subscribe(() => {
      this.getItensEMainItens();
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  deletar(itemId: number): void {
    this.deletarItem(itemId).subscribe(() => {
      this.getItensEMainItens();
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  private getItensUsuario(usuarioId: number): void {
    this.getDados().subscribe((response: Array<Produto>) => {
      this.itensVendedor = [];
      response.forEach((produto: Produto) => {
        produto = Object.assign(new Produto, produto);
        if (produto.getUsuarioId() === usuarioId) {
          this.itensVendedor.push(Object.assign(new Produto, produto));
        }
      });
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  private getDados(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/itens');
  }

  private addDados(novoItem: Produto): Observable<any> {
    return this.http.post('http://localhost:3000/itens', novoItem);
  }

  private atualizarItem(itemAtualizado: Produto): Observable<any> {
    return this.http.patch(`http://localhost:3000/itens/${this.item.getId()}`,
      {
        titulo: itemAtualizado.getTitulo(),
        descricao: itemAtualizado.getDescricao(),
        preco: itemAtualizado.getPreco(),
        imagens: itemAtualizado.getImagens(),
        tags: itemAtualizado.getTags()
      });
  }

  private deletarItem(itemId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/itens/${itemId}`);
  }

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.usuarioService.atualizarDados.subscribe(() => {
      this.getItensEMainItens();
    });
  }
}

class Produto {
  private id: number;
  private usuarioId: number;
  private titulo: string;
  private descricao: string;
  private preco: number;
  private imagens: Array<string> = [];
  private tags: Array<string> = [];

  constructor() { }

  //Getters
  getId(): number {
    return this.id;
  }
  getUsuarioId(): number {
    return this.usuarioId;
  }
  getTitulo(): string {
    return this.titulo;
  }
  getDescricao(): string {
    return this.descricao;
  }
  getPreco(): number {
    return this.preco;
  }
  getImagens(): Array<string> {
    return this.imagens;
  }
  getTags(): Array<string> {
    return this.tags;
  }

  //Setters
  setUsuario(usuarioId: number) {
    this.usuarioId = usuarioId;
  }
  setTitulo(titulo: string) {
    this.titulo = titulo;
  }
  setDescricao(descricao: string) {
    this.descricao = descricao;
  }
  setPreco(preco: number) {
    this.preco = preco;
  }

  addImagem(urlImagem: string) {
    this.imagens.push(urlImagem);
  }
  addTag(tag: string) {
    this.tags.push(tag);
  }
  removerImagem(index: number) {
    this.imagens = this.imagens.splice(index, 1);
  }
  removerTag(tag: string) {
    const indice = this.tags.indexOf(tag);
    this.tags = this.tags.splice(indice, 1);
  }
}
