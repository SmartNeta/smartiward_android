import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '../../providers/common.service';

@Component({
    selector: 'settings',
    templateUrl: 'settings.html'
  })

  export class SettingsPage {
    lang:any;
    descText:any;
    imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
    constructor(public nav: NavController,public loadingCtrl: LoadingController,public translate: TranslateService,public commonService:CommonService) {
      if( localStorage.getItem("language") != undefined){
        this.translate.use(localStorage.getItem("language"));
        this.lang = localStorage.getItem("language");
      }else{
        this.lang = "en";
      }
      console.log("this.lang",this.lang);
      this.getAllText();
    }

    switchLanguage() {
        localStorage.setItem('language',this.lang);
        this.translate.use(this.lang);
    }

    getAllText(){
      this.commonService.getData().subscribe(res=>{
        console.log('res',res);
        this.descText = res.data;
      },err=>{
        console.log("err",err)
      });
    }

    
  }