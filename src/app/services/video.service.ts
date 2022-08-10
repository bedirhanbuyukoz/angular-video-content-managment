import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import {environment} from "../../environments/environment";
import { AuthenticationService } from './authentication.service';
import { RequestBaseService } from './request-base.service';
import {Video} from "../models/video.model"



const API_URL = `${environment.BASE_URL}/api/video`;

@Injectable({
  providedIn: 'root'
})
export class VideoService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) { 
    super(authenticationService,http);
  }

  saveVideo(video: Video): Observable<any>{
    return this.http.post(API_URL,video,{headers:this.getHeaders});
  }


  deleteVideo(video: Video): Observable<any> {
    return this.http.delete(`${API_URL}/${video.id}`,{headers:this.getHeaders});
  }


  getAllVideo(): Observable<any>{
    return this.http.get(API_URL);
  }

}
