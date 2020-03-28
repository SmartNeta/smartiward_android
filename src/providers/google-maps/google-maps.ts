import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Connectivity } from '../connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Inner HTML Error
  https://stackoverflow.com/questions/49466226/what-is-the-solution-of-erro-that-cannot-read-property-innerhtml-of-undefined
*/
@Injectable()
export class GoogleMaps {

  
  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  options:any;
  cur_lat:any;
  cur_lng:any;
  // AJ's
  // apiKey: string = "AIzaSyDs0yrw9_9JxzS175LUlyMjw9Ugyr2vT7g";
  // apiKey: string = "AIzaSyC9AONAX0_mENZwS9WtlFskMWcIFVSAXGE";
  apiKey:string = "AIzaSyB8QzRpweAqRz8NHyVUS2QhxhnS_9WPTn4";
  markers: any = [];
 
  constructor(public connectivityService: Connectivity, public geolocation: Geolocation) {
    
  }
 
  init(mapElement: any, pleaseConnect: any): Promise<any> {
 
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
 
    return this.loadGoogleMaps();
  }
 
  loadGoogleMaps(): Promise<any> {
 
    return new Promise((resolve) => {
 
      if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();
 
       // if(this.connectivityService.isOnline()){
 
          window['mapInit'] = () => {
 
            this.initMap().then(() => {
              this.enableMap();
              resolve(true);
            });
          }
 
          let script = document.createElement("script");
          script.id = "googleMaps";
 
          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
          }
 
          document.body.appendChild(script); 
 
       // }
      } else {
 
       // if(this.connectivityService.isOnline()){
          this.initMap().then(() => {
            this.enableMap();
            resolve(true);
          });
        // }
        // else {
        //   this.disableMap();
        //   resolve(true);
        // }
 
      }
 
      this.addConnectivityListeners();
 
    });
 
  }
 
  initMap(): Promise<any> {
 
    this.mapInitialised = true;
 
    return new Promise((resolve) => {
      this.options = {
        enableHighAccuracy : true
      };
 
      this.geolocation.getCurrentPosition(this.options).then((position) => {
        console.log("position",position)
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.cur_lat = position.coords.latitude;
        this.cur_lng = position.coords.longitude;
        console.log("latLng",latLng)
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        //debugger;
        this.map = new google.maps.Map(this.mapElement, mapOptions);
        this.addMarker();
        resolve(true);
      });
 
    });
 
  }

  getLatLngFromAddress (place){
    var me = this;
    var geocoder = new google.maps.Geocoder();
    var latitude;
    var longitude;
    geocoder.geocode( { 'address': place}, function(results, status) {
      //this.geolocation.getCurrentPosition(this.options).then((position) => {
      if (status == google.maps.GeocoderStatus.OK) {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      console.log("latitude",latitude);
      console.log("longitude",longitude);
      me.tessetMarker(latitude,longitude)
      }
    });
    // console.log("latitude",latitude);
    // console.log("longitude",longitude);
    // }
     
  }
  tessetMarker(latitude,longitude){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    let latLng = new google.maps.LatLng(latitude, longitude);
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });
    this.markers.push(marker);
  
    // let content = "<p>This is your current position !</p>";          
    // let infoWindow = new google.maps.InfoWindow({
    //   content: content
    // });

    // google.maps.event.addListener(marker, 'click', () => {
    //   infoWindow.open(this.map, marker);marker
    // });
  }
  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // let content = "<p>This is your current position !</p>";          
    // let infoWindow = new google.maps.InfoWindow({
    //   content: content
    // });

    // google.maps.event.addListener(marker, 'click', () => {
    //   infoWindow.open(this.map, marker);
    // });
    this.markers.push(marker);

  }

  // createMarker(){
  //   let markeraOptions: MarkerOptions =
  // }
 
  disableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }
 
  }
 
  enableMap(): void {
 
    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
 
  }
 
  addConnectivityListeners(): void {
 
    //this.connectivityService.watchOnline().subscribe(() => {
 
      setTimeout(() => {
 
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
 
      }, 2000);
 
   // });
 
    // this.connectivityService.watchOffline().subscribe(() => {
 
    //   this.disableMap();
 
    // });
 
  }

}
