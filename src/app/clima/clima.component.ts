import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})

export class ClimaComponent implements OnInit {

  datosClima: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerClima();
  }

  obtenerClima() {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';

    this.http.get(url).subscribe({
      next: (respuesta) => {
        console.log('Respuesta API:', respuesta);
        this.datosClima = respuesta;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
