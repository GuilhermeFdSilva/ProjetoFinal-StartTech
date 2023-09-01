import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioPincipal: Usuario = new Usuario();
  private seguidores: Array<Usuario> = [];
  private seguindo: Array<Usuario> = [];
  private logado: boolean = false;
  private todosUsuarios: Array<Usuario> = [];
  atualizarDados = new BehaviorSubject<string>('');
  erroServidor = new Subject<string>;

  getUsuarioPrincipal(): Usuario {
    return this.usuarioPincipal;
  }

  getLogado(): boolean {
    return this.logado;
  }

  getUsuarios(): Array<Usuario> {
    return this.todosUsuarios;
  }

  getUsuarioById(usuarioId: number): Usuario {
    return Object.assign(new Usuario, this.getDados().subscribe((response: Array<Usuario>) => {
      return response.find((usuario: Usuario) => {
        usuario = Object.assign(new Usuario, usuario);
        return usuario.getId() === usuarioId;
      });
    },
      (error) => {
        this.erroServidor.next(error);
        return new Usuario();
      }));
  }

  criarUsuario(objeto: Object): void {
    const usuario = Object.assign(new Usuario, objeto);
    this.addDados(usuario).subscribe((response) => {
      this.getDados().subscribe((response: Array<Usuario>) => {
        response.forEach(objeto => {
          this.todosUsuarios.push(Object.assign(new Usuario, objeto));
          this.atualizarDados.next('Usuário criado');
        });
      },
        (error) => {
          this.erroServidor.next(error);
        });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  fazerLogin(email: string, senha: string): void {
    this.getDados().subscribe(
      (response: Array<Usuario>) => {
        const usuarioLogin: Usuario | undefined = Object.assign(new Usuario(), response
          .find((objectUsuario: Usuario) => {
            objectUsuario = Object.assign(new Usuario(), objectUsuario)
            return objectUsuario.getEmail() === email;
          }));
        if (usuarioLogin && usuarioLogin.getSenha() === senha) {
          this.usuarioPincipal = usuarioLogin;
          this.getSeguidores();
          this.getSeguindo();
          this.logado = true;
          this.atualizarDados.next('Bem-vindo')
        }
      },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  fazerLogout(): void {
    this.usuarioPincipal = new Usuario();
    this.logado = false;
    this.getSeguidores();
    this.getSeguindo();
    this.atualizarDados.next('Até breve');
  }

  atualizarCadastro(objetoAtualizado: any): void {
    const usuarioAtualizado = Object.assign(new Usuario(), objetoAtualizado);
    this.atualizaDadosPessoais(usuarioAtualizado).subscribe((respone) => {
      this.usuarioPincipal = usuarioAtualizado;
      this.getDados().subscribe((response: Array<Usuario>) => {
        response.forEach(objeto => {
          this.todosUsuarios.push(Object.assign(new Usuario, objeto))
        });
      },
        (error) => {
          this.erroServidor.next(error);
        });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  toggleSeguir(idUsuarioAlvo: number): void {
    if (!this.logado) {
      return;
    }
    let usuarioAlvo: Usuario | undefined;
    let seguindo: boolean = this.usuarioPincipal.getSeguindo().includes(idUsuarioAlvo);
    Object.assign(new Usuario, this.getDados().subscribe((response) => {
      usuarioAlvo = Object.assign(response.find((object: Usuario) => {
        object = Object.assign(new Usuario, object);
        return object.getId() === idUsuarioAlvo;
      }));
      if (seguindo && usuarioAlvo) {
        this.deixarDeSeguir(usuarioAlvo);
      }
      if (!seguindo && usuarioAlvo) {
        this.seguir(usuarioAlvo);
      }
    }));
  }

  private getSeguidores(): void {
    this.getDados().subscribe((response: Array<Usuario>) => {
      const seguidores = this.usuarioPincipal.getSeguidores();
      response.forEach((usuario: Usuario) => {
        if (seguidores.includes(usuario.getId())) {
          this.seguidores.push(Object.assign(new Usuario, usuario));
          this.atualizarDados.next('');
        }
      });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  private getSeguindo(): void {
    this.getDados().subscribe((response: Array<Usuario>) => {
      const seguindo = this.usuarioPincipal.getSeguindo();
      response.forEach((usuario: Usuario) => {
        if (seguindo.includes(usuario.getId())) {
          this.seguindo.push(Object.assign(new Usuario, usuario));
          this.atualizarDados.next('');
        }
      });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  private deixarDeSeguir(alvo: any): void {
    let alvoUsuario: Usuario = Object.assign(new Usuario, alvo);
    this.usuarioPincipal.pararDeSeguir(alvoUsuario.getId());
    alvoUsuario.removerSeguidor(this.usuarioPincipal.getId());
    this.atualizarSeguidores(this.usuarioPincipal).subscribe((response) => {
      this.atualizarSeguidores(alvoUsuario).subscribe();
      this.atualizarDados.next('Deixou de seguir :(');
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  private seguir(alvo: any): void {
    let alvoUsuario: Usuario = Object.assign(new Usuario, alvo);
    this.usuarioPincipal.seguirUsuario(alvoUsuario.getId());
    alvoUsuario.adicionarSeguidor(this.usuarioPincipal.getId());
    this.atualizarSeguidores(this.usuarioPincipal).subscribe((response) => {
      this.atualizarSeguidores(alvoUsuario).subscribe();
      this.atualizarDados.next('Seguindo :)');
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
        nome: usuarioAtualizado.getNome(),
        endereco: usuarioAtualizado.getEndereco(),
        celular: usuarioAtualizado.getCelular(),
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

  constructor(private http: HttpClient) {
    this.getDados().subscribe((response: Array<Usuario>) => {
      response.forEach(objeto => {
        this.todosUsuarios.push(Object.assign(new Usuario, objeto))
      });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

}

export class Usuario {
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
