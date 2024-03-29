import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectBuilderComponent } from './object-builder.component';

describe('ObjectBuilderComponent', () => {
  let component: ObjectBuilderComponent;
  let fixture: ComponentFixture<ObjectBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
