import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})

export class ClimaComponent implements OnInit {

  datosClima: any[] = [];
  ubicacion = 'Detectando ubicación...';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerUbicacion();
  }

  obtenerUbicacion() {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // Obtener nombre de ciudad usando Open-Meteo Geocoding
        const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=es`;

        this.http.get<any>(geoUrl).subscribe(res => {

          if(res.results && res.results.length > 0){

            const ciudad = res.results[0].name;
            const estado = res.results[0].admin1;

            this.ubicacion = `${ciudad}, ${estado}`;

          }

        });

        this.obtenerClima(lat, lon);

      });

    } else {
      console.error("Geolocalización no soportada");
    }

  }

  obtenerClima(lat: number, lon: number) {

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;

    this.http.get(url).subscribe({
      next: (respuesta: any) => {

        console.log('Respuesta API:', respuesta);

        const horas = respuesta.hourly.time;
        const temperaturas = respuesta.hourly.temperature_2m;

        const datos = horas.map((hora: string, index: number) => ({
          hora: hora,
          temperatura: temperaturas[index]
        }));

        // SOLO 12 TARJETAS
        this.datosClima = datos.slice(0, 12);

      },
      error: (error) => {
        console.error('Error:', error);
      }
    });

  }

  getColor(temp: number) {

    if (temp >= 30) {
      return 'hot';
    }

    if (temp >= 20) {
      return 'warm';
    }

    if (temp >= 10) {
      return 'cool';
    }

    return 'cold';
  }

}