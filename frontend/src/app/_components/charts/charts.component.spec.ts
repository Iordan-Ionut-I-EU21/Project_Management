import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ChartsPieComponent', () => {
  let component: ChartsPieComponent;
  let fixture: ComponentFixture<ChartsPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsPieComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
