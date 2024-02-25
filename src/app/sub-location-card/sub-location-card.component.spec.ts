import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLocationCardComponent } from './sub-location-card.component';

describe('SubLocationCardComponent', () => {
  let component: SubLocationCardComponent;
  let fixture: ComponentFixture<SubLocationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubLocationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubLocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
