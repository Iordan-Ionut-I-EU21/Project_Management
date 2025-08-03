import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTableComponent } from './generate-table.component';

describe('GenerateTableComponent', () => {
  let component: GenerateTableComponent;
  let fixture: ComponentFixture<GenerateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
