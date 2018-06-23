import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTranslatedSongsComponent } from './user-translated-songs.component';

describe('UserTranslatedSongsComponent', () => {
  let component: UserTranslatedSongsComponent;
  let fixture: ComponentFixture<UserTranslatedSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTranslatedSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTranslatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
