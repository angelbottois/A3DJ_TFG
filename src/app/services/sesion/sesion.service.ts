import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  $iniciado = new EventEmitter<any>();
}
