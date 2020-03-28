import { NavController, Platform, ViewController } from 'ionic-angular';
import { Component,OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../../providers/google-maps/google-maps';
import { Connectivity } from '../../providers/connectivity-service/connectivity-service';
 
@Component({
  selector: 'page-location-select',
  templateUrl: 'location-select.html'
})
export class LocationSelect {
 
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
 
    latitude: number;
    longitude: number;
    autocompleteService: any;
    placesService: any;
    query: string = '';
    places: any = [];
    searchDisabled: boolean;
    saveDisabled: boolean;
    location: any; 
    mapInstance:any;
 
    constructor(public navCtrl: NavController,public connectivityService: Connectivity, public zone: NgZone, public maps: GoogleMaps, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController) {
        this.searchDisabled = true;
        this.saveDisabled = false;
    }
 
    ionViewDidLoad(): void  {
        console.log("ionViewDidLoad Location Select")
        // debugger
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(() => {            
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.placesService = new google.maps.places.PlacesService(this.maps.map);
            console.log("this.placesService",this.placesService);
            this.searchDisabled = false;
        });
        console.log(this.maps.cur_lat);
        console.log(this.maps.cur_lng);
        
    }
 
    selectPlace(place){
        console.log("place",place);
        this.query = place.description;
        //debugger;
        this.places = [];
 
        let location = {
            lat: null,
            lng: null,
            name: place.name
        };
 
        this.placesService.getDetails({placeId: place.place_id}, (details) => {
          //  debugger;
            this.zone.run(() => {
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                // this.saveDisabled = false;
 
                this.maps.map.setCenter({lat: location.lat, lng: location.lng});
 
                this.location = location;
            });
            this.maps.tessetMarker(location.lat, location.lng);
 
        });
 
    }

    search(query){
        console.log("query",query);
        this.maps.getLatLngFromAddress(query);
    }
 
    searchPlace(){
 
        // this.saveDisabled = true;
 
        if(this.query.length > 0 && !this.searchDisabled) {
 
            let config = {
                types: ['geocode'],
                input: this.query
            }
 
            this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
 
                if(status == google.maps.places.PlacesServiceStatus.OK && predictions){
 
                    this.places = [];
 
                    predictions.forEach((prediction) => {
                        this.places.push(prediction);
                    });
                }
 
            });
 
        } else {
            this.places = [];
        }
 
    }

 
    save(){
        if(this.location != undefined){
            this.viewCtrl.dismiss(this.location);
        }else{
            this.location = {
                lat: this.maps.cur_lat,
                lng: this.maps.cur_lng,
            };
            this.viewCtrl.dismiss(this.location);
        }
        
    }
 
    close(){
        this.viewCtrl.dismiss();
    }  
 
}