import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabuleiroComponent } from './components/tabuleiro/tabuleiro.component';
import { HeaderComponent } from './components/header/header.component';
import { CelulaTabuleiroComponent } from './components/celula-tabuleiro/celula-tabuleiro.component';

@NgModule({
  declarations: [
    AppComponent,
    TabuleiroComponent,
    HeaderComponent,
    CelulaTabuleiroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
