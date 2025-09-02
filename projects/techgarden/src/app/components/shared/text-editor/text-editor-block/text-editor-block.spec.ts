import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorBlock } from './text-editor-block';

describe('TextEditorBlock', () => {
  let component: TextEditorBlock;
  let fixture: ComponentFixture<TextEditorBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextEditorBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditorBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
