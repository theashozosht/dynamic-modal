import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicModalModule } from './dynamic-modal/dynamic-modal.module';
import { ModalComponentComponent } from './dynamic-modal/modal-component/modal-component.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicModalModule.forFeature({
        title: 'This is a forFeature Header',
        content: 'This text is displayed in the content of modal and has been passed by schema from app module',
        class: 'custom-class',
        icon: '',
        maxWidth: 700,
        shouldClose: () => false,
        button: [
          {
            class: 'btn-outline',
            name: 'Close',
          },
          {
            class: 'btn-fill',
            name: 'Return',
          }
        ]

      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
