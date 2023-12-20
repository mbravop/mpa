import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';
import { Streaming } from '../../interfaces/streaming';
import { DatabaseService } from '../../providers/database.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DatabaseService],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public data : Streaming[] = [];

  constructor(private dataProvider: DatabaseService) { }

  //Ejecución de la petición y suscripción de la respuesta

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Streaming[]); 
      this.data = dataArray.slice(0,50);
    })
  }

  
}
