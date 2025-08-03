import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolarComponent } from './view-polar.component';

describe('ViewPolarComponent', () => {
  let component: ViewPolarComponent;
  let fixture: ComponentFixture<ViewPolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPolarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
