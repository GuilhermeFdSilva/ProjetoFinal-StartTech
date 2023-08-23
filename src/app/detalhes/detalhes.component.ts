import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {

  produtoId: string;

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.produtoId = params.get('id') ?? '';
    });
  }

  constructor(private router: ActivatedRoute) { }
}
