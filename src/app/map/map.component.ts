import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { antPath } from 'leaflet-ant-path';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  firstCity: String;
  secondCity: String;

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

  addRoute() {
    if ((this.firstCity == 'Timisoara' && this.secondCity == 'Iasi')
      || (this.secondCity == 'Timisoara' && this.firstCity == 'Iasi')) {
      var pointA = new L.LatLng(47.155052103495144, 27.587398169412133);
      var pointB = new L.LatLng(45.767057950796485, 21.228706350202717);
      var pointList = [pointA, pointB];

      var Timisoara_Iasi = new L.Polyline(pointList, {
        color: 'red',
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1
      });

      Timisoara_Iasi.addTo(this.map).bringToFront().bringToFront().bindPopup("Tm-Is");
    }

    if ((this.firstCity == 'Timisoara' && this.secondCity == 'Kosice')
      || (this.secondCity == 'Timisoara' && this.firstCity == 'Kosice')) {
      pointA = new L.LatLng(48.72726589204106, 21.25586638299293);
      pointB = new L.LatLng(45.767057950796485, 21.228706350202717);
      pointList = [pointA, pointB];

      var Timisoara_Kosice = new L.Polyline(pointList, {
        color: 'red',
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1
      });
      Timisoara_Kosice.addTo(this.map).bringToFront().bringToFront().bindPopup("Timisoara-Kosice");
    }

    if ((this.firstCity == 'Kosice' && this.firstCity == 'Iasi')
      || (this.secondCity == 'Kosice' && this.secondCity == 'Iasi')) {
      pointA = new L.LatLng(48.72726589204106, 21.25586638299293);
      pointB = new L.LatLng(47.155052103495144, 27.587398169412133);
      pointList = [pointA, pointB];
      var Iasi_Kosice = new L.Polyline(pointList, {
        color: 'blue',
        weight: 4,
        opacity: 0.7,
        smoothFactor: 1
      });

      Iasi_Kosice.addTo(this.map).bringToFront().bringToFront().bindPopup("Timisoara-Iasi");
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [46.54245, 24.55747],
      zoom: 7,

    });

    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    // const marker1 = L.marker([47.155052103495144, 27.587398169412133], { icon: greenIcon });
    // const marker2 = L.marker([45.767057950796485, 21.228706350202717], { icon: greenIcon });
    // const marker3 = L.marker([48.72726589204106, 21.25586638299293], { icon: greenIcon });

    // marker1.addTo(this.map).bindPopup("Iasi - Ness");
    // marker2.addTo(this.map).bindPopup("Timisoara - Ness");
    // marker3.addTo(this.map).bindPopup("Kosice - Ness");
    // tiles.addTo(this.map);

    var cities = L.layerGroup();
    const Iasi = L.marker([47.155052103495144, 27.587398169412133], { icon: greenIcon }).bindPopup("Iasi - Ness").addTo(cities),
      Timisoara = L.marker([45.767057950796485, 21.228706350202717], { icon: greenIcon }).bindPopup("Timisoara - Ness").addTo(cities),
      Kosice = L.marker([48.72726589204106, 21.25586638299293], { icon: greenIcon }).bindPopup("Kosice - Ness").addTo(cities);

    //const cities = L.layerGroup([Iasi, Timisoara, Kosice]);


    var parisKievLL = [[48.8567, 2.3508], [50.45, 30.523333]];
    var pointA = new L.LatLng(48.8567, 2.3508);
    var pointB = new L.LatLng(50.45, 30.523333);
    var varpointList = [pointA, pointB];

    // https://github.com/ewoken/Leaflet.MovingMarker

    tiles.addTo(this.map);
    cities.addTo(this.map);

    // const path1 = antPath([[47.155052103495144, 27.587398169412133], [45.767057950796485, 21.228706350202717]],
    //   { color: '#1a1aff', weight: 5, opacity: 0.8 });

    //path1.addTo(this.map);

    // antPath([[47.155052103495144, 27.587398169412133], [45.767057950796485, 21.228706350202717]],
    //   { color: '#1a1aff', weight: 5, opacity: 0.8 })
    //   .addTo(this.map).bindPopup("Timisoara-Iasi");

    // antPath([[48.72726589204106, 21.25586638299293], [45.767057950796485, 21.228706350202717]],
    //   { color: '#1a1aff', weight: 5, opacity: 0.8 })
    //   .addTo(this.map);

    // antPath([[47.155052103495144, 27.587398169412133], [48.72726589204106, 21.25586638299293]],
    //   { color: '#1a1aff', weight: 5, opacity: 0.8 })
    //   .addTo(this.map).bindPopup("Iasi-Kosice");
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
      }).addTo(this.map).bindPopup("Slovakia").bringToBack();
    });
    this.http.get('assets/romania.json').subscribe(json => {
      this.json = json;
      L.geoJSON(this.json, {
        style: function (feature) {
          return { color: feature.properties.color }
        }
      }).addTo(this.map).bindPopup("Romania").bringToBack();
    })
  }

  ngAfterViewInit(): void {
    //this.initMap();
    //this.onMapReady();
  }

  ngOnInit(): void {
    this.onMapReady();
    this.initMap();

  }



}
