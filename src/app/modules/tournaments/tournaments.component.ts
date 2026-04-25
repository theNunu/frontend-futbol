import { Component, inject } from '@angular/core';
import { TournamentService } from './services/tournament.service';
import { IData, RequestDto } from './interfaces/data';
import { FormBuilder, Validators } from '@angular/forms';
// En tu index.component.ts
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tournaments',
  standalone: false,
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.css'
})
export class TournamentsComponent {
  private tournamentService = inject(TournamentService);
  
  list: IData[] = []
  ngOnInit(): void {

    this.getAllTournaments();
  }

  getAllTournaments() {
    this.tournamentService.getTournaments().subscribe(res => {
      this.list = res; // Esto refresca la vista automáticamente
    });
  }

  //para el modeal
  // PARA EL MODAL
  selectedProduct: any = null;
  showModal = false;

  openProduct(id: number) {

    this.tournamentService.getTournamentById(id).subscribe((res: any) => {
      // console.log('el id: ', id, res)

      this.selectedProduct = res.data;
      this.showModal = true;
    });

  }

  closeModal() {
    this.showModal = false;
  }

  //borrar torneo

  // Función para eliminar
  deleteTournament(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        // Llamamos al servicio
        this.tournamentService.deleteTournament(id).subscribe({
          next: () => {
            console.log("ide de torneo", id);
            Swal.fire('¡Eliminado!', 'El torneo ha sido borrado.', 'success');
            
            // ACTUALIZACIÓN MINÚSCULA:
            // Volvemos a pedir la lista para que el que borramos ya no aparezca
            this.getAllTournaments(); 
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el torneo', 'error');
          }
        });

      }
    });
  }


}
