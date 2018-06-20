import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatedSongsComponent } from './rated-songs.component';

describe('RatedSongsComponent', () => {
  let component: RatedSongsComponent;
  let fixture: ComponentFixture<RatedSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatedSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
