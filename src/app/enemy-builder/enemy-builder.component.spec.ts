import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemyBuilderComponent } from './enemy-builder.component';

describe('EnemyBuilderComponent', () => {
  let component: EnemyBuilderComponent;
  let fixture: ComponentFixture<EnemyBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnemyBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnemyBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
