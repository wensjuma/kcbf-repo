import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPanelCardsComponent } from './info-panel-cards.component';

describe('InfoPanelCardsComponent', () => {
  let component: InfoPanelCardsComponent;
  let fixture: ComponentFixture<InfoPanelCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPanelCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPanelCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
