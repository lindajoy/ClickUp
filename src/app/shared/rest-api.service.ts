import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  baseUrl = 'https://rickandmortyapi.com/api/location/';

  constructor(private httpClient: HttpClient) {}

  // Get the all the locations from Rick and Morty API
  getLocations() {
    return this.httpClient.get(this.baseUrl);
  }

  
}
