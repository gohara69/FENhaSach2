import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCheckoutComponent } from './client-checkout.component';

describe('ClientCheckoutComponent', () => {
  let component: ClientCheckoutComponent;
  let fixture: ComponentFixture<ClientCheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCheckoutComponent]
    });
    fixture = TestBed.createComponent(ClientCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
