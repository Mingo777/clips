import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventBlockerDirective } from './directives/event-blocker.directive';



@NgModule({
  declarations: [
    AlertComponent,
    InputComponent,
    ModalComponent,
    TabsComponent,
    TabsContainerComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule

  ],exports:[
    ModalComponent,
    TabsContainerComponent,
    TabsComponent,
    InputComponent,
    AlertComponent,
    EventBlockerDirective
  ],
  providers:[
   // ModalService
  ]
})
export class SharedModule { }
