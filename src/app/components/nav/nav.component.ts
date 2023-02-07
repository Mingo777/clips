import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ModalService } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  /* isAuthenticated = false; */


  constructor( public modalService:ModalService, public auhtService:AuthentificationService,  private router: Router){
/*     this.auhtService.isAuthicated$.subscribe(status => {
      this.isAuthenticated = status
    }) */
  }

  ngOnInit(): void {
    
  }

  openModal($event:Event){
    $event.preventDefault();

    this.modalService.toggleModal('main');
  }

  
}
