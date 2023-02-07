import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { enviroment } from './enviroment/enviroment';
import { enableProdMode } from '@angular/core';


if(enviroment.prodution){
  enableProdMode();
}

firebase.initializeApp(enviroment.firebase);

let appInit = false;

firebase.auth().onAuthStateChanged(()=>{
if(!appInit){
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
}
  appInit = true;
})


