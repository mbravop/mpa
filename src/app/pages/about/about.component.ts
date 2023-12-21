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
  public currentPage = 1;
  public itemsPerPage = 50;
  public totalPages = 0;
  public termSearch :String  = '';
  constructor(private dataProvider: DatabaseService) { 

  }

  //Ejecución de la petición y suscripción de la respuesta
  
  ngOnInit() {
    this.loadData();
  }
  loadData(){
    const firstIndex = (this.currentPage - 1) * this.itemsPerPage;
    const lastIndex = (this.itemsPerPage * this.currentPage) - 1;
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Streaming[]);
      let wordsFilter:String[] = this.termSearch.split(" ");
      console.log(wordsFilter);
      wordsFilter.forEach((word) => {
      dataArray = dataArray.filter(item => 
        
          item.title.toLowerCase().includes(word.toLowerCase()) ||
          item.genres.toLowerCase().includes(word.toLowerCase()) ||
          item.release_year.toLowerCase().includes(word.toLowerCase()) ||
          item.type.toLowerCase().includes(word.toLowerCase())
        )       
      });
      

      this.totalPages = Math.ceil(dataArray.length / this.itemsPerPage)
      this.data = dataArray.slice(firstIndex, lastIndex);
    })
  }

  nextPage(){
    this.currentPage++;
    this.loadData();
  }

  prevPage(){
    this.currentPage--;
    this.loadData();
  }

  goToPage(index: number){
    this.currentPage = index;
    this.loadData();
  }

  getArrayPages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);
  
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  }

  buscar(term:String){
    this.currentPage = 1;
    this.termSearch = term;
    this.loadData();
    console.log(this.data);
  }
  
}
