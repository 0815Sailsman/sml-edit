import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherObjectManagerComponent } from './other-object-manager.component';

describe('OtherObjectManagerComponent', () => {
  let component: OtherObjectManagerComponent;
  let fixture: ComponentFixture<OtherObjectManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherObjectManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherObjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
