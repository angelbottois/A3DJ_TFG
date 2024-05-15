import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../services/admin-modal/admin-modal.service';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {

  estado: string = "c"; 
  citas: any[] = [];

  constructor(private modalS: AdminModalService, private apiS: ApiService) { }

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(){
    this.apiS.obtenerCitas().subscribe((response)=>{
      console.log(response);
      
      this.citas = response;
    });
  }

  closeModal(){
    this.modalS.$modal.emit(false);
  }
}
