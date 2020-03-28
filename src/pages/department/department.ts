import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import{ SubdepartmentPage } from '../subdepartment/subdepartment';
import { CommonService } from '../../providers/common.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'department',
    templateUrl: 'department.html'
})
export class DepartmentPage {
    depts:any;
    deptId:any;
    descText:any;
    imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
    constructor(public nav: NavController,public loadingCtrl: LoadingController,public commonService:CommonService,public translate: TranslateService) {
        this.translate.use(localStorage.getItem('language'));       
        console.log(localStorage.getItem('language'));
        this.getAllDepts();       
        this.getAllText();
    }   

    next(d){
        this.deptId = d.id;
        console.log("d",d);
        this.nav.push(SubdepartmentPage,{selctedDept:d});
    }

    getAllDepts(){
      this.commonService.getDepts().subscribe(res=>{
        console.log("res",res)
        this.depts = res.data;
      },err=>{
        console.log("err",err)
      });       
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
    
        setTimeout(() => {
          this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
          this.getAllDepts();
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