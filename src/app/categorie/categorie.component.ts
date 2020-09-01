import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Categorie } from '../models/categorie';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
//import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories: Categorie[];
  closeResult: string;
	selectedCategorie: Categorie = { id : null , nom: null};
	constructor(private apiService: ApiService, private modalService: NgbModal) {
		this.apiService.readCategories().subscribe((categories: Categorie[])=>{
		this.categories = categories;
		console.log(this.categories);
	}) }

  ngOnInit(): void {
  }

  createOrUpdateCategorie(form){
		form.value.id = this.selectedCategorie.id;
		form.value.nom = this.selectedCategorie.nom;
		if(this.selectedCategorie && this.selectedCategorie.id){
			this.apiService.updateCategorie(form.value).subscribe((categorie: Categorie)=>{
			console.log("Categorie updated" , categorie);
			this.apiService.readCategories().subscribe((categories: Categorie[])=>{
				this.categories = categories;
			})
		});
	}
	else{
		this.apiService.createCategorie(form.value).subscribe((categorie: Categorie)=>{
			console.log("Categorie created, ", categorie);
			this.apiService.readCategories().subscribe((categories: Categorie[])=>{
				this.categories = categories;
			})
		});
	}
}

selectCategorie(categorie: Categorie){
	this.selectedCategorie = categorie;
}

deleteCategorie(id){
	this.apiService.deleteCategorie(id).subscribe((categorie: Categorie)=>{
		console.log("Categorie deleted, ", categorie);
		this.apiService.readCategories().subscribe((categories: Categorie[])=>{
			this.categories = categories;
		})
	});
}

open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  confirmBox(id){
    Swal.fire({
      title: 'Voulez-vous supprimer cette categorie?',
      //text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
		this.deleteCategorie(id);
        Swal.fire(
          'Supprimez!',
          'Votre fichier a été supprimé.',
          'success'
        )
	  } 
	//   else if (result.dismiss === Swal.DismissReason.cancel) {
    //     Swal.fire(
    //       'Cancelled',
    //       'Your imaginary file is safe :)',
    //       'error'
    //     )
    //   }
    })
  }

  addUser(categorie) {
    Swal.fire({
      //title: 'Voulez-vous supprimer cette categorie?',
      //text: 'You will not be able to recover this file!',
      //icon: 'warning',
      showCancelButton: true,
      
      html:`
      <form #fe="ngForm">
		  <div class="form-group">
			  <label class="float-left" for="nom">Nom</label>
				<input type="text" class="form-control" [(ngModel)]="selectedCategorie.nom" id="nom" name="nom">
		  </div>
	  </form>
  `,
      confirmButtonText: 'Mettre à jour',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.createOrUpdateCategorie(categorie);
        Swal.fire(
          'Supprimez!',
          'Votre fichier a été supprimé.',
          'success'
        )
	  } 
    })
}

}
