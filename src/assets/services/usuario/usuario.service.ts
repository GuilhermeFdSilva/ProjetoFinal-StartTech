import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario;
  private logado: boolean = false;

  cirarUsuario(
    nome: string,
    endereco: string,
    celular: string,
    email: string,
    senha: string) {
    let usuario = new Usuario(nome, endereco, celular, email, senha);
    this.http.post('http://localhost:3000/usuarios', usuario).subscribe(
      (response) => {
        return true
      },
      (error) => {
        return false;
      }
    );
  }

  constructor(private http: HttpClient) { }

}

class Usuario {
  private id: number;
  private nome: string;
  private endereco: string;
  private celular: string;
  private email: string;
  private senha: string;
  private seguidores: Array<number>;

  constructor(
    nome: string,
    endereco: string,
    celular: string,
    email: string,
    senha: string
  ) {
    this.nome = nome;
    this.endereco = endereco;
    this.celular = celular;
    this.email = email;
    this.senha = senha;
  }

  // Getters
  getNome(): string {
    return this.nome;
  }
  getEndereco(): string {
    return this.endereco;
  }
  getCelular(): string {
    return this.celular;
  }
  getEmail(): string {
    return this.email;
  }
  getSenha(): string {
    return this.senha;
  }
  getSeguidores(): Array<number> {
    return this.seguidores;
  }

  //Setters
  setNome(novoNome: string): void {
    this.nome = novoNome;
  }
  setEndereco(novoEndereco: string): void {
    this.endereco = novoEndereco;
  }
  setCelular(novoCelular: string): void {
    this.celular = novoCelular;
  }
  setEmail(novoEmail: string): void {
    this.email = novoEmail;
  }
  setSenha(novaSenha: string): void {
    this.senha = novaSenha;
  }
}
