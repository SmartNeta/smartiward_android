import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams ,ViewController} from 'ionic-angular';
import { CommonService } from '../../../providers/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'news-modal',
    templateUrl: 'news_modal.html'
  })
  export class NewsModalPage {
    news:any;
    constructor(public nav: NavController,public loadingCtrl: LoadingController, public navParams: NavParams,
        public commonService:CommonService,public translate: TranslateService, public viewCtrl: ViewController) {
          this.translate.use(localStorage.getItem('language'));
            this.news = this.navParams.get('news');
            console.log("this.news",this.news)
        }

        dismiss(){
            this.viewCtrl.dismiss();
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