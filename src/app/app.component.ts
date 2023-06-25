import { Component, ComponentRef, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalServiceService } from './dynamic-modal/modal-service/modal-service.service';
import { DialogRef } from './dynamic-modal/modal-token/modal.ref';
import { IModalSchema } from './dynamic-modal/types/modal.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ModalServiceService]
})
export class AppComponent {
  private modalPayload: IModalSchema = {
    title: 'This is a Header',
    content: 'This text is displayed in the content of modal',
    class: 'custom-class',
    icon: '',
    maxWidth: 700,
    shouldClose: () => false,
    button: [
      {
        class: 'btn-fill',
        name: 'Confirm',
        onClick: () => true,
      },
      {
        class: 'btn-outline',
        name: 'Close',
        onClick: () => true,
      }
    ]
  }

  constructor(private modalServiceService: ModalServiceService) {
    this.modalServiceService.openModal(this.modalPayload)
  }

  showModal(): void {
    this.modalServiceService.openModal(this.modalPayload)
  }
}
