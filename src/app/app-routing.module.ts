import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { SociosComponent } from './components/socios/socios.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { CitasComponent } from './components/citas/citas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';
import { PiezaComponent } from './components/pieza/pieza.component';
import { PassComponent } from './components/pass/pass.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
  },
  {
    path: 'citas',
    component: CitasComponent,
  },
  {
    path: 'perfil',
    component: PerfilComponent,
  },
  {
    path: 'admin',
    component: PanelAdminComponent,
  },
  {
    path: 'socios',
    component: SociosComponent,
  },
  {
    path: 'pieza',
    component: PiezaComponent,
  },
  {
    path: 'recuperar',
    component: PassComponent,
    pathMatch: 'full'
  },
  {
    //Any other link will be redirected to the login website
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
