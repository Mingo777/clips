import { Component, OnDestroy, OnInit,Input,OnChanges, Output , EventEmitter} from '@angular/core';
import Clip from 'src/app/models/clip.model';
import { ModalService } from 'src/app/services/modal.service';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: Clip | null = null;
  @Output() update = new EventEmitter()

  showAlert = false
  alertColor = 'blue'
  alertMsg = 'Please wait! updating clip.'
  inSubmission = false

  clipID = new FormControl('')

  title = new FormControl('',
  [Validators.required,
  Validators.minLength(3)]);

  editForm = new FormGroup({
    title: this.title,
    id:this.clipID
  })


  constructor(private modal: ModalService, private clipService:ClipService){}

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

  ngOnChanges() {
    if(!this.activeClip){
      return
    }

    this.inSubmission = false;
    this.showAlert = false;

    this.clipID.setValue(this.activeClip.docId as string);
    this.title.setValue(this.activeClip.title as string);
  }
  

  async submit(){

    if(!this.activeClip){
      return
    }

  this.showAlert = true;
  this.alertColor = 'blue';
  this.alertMsg = 'Please wait! updating clip.';
  this.inSubmission = true;

    try{
      await this.clipService.updateClip(
        this.clipID.value as string, this.title.value as string
      );

    }catch(error){
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Try again later.';
      return
    }
    this.activeClip.title = this.title.value as string
    this.update.emit(this.activeClip)

    this.alertColor = 'green';
  this.alertMsg = 'Succes! updating clip.';
  this.inSubmission = false;

  }

}
