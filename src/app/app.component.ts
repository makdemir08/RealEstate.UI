import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Ad {
  id: string;
  title: string;
  description: string;
  locationId: string;
  location: string;
  price: number;
  area: number;
  numberOfBathrooms: number;
  adsTypeId: string;
  adsType: string;
  numberOfRoomsId: string;
  roomType: string;
}

interface AdsResponse {
  success: boolean;
  message: string;
  data: Ad[];
}

interface AdsType {
  id: string;
  adsType: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myObject: any = {};  
  myObjectArray: any[] = []; 
  title = 'RealEstateUI';
  filters: any = {};
  adsTypes: AdsType[] = [];

  ads: AdsResponse = {
    success: false,
    message: '',
    data: []
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.myObjectArray = this.convertObjectToArray(this.myObject);
    this.getAdsTypeList();
  }

  private getAdsTypeList(): void {
    this.http.get('https://localhost:44388/AdsType')
      .subscribe(
        (response: any) => {
          this.adsTypes = response.data;
          console.log('AdTypes response from server:', this.adsTypes);
        },
        (error) => {
          console.error('Error fetching AdTypes from server:', error);
        }
      );
  }

  private convertObjectToArray(obj: any): any[] {
    return Object.entries(obj);
  }

  onFilterSubmit() {
    console.log('Submit clicked');
    const apiUrl = 'https://localhost:44388/Ads'; 

    const requestBody = {
      parameters: [
        { name: 'AdsTypeId', value: this.filters.AdsTypeId },
        { name: 'LocationId', value: this.filters.LocationId },
        { name: 'NumberOfRoomsId', value: this.filters.NumberOfRoomsId }
      ]
    };

    this.http.post(apiUrl, requestBody)
      .subscribe(
        (response: any) => {
          this.ads = response;  // Servisten gelen verileri ads değişkenine ata
          console.log('Response from server:', this.ads);
        },
        (error) => {
          console.error('Error fetching data from server:', error);
        }
      );

  }
}
