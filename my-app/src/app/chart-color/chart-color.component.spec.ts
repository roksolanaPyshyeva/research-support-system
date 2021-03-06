import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartColorComponent } from './chart-color.component';

describe('ChartColorComponent', () => {
  let component: ChartColorComponent;
  let fixture: ComponentFixture<ChartColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
