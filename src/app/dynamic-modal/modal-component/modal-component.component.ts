import { Component, ComponentRef, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { IModalSchema, IModalSchemaButton } from '../types/modal.interface';
import { Subject } from 'rxjs';
import { DialogRef } from '../modal-token/modal.ref'

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponentComponent implements OnDestroy {
  @ViewChild('modal') modal: ElementRef

  public modalSchema: IModalSchema = {
    content: '',
    class: '',
    icon: '',
    maxWidth: 700,
    button: [],
  };
  public componentRef: ComponentRef<any>
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(private dialogRef: DialogRef) { }

  ngOnDestroy() {
    this.dialogRef.close();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onOverlayClicked(evt: any) {
    if (evt.srcElement.childNodes[0] == this.modal.nativeElement)
      this.dialogRef.close();
  }

  close() {
    this._onClose.next();
  }

  onDialogClicked(evt: MouseEvent) { evt.stopPropagation() }
}