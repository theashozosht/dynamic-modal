import { InjectionToken } from '@angular/core';
import { IModalSchema } from '../types/modal.interface';

export const modalConfigToken = new InjectionToken<IModalSchema>('ModalSchema')