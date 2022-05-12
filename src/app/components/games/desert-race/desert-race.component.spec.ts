import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesertRaceComponent } from './desert-race.component';

describe('DesertRaceComponent', () => {
  let component: DesertRaceComponent;
  let fixture: ComponentFixture<DesertRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesertRaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesertRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
