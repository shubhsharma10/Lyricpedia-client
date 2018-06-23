import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTranslatedSongsComponent } from './all-translated-songs.component';

describe('AllTranslatedSongsComponent', () => {
  let component: AllTranslatedSongsComponent;
  let fixture: ComponentFixture<AllTranslatedSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTranslatedSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTranslatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
