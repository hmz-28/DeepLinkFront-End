import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ShowDeeplinkComponent } from './show-deeplink.component';

describe('ShowDeeplinkComponent', () => {
  let component: ShowDeeplinkComponent;
  let fixture: ComponentFixture<ShowDeeplinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDeeplinkComponent ],
      imports: [ MatTableModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDeeplinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
