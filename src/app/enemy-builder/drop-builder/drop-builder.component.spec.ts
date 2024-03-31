import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropBuilderComponent } from './drop-builder.component';

describe('DropBuilderComponent', () => {
  let component: DropBuilderComponent;
  let fixture: ComponentFixture<DropBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
