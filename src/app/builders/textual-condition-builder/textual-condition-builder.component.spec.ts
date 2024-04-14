import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextualConditionBuilderComponent } from './textual-condition-builder.component';

describe('TextualConditionBuilderComponent', () => {
  let component: TextualConditionBuilderComponent;
  let fixture: ComponentFixture<TextualConditionBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextualConditionBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextualConditionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
