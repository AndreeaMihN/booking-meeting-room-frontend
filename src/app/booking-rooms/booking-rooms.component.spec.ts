import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRoomsComponent } from './booking-rooms.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BookingRoomsComponent', () => {
  let component: BookingRoomsComponent;
  let fixture: ComponentFixture<BookingRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingRoomsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
