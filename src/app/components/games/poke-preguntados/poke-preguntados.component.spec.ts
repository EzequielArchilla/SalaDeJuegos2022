import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokePreguntadosComponent } from './poke-preguntados.component';

describe('PokePreguntadosComponent', () => {
  let component: PokePreguntadosComponent;
  let fixture: ComponentFixture<PokePreguntadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokePreguntadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokePreguntadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
