import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://localhost:81/apicategory";

  constructor(private httpClient: HttpClient) { }

  readCategories(): Observable<Categorie[]>{
		return this.httpClient.get<Categorie[]>(`${this.PHP_API_SERVER}/index.php`);
	}
	createCategorie(categorie: Categorie): Observable<Categorie>{
		return this.httpClient.post<Categorie>(`${this.PHP_API_SERVER}/create_categorie.php`, categorie);
	}
	updateCategorie(categorie: Categorie){
		return this.httpClient.put<Categorie>(`${this.PHP_API_SERVER}/update_categorie.php`, categorie);
	}
	deleteCategorie(id: number){
		return this.httpClient.delete<Categorie>(`${this.PHP_API_SERVER}/delete_categorie.php/?id=${id}`);
	}
}
