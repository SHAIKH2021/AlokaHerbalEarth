import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBenefitsComponent } from './product-benefits.component';

describe('ProductBenefitsComponent', () => {
  let component: ProductBenefitsComponent;
  let fixture: ComponentFixture<ProductBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBenefitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
