import { Component, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogRef } from './dynamic-modal/modal-token/modal.ref';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('modal') modal: ElementRef | null= null;

  public modalSchema: IModalSchema = {
    content: '',
    class: '',
    icon: '',
    maxWidth: 700,
    button: [],
  };
  public componentRef: ComponentRef<any> | null= null;
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(private dialogRef: DialogRef) { }

  ngOnDestroy() {
    if (this.componentRef)
      this.componentRef.destroy();
  }

  onOverlayClicked(evt: any) {
    if (this.modal && evt.srcElement.childNodes[0] ==  this.modal.nativeElement ) 
      this.dialogRef.close();
  }

  close() {
    this._onClose.next(0);
  }

  onDialogClicked(evt: MouseEvent) { evt.stopPropagation() }

}


export interface IModalConfig {
  config: boolean, // should open modal
  modalSchema: IModalSchema // schema object 
}

export interface IModalSchema {
  title?: string, // title/content in the modal
  content?: string, // the body content of modal
  class: string, // css class on the host element of modal
  icon: string, // middle icon of the modal
  maxWidth: number, // css max-width: <number>
  button: Array<IModalSchemaButton>, // Buttons array list
  shouldClose?(): Promise<boolean> | boolean, // validate something when X mark is clicked or user clicked outside of modal
  onClose?(): Promise<boolean> | boolean // define functionality on closing of modal
}

export interface IModalSchemaButton {
  name: string, // content of button
  class: string // css class of button
  shouldClick?(): Promise<boolean> | boolean, // define some validation if it was true then resume the progress
  onClick?(): Promise<boolean> | boolean, // define a function on the button click
}