import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsService } from './posts';

describe('Posts', () => {
  let component: PostsService;
  let fixture: ComponentFixture<PostsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
