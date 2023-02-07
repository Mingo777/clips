import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import Clip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  
  constructor( private router: Router, private route: ActivatedRoute,private clipServices: ClipService, private modal: ModalService){
    this.sort$ = new BehaviorSubject(this.videoOrder);

  }
  videoOrder = '1';
  clips: Clip[] = []

  activeClip: Clip | null = null;
  sort$:BehaviorSubject<string>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params.sort == '2' ? params.sort : '1'
      this.sort$.next(this.videoOrder)
    })
    this.clipServices.getUserClips(this.sort$).subscribe(docs => {
      this.clips = []

      docs.forEach(doc => {
        this.clips.push({
          docId: doc.id,
          ...doc.data()
        })
      })
    })
  }


  sort(event:Event){
    const {value} = (event.target as HTMLSelectElement)

    this.router.navigate([],{
      relativeTo: this.route,
      queryParams:{
        sort:value
      }
    })
  }

  openModal($event:Event,clip: Clip){
    $event.preventDefault();

    this.activeClip = clip

    this.modal.toggleModal('editClip');
  }

  update($event:Clip){
    this.clips.forEach((element,index) => {
      if(element.docId == $event.docId){
        this.clips[index].title = $event.title
      }
    })
  }

  deleteClip($event:Event,clip:Clip){
    $event.preventDefault();

    this.clipServices.deleteClip(clip);

    this.clips.forEach((element,index) =>{
      if(element.docId == clip.docId){
        this.clips.splice(index,1);
      }
    })
  }

  async copyToClipboard($event:MouseEvent,docId: string | undefined){

    $event.preventDefault()

    if(!docId) {
      return
    }

    const url = `${location.origin}/clip/${docId}`

    await navigator.clipboard.writeText(url)

    alert('Link Copied!')

  }
}
