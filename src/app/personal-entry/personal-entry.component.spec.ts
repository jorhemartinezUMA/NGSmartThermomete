import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEntryComponent } from './personal-entry.component';

describe('PersonalEntryComponent', () => {
  let component: PersonalEntryComponent;
  let fixture: ComponentFixture<PersonalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
