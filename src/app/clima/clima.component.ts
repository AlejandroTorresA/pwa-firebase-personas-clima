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

        this.ubicacion = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;

        this.obtenerClima(lat, lon);

      });

    } else {
      console.error("Geolocalización no soportada");
    }

  }

  obtenerClima(lat: number, lon: number) {

    const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`;

    this.http.get(url).subscribe({
      next: (respuesta: any) => {

        console.log('Respuesta API:', respuesta);

        const horas = respuesta.hourly.time;
        const temperaturas = respuesta.hourly.temperature_2m;
        const weathercodes = respuesta.hourly.weathercode; //codigos de clima para añadir iconos

        const datos = horas.map((hora: string, index: number) => ({
        hora: hora,
        temperatura: temperaturas[index],
        codigo: weathercodes[index] // se indexan los codigos de clima
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

    getIcono(codigo: number): string { //obtencion de iconos para las tarjetas de clima

    // ☀️ Despejado
    if (codigo === 0) return '☀️';

    // 🌤️ Parcialmente nublado
    if (codigo === 1 || codigo === 2) return '🌤️';

    // ☁️ Nublado
    if (codigo === 3) return '☁️';

    // 🌫️ Niebla
    if (codigo >= 45 && codigo <= 48) return '🌫️';

    // 🌧️ Lluvia
    if (codigo >= 51 && codigo <= 67) return '🌧️';

    // ❄️ Nieve
    if (codigo >= 71 && codigo <= 77) return '❄️';

    // ⛈️ Tormenta
    if (codigo >= 80 && codigo <= 99) return '⛈️';

    return '❓';
  }

}