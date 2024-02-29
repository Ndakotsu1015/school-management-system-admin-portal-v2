import { NgModule } from "@angular/core";
import { AppMenuItemComponent } from './components/app-menu-item/app-menu-item.component';
import { AppTopBarComponent } from './components/app-top-bar/app-top-bar.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { RouterModule } from "@angular/router";
import { AppLayoutComponent } from './app-layout.component';
import { CommonModule } from "@angular/common";
import { AppLayoutService } from "./services/app-layout.service";
import { AppMenuService } from "./services/app-menu.service";
import { UiModule } from "@hacienda-platform/ui";
import { DialogService } from "primeng/dynamicdialog";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        UiModule,
        // MenubarModule,
      ],
    declarations: [
        AppMenuItemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent
    ],
    providers: [AppLayoutService, AppMenuService, DialogService]
})
export class AppLayoutModule { }
