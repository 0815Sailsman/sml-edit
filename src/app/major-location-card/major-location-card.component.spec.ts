import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorLocationCardComponent } from './major-location-card.component';

describe('MajorLocationCardComponent', () => {
  let component: MajorLocationCardComponent;
  let fixture: ComponentFixture<MajorLocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorLocationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MajorLocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
