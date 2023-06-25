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
  @ViewChild('modal') modal!: ElementRef

  public modalSchema: IModalSchema = {
    content: '',
    class: '',
    icon: '',
    maxWidth: 700,
    button: [],
  };
  public componentRef!: ComponentRef<any>
  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  constructor(private dialogRef: DialogRef) { }

  ngOnDestroy() {
    this.dialogRef.close();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  async onOverlayClicked(evt: any) {
    if (evt.srcElement.childNodes[0] == this.modal.nativeElement) {
      if (this.modalSchema.shouldClose != null || this.modalSchema.shouldClose != undefined) {
        const result = await this.modalSchema.shouldClose();
        if (result) {
          this.dialogRef.close();
        }
      } else {
        this.dialogRef.close();
      }
    }
  }

  close() {
    this._onClose.next(0);
  }

  onDialogClicked(evt: MouseEvent) { evt.stopPropagation() }

  async handleButtonClick(item: IModalSchemaButton) {
    if (item.onClick != undefined) {
      const result = await item.onClick();
      if (result)
        this.close();
    }
  }

}