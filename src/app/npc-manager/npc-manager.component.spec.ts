import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcManagerComponent } from './npc-manager.component';

describe('NpcManagerComponent', () => {
  let component: NpcManagerComponent;
  let fixture: ComponentFixture<NpcManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpcManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
