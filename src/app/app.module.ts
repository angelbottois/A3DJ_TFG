import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SociosComponent } from './components/socios/socios.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { HomeComponent } from './components/home/home.component';
import { CitasComponent } from './components/citas/citas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ApiService } from './services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { PiezaComponent } from './components/pieza/pieza.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SociosComponent,
    CatalogoComponent,
    PerfilComponent,
    PanelAdminComponent,
    HomeComponent,
    CitasComponent,
    ModalComponent,
    NosotrosComponent,
    AdminModalComponent,
    PiezaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
