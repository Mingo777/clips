import {  NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { ClipComponent } from './components/clip/clip.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { StartedGateComponent } from './components/started-gate/started-gate.component';
import { ClipService } from './services/clip.service';

const routes: Routes = [
  {path:'', component: StartedGateComponent},
  {path:'home',component:HomeComponent,canActivate:[AngularFireAuthGuard]},
  {path:'clip/:id',component:ClipComponent,resolve:{
    clip:ClipService
  },canActivate:[AngularFireAuthGuard]},
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
