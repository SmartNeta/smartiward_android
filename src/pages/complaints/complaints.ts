import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams,ModalController,Events } from 'ionic-angular';
import { RegComplaintsPage } from '../registered_complaints/reg_complaints';
import { DepartmentPage } from '../department/department';
import { NotificationsPage } from '../notifications/notifications';
import { CommonService } from '../../providers/common.service';
import { TranslateService } from '@ngx-translate/core';
import { NewsModalPage } from './news-modal/news_modal';

@Component({
  selector: 'complaints',
  templateUrl: 'complaints.html'
})
export class ComplaintsPage {
  lang:any;
  citizenId:any;
  totalCount: number;
  stateId:any;
  news:any;
  descText:any;
  imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
  constructor(public nav: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,
    public commonService:CommonService,public translate: TranslateService,public modalCtrl: ModalController,public events: Events) {
      this.getAllText();
      this.translate.use(localStorage.getItem('language'));    
      
    // this.lang = 'en';
    // this.translate.setDefaultLang('en');
    // this.translate.use('en');
    // localStorage.setItem('language','en');
    this.citizenId = localStorage.getItem('citizenId');
    events.subscribe('notification:received', (note)=> {
      console.log("note",note); 
    });
  }   

  ionViewDidLoad() {
    this.getAllNews();
    this.getNotifications();
    console.log("Hello ionViewDidLoad");
    this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
  }

  gotoNotification(){
    this.nav.push(NotificationsPage);
  }

  getNotifications(){
    this.commonService.getNotificationData(this.citizenId).subscribe(res=>{
      this.totalCount = res.count;
    },err=>{
      console.log("err",err)
    });
  }

  getAllNews(){
    this.commonService.getNews(localStorage.getItem('stateId')).subscribe(res=>{
      console.log('res',res);
      this.news = res.data;
      
    },err=>{
      console.log("err",err)
    });
  }

  showNews(n){
    console.log(n);
    let modal = this.modalCtrl.create(NewsModalPage,{news:n});
 
        // modal.onDidDismiss((location) => {
        //     console.log(location);
        //     this.obj.latitude = location.lat;
        //     this.obj.longitude = location.lng;
        // });
 
        modal.present();   
  }
  getAllText(){
    this.commonService.getData().subscribe(res=>{
      console.log('res',res);
      this.descText = res.data;
    },err=>{
      console.log("err",err)
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
      this.getAllNews();
      this.getNotifications();
      this.getAllText();
      refresher.complete();
    }, 2000);
  }
  
  createWebLink(link) {
    if (link) {
        var pattern = /^((http|https|ftp):\/\/)/;
        if (!pattern.test(link)) {
            link = "http://" + link;
        }
        return link;
    } else {
        return "";
    }
};
}