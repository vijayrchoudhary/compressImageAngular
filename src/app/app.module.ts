import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCompressComponent } from './image-compress/image-compress.component';

// command to install -> npm i ngx-image-compress
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  declarations: [
    AppComponent,
    ImageCompressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
