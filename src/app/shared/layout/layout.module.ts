import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { LoginLayoutComponentComponent } from './login-layout-component/login-layout-component.component';
import { HomeLayoutComponentComponent } from './home-layout-component/home-layout-component.component';

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
    HomeLayoutComponentComponent,
    LoginLayoutComponentComponent
  ],
})
export class LayoutModule { }
