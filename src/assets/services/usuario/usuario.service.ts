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

  getSeguidores(): Array<Usuario> {
    return this.seguidores;
  }

  getSeguindo(): Array<Usuario> {
    return this.seguindo;
  }

  getUsuarioById(usuarioId: number): Observable<Usuario> {
    return this.http.get<any>(`https://json-server-antiquary.vercel.app/usuarios/${usuarioId}`);
  }

  criarUsuario(objeto: Object): void {
    const usuario = Object.assign(new Usuario, objeto);
    this.addDados(usuario).subscribe(() => {
      this.getDados().subscribe((response: Array<Usuario>) => {
        this.todosUsuarios = [];
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
    this.getDados().subscribe((response: Array<Usuario>) => {
      const usuarioLogin: Usuario = Object.assign(new Usuario(), response
        .find((objectUsuario: Usuario) => {
          objectUsuario = Object.assign(new Usuario(), objectUsuario)
          return objectUsuario.getEmail() === email;
        }));
      if (usuarioLogin && usuarioLogin.getSenha() === senha) {
        this.usuarioPincipal = usuarioLogin;
        this.acharSeguidores();
        this.acharSeguindo();
        this.logado = true;
        this.atualizarDados.next('Bem-vindo');
      }
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  fazerLogout(): void {
    this.usuarioPincipal = new Usuario();
    this.logado = false;
    this.seguidores = [];
    this.seguindo = [];
    this.atualizarDados.next('Até breve');
  }

  atualizarCadastro(objetoAtualizado: any): void {
    const usuarioAtualizado = Object.assign(new Usuario(), objetoAtualizado);
    this.atualizaDadosPessoais(usuarioAtualizado).subscribe(() => {
      this.getDados().subscribe((usuarios: Array<Usuario>) => {
        this.usuarioPincipal = Object.assign(new Usuario, usuarios
          .find((usuario: Usuario) => {
            usuario = Object.assign(new Usuario, usuario);
            return usuario.getId() === this.usuarioPincipal.getId();
          }));
        this.todosUsuarios = [];
        usuarios.forEach(objeto => {
          this.todosUsuarios.push(Object.assign(new Usuario, objeto));
        });
        this.atualizarDados.next('Dados atualizados');
      },
        (error) => {
          this.erroServidor.next(error);
        });
    },
      (error) => {
        this.erroServidor.next(error);
      });
  }

  toggleSeguir(alvo: Usuario): void {
    if (!this.logado) {
      return;
    }
    let usuarioAlvo: Usuario = alvo;
    let seguindo: boolean = this.usuarioPincipal.getSeguindo().includes(usuarioAlvo.getId());
    if (seguindo) {
      this.deixarDeSeguir(usuarioAlvo);
    }
    if (!seguindo) {
      this.seguir(usuarioAlvo);
    }
    this.acharSeguidores()
    this.acharSeguindo();
  }

  private acharSeguidores(): void {
    this.getDados().subscribe((response: Array<Usuario>) => {
      const seguidores = this.usuarioPincipal.getSeguidores();
      this.seguidores = [];
      response.forEach((usuario: Usuario) => {
        usuario = Object.assign(new Usuario, usuario);
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

  private acharSeguindo(): void {
    this.getDados().subscribe((response: Array<Usuario>) => {
      const seguindo = this.usuarioPincipal.getSeguindo();
      this.seguindo = [];
      response.forEach((usuario: Usuario) => {
        usuario = Object.assign(new Usuario, usuario);
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

  private deixarDeSeguir(alvo: Usuario): void {
    this.usuarioPincipal.pararDeSeguir(alvo.getId());
    alvo.removerSeguidor(this.usuarioPincipal.getId());
    this.atualizarSeguidores(this.usuarioPincipal).subscribe(() => {
      this.atualizarDados.next('Deixou de seguir :(');
    },
      (error) => {
        this.erroServidor.next(error);
      });
    this.atualizarDados.subscribe((response) => {
      if (response === 'Seguindo :)') {
        this.atualizarSeguidores(alvo).subscribe();
      }
    });
  }

  private seguir(alvo: Usuario): void {
    this.usuarioPincipal.seguirUsuario(alvo.getId());
    alvo.adicionarSeguidor(this.usuarioPincipal.getId());
    this.atualizarSeguidores(this.usuarioPincipal).subscribe(() => {
      this.atualizarDados.next('Seguindo :)');
    },
      (error) => {
        this.erroServidor.next(error);
      });
    this.atualizarDados.subscribe((response) => {
      if (response === 'Seguindo :)') {
        this.atualizarSeguidores(alvo).subscribe();
      }
    });
  }

  private getDados(): Observable<any> {
    return this.http.get<any>('https://json-server-antiquary.vercel.app/usuarios');
  }

  private addDados(novoUsuario: Usuario): Observable<any> {
    return this.http.post('https://json-server-antiquary.vercel.app/usuarios', novoUsuario);
  }

  private atualizaDadosPessoais(usuarioAtualizado: Usuario): Observable<any> {
    return this.http.patch(`https://json-server-antiquary.vercel.app/usuarios/${this.usuarioPincipal.getId()}`,
      {
        nome: usuarioAtualizado.getNome(),
        endereco: usuarioAtualizado.getEndereco(),
        celular: usuarioAtualizado.getCelular(),
        email: usuarioAtualizado.getEmail(),
        senha: usuarioAtualizado.getSenha()
      });
  }

  private atualizarSeguidores(usuarioAtualizado: Usuario): Observable<any> {
    return this.http.patch(`https://json-server-antiquary.vercel.app/usuarios/${usuarioAtualizado.getId()}`,
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
