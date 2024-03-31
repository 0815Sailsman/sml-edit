import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBuilderHeaderComponent } from './item-builder-header.component';

describe('ItemBuilderHeaderComponent', () => {
  let component: ItemBuilderHeaderComponent;
  let fixture: ComponentFixture<ItemBuilderHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemBuilderHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemBuilderHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
