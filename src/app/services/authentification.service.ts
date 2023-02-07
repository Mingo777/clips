import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import User from '../models/user.model';
import {delay, map,filter,switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute ,NavigationEnd} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private usersColletion: AngularFirestoreCollection<User>
  public isAuthicated$: Observable<boolean>
  public delay$: Observable<boolean> 
  private redirect = false;

  constructor(private auth : AngularFireAuth, private dataBase: AngularFirestore, private router: Router,private route:ActivatedRoute) { 
    this.usersColletion = dataBase.collection('user')
    this.isAuthicated$ = auth.user.pipe(
        map(user => !!user)
    );

    this.delay$ = this.isAuthicated$.pipe(
     delay(1000)
    )
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => this.redirect = data.authOnly ?? false);
    
    
    
  }


  public async createuser(userData: User){
    if(!userData.password){
      throw new Error('Password not provided')
    }
    const userCred =  await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
   );

   if(!userCred.user){
    throw new Error('User can not be found')
   }
   await this.usersColletion.doc(userCred.user.uid).set({
    name: userData.name,
    email: userData.email,
    age:userData.age,
    phoneNumber:userData.phoneNumber
   })


   await userCred.user.updateProfile({
    displayName: userData.name
   })

  }

  public async logout($event?: Event){
    if($event){
      $event.preventDefault();
    }

    await this.auth.signOut()

    if(this.redirect){
      await this.router.navigateByUrl('/')
    }

    this.router.navigate(['/'])



  }

}
