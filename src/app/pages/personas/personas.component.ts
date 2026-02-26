import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: any[] = [];

  constructor(private personasService: PersonasService) {}

  ngOnInit(): void {
    this.personasService.getPersonas().subscribe(data => {
      this.personas = data;
      console.log(this.personas);
    });
  }

}