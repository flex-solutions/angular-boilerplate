import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [CommonModule],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
  declarations: [SidebarComponent, NavbarComponent, FooterComponent]
})
export class LayoutModule {}
