import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyManagerComponent } from './enemy-manager.component';

describe('EnemyManagerComponent', () => {
  let component: EnemyManagerComponent;
  let fixture: ComponentFixture<EnemyManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnemyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
