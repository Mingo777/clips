import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { UserModule } from './components/user/user.module';
import {AngularFireModule} from '@angular/fire/compat';
import { enviroment } from 'src/enviroment/enviroment';
import { AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { HomeComponent } from './components/home/home.component';
import { VideoModule } from './video/video.module';
import { ClipComponent } from './components/clip/clip.component';
import { StartedGateComponent } from './components/started-gate/started-gate.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { ClipsListComponent } from './components/clips-list/clips-list.component';
import { FbTimestampPipe } from './components/pipes/fb-timestamp.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ClipComponent,
    StartedGateComponent,
    NotFoundComponent,
    ClipsListComponent,
    FbTimestampPipe
    
  ],
  imports: [
    BrowserModule,
    UserModule,
    AngularFireModule.initializeApp(enviroment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    VideoModule,
    AngularFireStorageModule,
    AppRoutingModule,
    
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
