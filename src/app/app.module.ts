import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IsOwnerMarkDirective } from './shared/directives/is-owner-mark.directive';
import { MaterialModule } from './material/material';
import { CoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import { HttpService } from './core/services/http.service';
import { FormsModule } from '@angular/forms';

////////////////////////
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, '../assets/translate/', '.json');
}

export function playerFactory() {
  return import('lottie-web');
}
@NgModule({
  declarations: [AppComponent, IsOwnerMarkDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    CoreModule,
    FormsModule,

    ////////////////////////////
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
  exports: [AppRoutingModule, TranslateModule, MaterialModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
