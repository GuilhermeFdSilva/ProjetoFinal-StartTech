import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario, UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroProdutoService {
  private item: Produto = new Produto();
  private dono: Usuario = new Usuario()
  private itens: Array<Produto> = [];

  getItem() {
    
  }

  // Trocar nome dessa
  setItem(itemId: number) {
    this.getDados().subscribe((response: Array<Produto>) => {
      this.item = Object.assign(new Produto, response.find((item: Produto) => {
        item = Object.assign(new Produto, item);
        return item.getId() === itemId;
      }));
      this.usuarioService.atualizarDados.next('');
    },
      (error) => {
        this.usuarioService.erroServidor.next(error);
      });
  }

  private getDados(): Observable<any> {
    return this.http.get<any>('https://localhost:3000/itens');
  }

  private addDados(novoItem: Produto): Observable<any> {
    return this.http.post('https://localhost:3000/itens', novoItem);
  }

  private atualizarItem(itemAtualizado: Produto): Observable<any> {
    return this.http.patch(`http://localhost:3000/itens/${itemAtualizado.getId()}`,
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
