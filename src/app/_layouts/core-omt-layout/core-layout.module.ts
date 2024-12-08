import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbProgressbarModule, NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';
import { AsideComponent } from './components/aside/aside.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { UserInnerComponent } from './components/header/user-inner/user-inner.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScriptsInitComponent } from './components/scripts-init/scripts-init.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AsideMenuComponent } from './components/aside/aside-menu/aside-menu.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { PageTitleComponent } from './components/header/page-title/page-title.component';
import { HeaderMenuComponent } from './components/header/header-menu/header-menu.component';
import { CoreOmtLayoutComponent } from './core-layout.component';
import { TRANSLOCO_SCOPE, TranslocoModule } from "@ngneat/transloco";
import { CoreModule } from "../../_core/core.module";

@NgModule({
    imports: [
        CoreModule,
        CommonModule,
        NgbDropdownModule,
        NgbProgressbarModule,
        NgbTooltipModule,
        RouterModule,
        TranslocoModule,
        CoreOmtLayoutComponent,
        AsideComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        ScriptsInitComponent,
        ToolbarComponent,
        AsideMenuComponent,
        TopbarComponent,
        PageTitleComponent,
        HeaderMenuComponent,
        UserInnerComponent
    ],
    providers: [{ provide: TRANSLOCO_SCOPE, useValue: "" }],
    exports: [],
})
export class CoreLayoutModule {
}
