import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {

  constructor() { }

  $modal = new EventEmitter<any>();

}
