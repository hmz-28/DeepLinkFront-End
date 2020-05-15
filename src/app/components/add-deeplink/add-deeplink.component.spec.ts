import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeeplinkComponent } from './add-deeplink.component';

describe('AddDeeplinkComponent', () => {
  let component: AddDeeplinkComponent;
  let fixture: ComponentFixture<AddDeeplinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeeplinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeeplinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
