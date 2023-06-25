import { Injectable, Inject, ComponentRef, EventEmitter, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { IModalSchema } from '../types/modal.interface';
import { ModalComponentComponent } from '../modal-component/modal-component.component';
import { modalConfigToken } from '../modal-token/modal.token';
import { DialogRef } from '../modal-token/modal.ref';

@Injectable()
export class ModalServiceService {
  modalComponentRef!: ComponentRef<ModalComponentComponent>;
  private static isOpen = false; // handling multiple modals
  modalClosed = new EventEmitter<void>();

  constructor(
    @Inject(modalConfigToken) private modalConfig: IModalSchema,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private dialogRef: DialogRef
  ) { }


  private removeModalComponentFromBody() {
    ModalServiceService.isOpen = false;
    this.modalClosed.emit();
    this.appRef.detachView(this.modalComponentRef.hostView);
    this.modalComponentRef.destroy();
  };

  private appendModalComponentToBody(modalSchema?: IModalSchema) {
    const componentFactory = this.viewContainerRef.createComponent(ModalComponentComponent); // Creating Modal Component With resolveComponentFactory
    this.modalComponentRef = componentFactory
    
    this.modalComponentRef.instance.onClose.subscribe(() => {
      this.removeModalComponentFromBody();
    });

    // Passing Props to modal component
    if (modalSchema)
      componentFactory.instance.modalSchema = modalSchema
    else
      componentFactory.instance.modalSchema = this.modalConfig
  }


  public openModal(modalSchema?: IModalSchema) {
    if (ModalServiceService.isOpen) {
      console.warn('Multiple modals trying to append to body through ModalServiceService')
      return
    }
    
    ModalServiceService.isOpen = true;
    this.appendModalComponentToBody(modalSchema);

    const sub = this.dialogRef.afterClosed.subscribe(() => {
      ModalServiceService.isOpen = false;
      this.removeModalComponentFromBody();
      sub.unsubscribe();
    });
  }

  public get isModalOpen() {
    return ModalServiceService.isOpen;
  }
}
