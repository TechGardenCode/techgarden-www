import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostEditPage } from './blog-post-edit.page';

describe('BlogPostEditPage', () => {
  let component: BlogPostEditPage;
  let fixture: ComponentFixture<BlogPostEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
