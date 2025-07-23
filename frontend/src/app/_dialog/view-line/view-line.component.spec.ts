import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLineComponent } from './view-line.component';

describe('ViewLineComponent', () => {
  let component: ViewLineComponent;
  let fixture: ComponentFixture<ViewLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
