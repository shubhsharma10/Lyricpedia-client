import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchpageComponent } from './user-searchpage.component';

describe('UserSearchpageComponent', () => {
  let component: UserSearchpageComponent;
  let fixture: ComponentFixture<UserSearchpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
