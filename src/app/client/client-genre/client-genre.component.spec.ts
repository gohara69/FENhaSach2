import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGenreComponent } from './client-genre.component';

describe('ClientGenreComponent', () => {
  let component: ClientGenreComponent;
  let fixture: ComponentFixture<ClientGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientGenreComponent]
    });
    fixture = TestBed.createComponent(ClientGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
