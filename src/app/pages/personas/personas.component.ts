import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})

export class PersonasComponent implements OnInit {

  personas:any[] = [];

  first_name = '';
  last_name = '';
  age:number | null = null;

  constructor(private personasService:PersonasService){}

  ngOnInit(){
    this.getPersonas();
  }

  getPersonas(){
  this.personasService.getPersonas().subscribe({
    next: (data) => {
      console.log('DATOS:', data);
      this.personas = data;
    },
    error: (err) => {
      console.error('ERROR FIREBASE:', err);
    }
  });
}

  addPersona(){

    if(!this.first_name || !this.last_name || this.age === null){
      return;
    }

    const persona = {
      first_name: this.first_name,
      last_name: this.last_name,
      age: this.age
    };

    this.personasService.addPersona(persona).then(()=>{
      this.first_name = '';
      this.last_name = '';
      this.age = null;
    });
  }

  deletePersona(id:string){
    this.personasService.deletePersona(id);
  }

}