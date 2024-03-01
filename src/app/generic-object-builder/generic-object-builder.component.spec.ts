import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericObjectBuilderComponent } from './generic-object-builder.component';

describe('GenericObjectBuilderComponent', () => {
  let component: GenericObjectBuilderComponent;
  let fixture: ComponentFixture<GenericObjectBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericObjectBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericObjectBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
