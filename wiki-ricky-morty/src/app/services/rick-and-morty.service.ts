import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RickAndMortyService {
  //el constructor private http representa a la clase http client//
  constructor(private http: HttpClient) {}

  //Mi clase para obtener parámetros
  getCharacters(params: any){
    //Llamo al enviroment, base url y characters.
    return this.http.get(environment.baseUrl + environment.character, {params})
  }

  getCharacterById(id:string){
    //Llamo al enviroment, base url e id
    return this.http.get(environment.baseUrl + environment.character + id)
  }

  //Obtener episodios
  getEpisodeByUrl(url:string){
    return this.http.get(url)
  }
  
}
