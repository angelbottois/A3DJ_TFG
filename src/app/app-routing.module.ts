import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { SociosComponent } from './components/socios/socios.component';


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
    path: 'citas',
    component: HomeComponent,
  },
  {
    path: 'perfil',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: HomeComponent,
  },
  {
    path: 'socios',
    component: SociosComponent,
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
