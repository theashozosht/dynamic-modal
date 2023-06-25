import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { ModalServiceService } from './modal-service/modal-service.service';
import { DialogRef } from './modal-token/modal.ref';
import { IModalSchema } from './types/modal.interface';
import { modalConfigToken } from './modal-token/modal.token';


@NgModule({
  declarations: [ModalComponentComponent],
  imports: [CommonModule],
  providers: [ModalServiceService, DialogRef]
})
export class DynamicModalModule {
  static forFeature(config: IModalSchema): ModuleWithProviders<any> {
    return {
      ngModule: DynamicModalModule,
      providers: [
        { provide: modalConfigToken, useValue: config }
      ]
    }
  }
}