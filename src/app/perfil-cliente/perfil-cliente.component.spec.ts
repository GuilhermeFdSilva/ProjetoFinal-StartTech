import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilClienteComponent } from './perfil-cliente.component';

describe('PerfilClienteComponent', () => {
  let component: PerfilClienteComponent;
  let fixture: ComponentFixture<PerfilClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilClienteComponent]
    });
    fixture = TestBed.createComponent(PerfilClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
