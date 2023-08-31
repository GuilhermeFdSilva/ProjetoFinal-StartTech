import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroItemComponent } from './cadastro-item.component';

describe('CadastroItemComponent', () => {
  let component: CadastroItemComponent;
  let fixture: ComponentFixture<CadastroItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroItemComponent]
    });
    fixture = TestBed.createComponent(CadastroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
