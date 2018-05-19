import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    BreadcrumbComponent,
    NotificationComponent,
    NotificationItemComponent,
    ModalComponent
  ]
})
export class LayoutModule {}
