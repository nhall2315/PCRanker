import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartBrowserComponent } from './part-browser.component';

describe('PartBrowserComponent', () => {
  let component: PartBrowserComponent;
  let fixture: ComponentFixture<PartBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
