import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalConditionBuilderComponent } from './graphical-condition-builder.component';

describe('GraphicalConditionBuilderComponent', () => {
  let component: GraphicalConditionBuilderComponent;
  let fixture: ComponentFixture<GraphicalConditionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicalConditionBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicalConditionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
