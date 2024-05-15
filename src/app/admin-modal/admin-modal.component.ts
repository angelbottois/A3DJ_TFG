import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../services/admin-modal/admin-modal.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {

  estado: string = "c"; 


  constructor(private modalS: AdminModalService) { }

  ngOnInit(): void {
  }


  closeModal(){
    this.modalS.$modal.emit(false);
  }
}
