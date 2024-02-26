import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectManagerComponent } from './generic-object-manager.component';

describe('GenericObjectManagerComponent', () => {
  let component: GenericObjectManagerComponent;
  let fixture: ComponentFixture<GenericObjectManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericObjectManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericObjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
