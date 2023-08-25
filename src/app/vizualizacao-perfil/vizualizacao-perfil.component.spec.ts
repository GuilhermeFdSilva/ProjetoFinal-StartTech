import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizacaoPerfilComponent } from './vizualizacao-perfil.component';

describe('VizualizacaoPerfilComponent', () => {
  let component: VizualizacaoPerfilComponent;
  let fixture: ComponentFixture<VizualizacaoPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VizualizacaoPerfilComponent]
    });
    fixture = TestBed.createComponent(VizualizacaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
