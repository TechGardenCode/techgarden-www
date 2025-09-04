import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGroup } from './post-group';

describe('PostGroup', () => {
  let component: PostGroup;
  let fixture: ComponentFixture<PostGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostGroup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
