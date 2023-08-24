import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario: Usuario;
  private logado: boolean = false;
  eventoLogin = new Subject<boolean>;
  erroServidor = new Subject<string>;

  getUsuario(): Object {
    return Object.assign(new Object, this.usuario);
  }

  criarUsuario(objeto: Object): Observable<any> {
    const usuario = Object.assign(new Usuario, objeto);
    return this.addDados(usuario);
  }

  fazerLogin(email: string, senha: string): void {
    this.getDados().subscribe(
      (response: Usuario[]) => {
        const usuarioLogin: Usuario | undefined = Object.assign(new Usuario(), response
          .find((objectUsuario: Usuario) => {
            objectUsuario = Object.assign(new Usuario(), objectUsuario)
            return objectUsuario.getEmail() === email;
          }));
        if (usuarioLogin && usuarioLogin.getSenha() === senha) {
          this.usuario = usuarioLogin;
          this.logado = true;
          this.eventoLogin.next(true);
        } else {
          this.eventoLogin.next(false);
        }
      },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  fazerLogout(): void {
    this.usuario = new Usuario();
    this.logado = false;
    this.eventoLogin.next(false);
  }

  atualizarCadastro(objetoAtualizado: Object): Observable<any> {
    const usuarioAtualizado = Object.assign(new Usuario(), objetoAtualizado);
    return this.atualizaDadosPessoais(usuarioAtualizado);
  }

  toggleSeguir(idUsuarioAlvo: number): void {
    if (!this.logado) {
      return;
    }
    this.usuario.seguirUsuario(idUsuarioAlvo);
    this.atualizarSeguidores(this.usuario).subscribe((response) => {
      this.eventoLogin.next(true);
    },
    (error) => {
      this.erroServidor.next(error);
    });
    this.getDados().subscribe((response) => {
      this.atualizarSeguidores(Object.assign(new Usuario(),
        response.find((objectUsuario: Usuario) => {
          objectUsuario = Object.assign(new Usuario, objectUsuario);
          return objectUsuario.getId() === idUsuarioAlvo;
        })));
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  private getDados(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/usuarios');
  }

  private addDados(novoUsuario: Usuario): Observable<any> {
    return this.http.post('http://localhost:3000/usuarios', novoUsuario);
  }

  private atualizaDadosPessoais(usuarioAtualizado: Usuario): Observable<any> {
    return this.http.patch(`http://localhost:3000/usuarios/${usuarioAtualizado.getId()}`,
      {
        email: usuarioAtualizado.getEmail(),
        senha: usuarioAtualizado.getSenha()
      });
  }

  private atualizarSeguidores(usuarioAtualizado: Usuario): Observable<any> {
    return this.http.patch(`http://localhost:3000/usuarios/${usuarioAtualizado.getId()}`,
      {
        seguidores: usuarioAtualizado.getSeguidores(),
        seguindo: usuarioAtualizado.getSeguindo()
      });
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
  private seguidores: Array<number> = [];
  private seguindo: Array<number> = [];

  constructor() { }

  // Getters
  getId(): number {
    return this.id;
  }
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
  getSeguindo(): Array<number> {
    return this.seguindo;
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

  //Seguidores
  adicionarSeguidor(seguidor: number): void {
    this.seguidores.push(seguidor);
  }
  seguirUsuario(idSeguido: number): void {
    this.seguindo.push(idSeguido);
  }
  removerSeguidor(seguidor: number): void {
    this.seguidores = this.seguidores.filter((id) => id !== seguidor);
  }
  pararDeSeguir(idSeguido: number) {
    this.seguindo = this.seguindo.filter((id) => id !== idSeguido);
  }
}
