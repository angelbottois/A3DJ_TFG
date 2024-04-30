import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  estado: string = "l"; 

  constructor(private modalS: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.modalS.$modal.emit(false);
  }

  p(){
    this.estado = "p";
  }
  r(){
    this.estado = "r";
  }
  l(){
    this.estado = "l";
  }
}
