import { Component, OnInit, ViewChild } from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import { VideoComponent } from "../video/video.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  videoList: Array<Video> = [];
  selectedVideo: Video = new Video();
  errorMessage: string = "";


  @ViewChild(VideoComponent) child: VideoComponent | undefined;
  constructor(private videoService: VideoService) { }

  ngOnInit(): void {
      this.videoService.getAllVideo().subscribe(data =>{
      this.videoList = data;
    });
  }

  createVideoRequest(){
    this.selectedVideo = new Video();
    this.child?.showVideoModal();
  }

  editVideoRequest(item: Video){
    this.selectedVideo = Object.assign({}, item);
    this.child?.showVideoModal();
  }


  saveVideoWatcher(video: Video) {
    let itemIndex = this.videoList.findIndex(item => item.id === video.id);
    if (itemIndex !== -1) {
      this.videoList[itemIndex] = video;
    } else {
      this.videoList.push(video);
    }
  }
  
  deleteVideo(item: Video, ind: number){
      this.videoService.deleteVideo(item).subscribe(data => {
        this.videoList.splice(ind,1);
      }, err => {
        this.errorMessage = 'Unexpected error ocurred.';
        console.log(err);
      })
    }
}
