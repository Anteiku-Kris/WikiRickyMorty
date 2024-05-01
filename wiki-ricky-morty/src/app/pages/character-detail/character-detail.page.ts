import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonAvatar,
  IonItem,
  IonIcon,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SharedModule,
    IonBackButton,
    IonButtons,
    IonAvatar,
    IonItem,
    IonIcon,
    IonLabel,
    IonRow,
    IonCol,
    IonGrid,
    IonCard,
    IonCardContent,
  ],
})
export class CharacterDetailPage implements OnInit {
  //variable que recibira el character id
  characterId: string = '';

  //variable que contendra la info del personaje
  character = null as any;

  //variable tipo arreglo que contiene episodios
  episodes:any[] = [];

  constructor(
    private actRoute: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {
    //Recibe el id que obtendremos a través de la ruta
    this.characterId = this.actRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {}

  //Llama la función cada vez que el usuario entra a la página
  ionViewWillEnter() {
    this.getCharacter()
  }

  //Función para obtener personajes por el id (para character-detail)

  getCharacter() {
    this.rickAndMortyService.getCharacterById(this.characterId).subscribe({
      next: (res:any)=>{
        this.character = res
        this.getEpisodes()
      },
      error: (error:any)=>{

      } 
    })
  }

  getEpisodes() {

    for(let url of this.character.episode){
      this.rickAndMortyService.getEpisodeByUrl(url).subscribe({
        next: (res: any)=>{
            console.log(res)
            this.episodes.push(res)
        },
        error: (error:any) => {

        }
      })
    }
  }

   
  
}
