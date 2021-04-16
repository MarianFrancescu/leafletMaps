import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  //private map;
  map: L.Map;
  json;
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: ""
      })
    ],
    zoom: 7,
    center: L.latLng(46.54245, 24.55747)
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.54245, 24.55747],
      zoom: 7
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });


    const greenIcon = L.icon({
      iconUrl: './assets/icons/marker.png',

      iconSize: [30, 40], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [16, 40], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -46] // point from which the popup should open relative to the iconAnchor
    });
    const marker1 = L.marker([47.155052103495144, 27.587398169412133], { icon: greenIcon });
    const marker2 = L.marker([45.767057950796485, 21.228706350202717], { icon: greenIcon });
    const marker3 = L.marker([48.72726589204106, 21.25586638299293], { icon: greenIcon });

    marker1.addTo(this.map).bindPopup("Iasi - Ness");
    marker2.addTo(this.map).bindPopup("Timisoara - Ness");
    marker3.addTo(this.map).bindPopup("Kosice - Ness");
    tiles.addTo(this.map);


    antPath([[47.155052103495144, 27.587398169412133], [45.767057950796485, 21.228706350202717]],
      { color: '#1a1aff', weight: 5, opacity: 0.8 })
      .addTo(this.map).bindPopup("Timisoara-Iasi");

    antPath([[48.72726589204106, 21.25586638299293], [45.767057950796485, 21.228706350202717]],
      { color: '#1a1aff', weight: 5, opacity: 0.8 })
      .addTo(this.map);

    antPath([[47.155052103495144, 27.587398169412133], [48.72726589204106, 21.25586638299293]],
      { color: '#1a1aff', weight: 5, opacity: 0.8 })
      .addTo(this.map).bindPopup("Iasi-Kosice");
  }


  constructor(private http: HttpClient) { }

  onMapReady() {
    this.http.get('assets/hungary.json').subscribe(json => {
      this.json = json;
      L.geoJSON(this.json, {
        style: function (feature) {
          return { color: feature.properties.color }
        }
      }).addTo(this.map).bindPopup("Hungary").bringToBack();
    });
    this.http.get('assets/slovakia.json').subscribe(json => {
      this.json = json;
      L.geoJSON(this.json, {
        style: function (feature) {
          return { color: feature.properties.color }
        }
      }).addTo(this.map).bindPopup("Slovakia");
    });
    this.http.get('assets/romania.json').subscribe(json => {
      this.json = json;
      L.geoJSON(this.json, {
        style: function (feature) {
          return { color: feature.properties.color }
        }
      }).addTo(this.map).bindPopup("Romania");
    })
  }

  ngAfterViewInit(): void {
    //this.initMap();
    //this.onMapReady();
  }

  ngOnInit(): void {
    this.initMap();
    this.onMapReady();
  }



}
