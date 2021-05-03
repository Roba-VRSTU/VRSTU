import { NgModule, SecurityContext } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MarkdownModule } from 'ngx-markdown'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FooterComponent } from './components/common/footer/footer.component'
import { HeaderComponent } from './components/common/header/header.component'
import { LogoComponent } from './components/common/logo/logo.component'
import { SinglePageComponent } from './layouts/single-page/single-page.component'
import { I18nModule } from './modules/i18n/i18n.module'
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component'
import { BlogListComponent } from './pages/blog-list/blog-list.component'
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogListComponent,
    BlogDetailComponent,
    HeaderComponent,
    FooterComponent,
    SinglePageComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    I18nModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
