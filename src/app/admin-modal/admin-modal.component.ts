import { Component, OnInit } from '@angular/core';
import { AdminModalService } from '../services/admin-modal/admin-modal.service';
import { ApiService } from '../services/api/api.service';
import { reverse } from 'dns';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {

  estado: string = "c"; 
  citas: any[] = [];
  error: string = "";
  pedidos: any[] = [];

  constructor(private modalS: AdminModalService, private apiS: ApiService) { }

  ngOnInit(): void {
    this.modalS.$info.subscribe((valor)=>{this.estado = valor});
    this.obtenerCitas();
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.apiS.obtenerPedidos().subscribe((response)=>{
      this.pedidos = response;      
    });
  }

  obtenerCitas(){
    this.apiS.obtenerCitas().subscribe((response)=>{
      this.citas = response;
    });
  }

  activarCita(id: string){
    const data = {idCita: id};
    this.apiS.updateCita(data).subscribe((response)=>{
      if(response){
        this.obtenerCitas();
      }else{
        this.error = "Error al aprobar la cita.";
      }
    });
  }

  closeModal(){
    this.modalS.$modal.emit(false);
  }
}
