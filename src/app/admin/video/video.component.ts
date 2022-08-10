import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Video } from "src/app/models/video.model";
import { VideoService } from "src/app/services/video.service";

declare var $: any;

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent  {
  errorMessage: string = "";

  @Input() video: Video = new Video();
  @Output() save = new EventEmitter<any>();
  constructor(private videoService: VideoService) { }

  saveVideo(){
    this.videoService.saveVideo(this.video).subscribe(data => {
      this.save.emit(data);
      $('#videoModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred';
      console.log(err);
    })
      
  }

  showVideoModal(){
    $('#videoModal').modal('show');
  }

}
