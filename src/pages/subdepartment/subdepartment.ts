import { Component } from '@angular/core';
import { NavController, LoadingController,NavParams} from 'ionic-angular';
import{ RegisterIncident } from '../register_incident/reg_incident';
import { CommonService } from '../../providers/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'subdepartment',
    templateUrl: 'subdepartment.html'
})
export class SubdepartmentPage {
    selectedDept:any;
    subDepts:any;
    descText:any;
    subDeptId:any;
    imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
    constructor(public nav: NavController,public loadingCtrl: LoadingController,public navParams:NavParams,public commonService:CommonService,public translate: TranslateService) {
        this.translate.use(localStorage.getItem('language'));       
        this.selectedDept = this.navParams.get('selctedDept');
        console.log("this.selectedDept",this.selectedDept)
        this.getAllSubDepts();
        this.getAllText();
    }   

    next(sd){
        this.subDeptId = sd.id;
        this.nav.push(RegisterIncident,{selectedSubDept:sd});
        // this.nav.setRoot(RegisterIncident,{selectedSubDept:sd});
    }

    getAllSubDepts(){
        this.commonService.getSubdepts(this.selectedDept.id).subscribe(res=>{
          console.log("res",res)
          this.subDepts = res.data;
        },err=>{
          console.log("err",err)
        });       
      }

      doRefresh(refresher) {
        console.log('Begin async operation', refresher);
    
        setTimeout(() => {
          this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
          this.getAllSubDepts();      
          this.getAllText();
          refresher.complete();
        }, 2000);
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