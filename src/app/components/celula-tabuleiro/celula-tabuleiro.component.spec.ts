import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CelulaTabuleiroComponent } from './celula-tabuleiro.component';

describe('CelulaTabuleiroComponent', () => {
  let component: CelulaTabuleiroComponent;
  let fixture: ComponentFixture<CelulaTabuleiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CelulaTabuleiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CelulaTabuleiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
