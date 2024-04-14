import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemBuilderComponent } from './shop-item-builder.component';

describe('ShopItemBuilderComponent', () => {
  let component: ShopItemBuilderComponent;
  let fixture: ComponentFixture<ShopItemBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopItemBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopItemBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
