import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendancesComponent } from './user-attendances.component';

describe('UserAttendancesComponent', () => {
  let component: UserAttendancesComponent;
  let fixture: ComponentFixture<UserAttendancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAttendancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
