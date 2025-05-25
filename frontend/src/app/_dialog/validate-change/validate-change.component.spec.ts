import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateChangeComponent } from './validate-change.component';

describe('ValidateChangeComponent', () => {
  let component: ValidateChangeComponent;
  let fixture: ComponentFixture<ValidateChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
