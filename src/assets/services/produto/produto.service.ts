import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroProdutoService {

  

  constructor() { }
}

class Produto {
  private id: number;
  private usuario: Object;
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
  getUsuario(): Object {
    return this.usuario;
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
  setUsuario(usuario: any) {
    
  }
}
