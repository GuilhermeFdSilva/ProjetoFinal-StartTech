import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoPerfilComponent } from './visualizacao-perfil.component';

describe('VisualizacaoPerfilComponent', () => {
  let component: VisualizacaoPerfilComponent;
  let fixture: ComponentFixture<VisualizacaoPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizacaoPerfilComponent]
    });
    fixture = TestBed.createComponent(VisualizacaoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
