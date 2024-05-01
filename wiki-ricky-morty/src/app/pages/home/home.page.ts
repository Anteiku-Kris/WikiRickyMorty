import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCard,
  IonCol,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    SharedModule,
    IonSearchbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage implements OnInit {
  //Mis variables de personajes(arreglo) y parametros
  characters: any[] = [];
  params = {} as any;

  //Inyecto mi servicio creado, RickAndMortyService
  constructor(
    //variable que recibira los valores de mi servicio
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  //Función para obtener personajes
  getCharacters(event?: any) {
    this.params.page += 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({
      //Si la respuesta es correcta guardo el resultado en mi array character
      next: (res: any) => {
        this.characters.push(...res.results);

        //Verificar que se importan los elementos de la api
        console.log(this.characters);

        //Configuramos una condición if para el evento de scrollear
        if (event) event.target.complete();
      },
      //Si la respuesta es incorrecta
      error: (error: any) => {
        if (event) event.target.complete();
      },
    });
  }
  //Función para hacer la busqueda por nombre
  searchCharacters() {
    this.params.page = 1;

    this.rickAndMortyService.getCharacters(this.params).subscribe({

      next: (res: any) => {
        this.characters = res.results
      },
      //Si la respuesta es incorrecta
      error: (error: any) => {
        
      },
    });
  }


}
