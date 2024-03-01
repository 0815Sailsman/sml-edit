import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFromAllSublocationsComponent } from './select-from-all-sublocations.component';

describe('SelectFromAllSublocationsComponent', () => {
  let component: SelectFromAllSublocationsComponent;
  let fixture: ComponentFixture<SelectFromAllSublocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFromAllSublocationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectFromAllSublocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
