import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCreatePage } from './blog-post-create.page';

describe('BlogPostCreatePage', () => {
  let component: BlogPostCreatePage;
  let fixture: ComponentFixture<BlogPostCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
