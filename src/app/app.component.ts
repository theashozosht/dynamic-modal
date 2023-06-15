import { Component, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogRef } from './dynamic-modal/modal-token/modal.ref';
import { IModalSchema } from './dynamic-modal/types/modal.interface';

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
