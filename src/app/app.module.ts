import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import {provideFirebaseApp, initializeApp } from '@angular/fire/app';

import {provideFirestore, getFirestore, enableIndexedDbPersistence, } from '@angular/fire/firestore';
import { PersonasComponent } from './pages/personas/personas.component';
import { FormsModule } from '@angular/forms';
import { ClimaComponent } from './clima/clima.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    ClimaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideFirebaseApp(() =>
  initializeApp({
      apiKey: "AIzaSyCSsXfp8pXVWAUZMj1skBJ2rfx0PDIVIvg",
      authDomain: "pwa-2026-272a6.firebaseapp.com",
      projectId: "pwa-2026-272a6",
      storageBucket: "pwa-2026-272a6.firebasestorage.app",
      messagingSenderId: "470067482788",
      appId: "1:470067482788:web:39e0b7ec1b4f5646799631"
  }),
  ),
  provideFirestore(() => {
    const firestore = getFirestore();
    enableIndexedDbPersistence(firestore).catch((err) =>
      console.error('Persistence failed' , err),
  );
  return firestore;
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
