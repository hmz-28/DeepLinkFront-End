import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglinkComponent } from './dialoglink.component';

describe('DialoglinkComponent', () => {
  let component: DialoglinkComponent;
  let fixture: ComponentFixture<DialoglinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoglinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
