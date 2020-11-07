import { Component, HostBinding,  Input,    OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import '@github/markdown-toolbar-element';

@Component({
  selector: 'markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss']
})
export class MarkdownEditorComponent implements OnInit {
  //to allow multiple textarea on the same screen, need to set an uniqueId for the textarea
  controlId: string
  @Input() control: FormControl;
  @HostBinding('class.focus') isFocus: boolean;  

  constructor() { }

  ngOnInit(): void {
    this.controlId = `MarkdownEditor-${Math.floor(100000 * Math.random())}`;
    this.control =  new FormControl();
  }

  focus() {
    this.isFocus = true;
  }

  blur() {
    this.isFocus = false;
  }
}