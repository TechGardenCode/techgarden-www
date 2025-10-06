import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeader } from './post-header';

describe('PostHeader', () => {
  let component: PostHeader;
  let fixture: ComponentFixture<PostHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
