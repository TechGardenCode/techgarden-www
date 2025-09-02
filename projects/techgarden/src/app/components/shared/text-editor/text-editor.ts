import { Component, effect, OnInit, viewChildren } from '@angular/core';
import { TextEditorBlock } from './text-editor-block/text-editor-block';
import { TextBlock } from '../../../models/text-editor.model';

@Component({
  selector: 'app-text-editor',
  imports: [TextEditorBlock],
  templateUrl: './text-editor.html',
  styleUrl: './text-editor.css',
})
export class TextEditor implements OnInit {
  blocks: TextBlock[] = [];
  blocksChildren = viewChildren(TextEditorBlock);

  ngOnInit(): void {
    this.addDefaultTextBlock();
  }

  onBlockChange(index: number, block?: TextBlock) {
    if (!block) {
      return;
    }
    this.blocks[index] = block;
    document.getElementById(block.id)?.focus();
  }

  onBlockEnter(index: number) {
    this.addDefaultTextBlock(index);
  }

  onBlockVerticalNav(index: number, direction: 'up' | 'down') {
    let blockToSelect: TextBlock | undefined = undefined;
    if (direction === 'up' && index > 0) {
      blockToSelect = this.blocks[index - 1];
      // Move focus to the previous block
    } else if (direction === 'down' && index < this.blocks.length - 1) {
      blockToSelect = this.blocks[index + 1];
    }
    if (blockToSelect) {
      document.getElementById(blockToSelect.id)?.focus();
    }
  }

  addDefaultTextBlock(index?: number) {
    const newBlock: TextBlock = {
      id: Math.random().toString(36).substring(2, 9),
      type: 'paragraph',
      content: '',
      data: {},
    };
    if (index === undefined || index >= this.blocks.length - 1) {
      this.blocks.push(newBlock);
    } else {
      this.blocks.splice(index + 1, 0, newBlock);
    }
    setTimeout(() => {
      document.getElementById(newBlock.id)?.focus();
    }, 0);
  }
}
