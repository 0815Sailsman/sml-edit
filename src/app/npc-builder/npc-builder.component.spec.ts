import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcBuilderComponent } from './npc-builder.component';

describe('NpcBuilderComponent', () => {
  let component: NpcBuilderComponent;
  let fixture: ComponentFixture<NpcBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpcBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
