import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seeds } from './seeds';

describe('Seeds', () => {
  let component: Seeds;
  let fixture: ComponentFixture<Seeds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seeds]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seeds);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
