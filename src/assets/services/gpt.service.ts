import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptService {
  private url: string = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  private key: string = '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';

  constructor(private http: HttpClient) { }

  gerarDescricao(valorItem: string): Observable<any> {
    const valorDescricao: string = `Gere uma descrição simples de um item a ser vendido, 
                                    essa descrição deve ser simples e objetiva,
                                    focando na história do item: ${valorItem}`;

    const header: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.key}`
    });

    const body: any = {
      prompt: valorDescricao,
      max_tokens: 100
    };

    return this.http.post(this.url, body, { headers : header });
  }
}
