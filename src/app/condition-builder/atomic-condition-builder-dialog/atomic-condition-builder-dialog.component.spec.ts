import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtomicConditionBuilderDialogComponent } from './atomic-condition-builder-dialog.component';

describe('AtomicConditionBuilderDialogComponent', () => {
  let component: AtomicConditionBuilderDialogComponent;
  let fixture: ComponentFixture<AtomicConditionBuilderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtomicConditionBuilderDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtomicConditionBuilderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
