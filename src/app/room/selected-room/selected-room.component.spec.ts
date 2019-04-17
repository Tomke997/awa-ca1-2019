import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRoomComponent } from './selected-room.component';

describe('SelectedRoomComponent', () => {
  let component: SelectedRoomComponent;
  let fixture: ComponentFixture<SelectedRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
