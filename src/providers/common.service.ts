import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class CommonService {
  baseUrl: string;
   constructor(private http: Http) {
    //  this.baseUrl="http://192.168.1.174:8585/open/mobile";  //local
     this.baseUrl="http://13.233.175.188:8585/open/mobile";    //server
   }

   generateOTP(data) {
      var headers = new Headers()
      headers.append('Content-Type', 'application/json');
   
      let options_n = new RequestOptions({ headers: headers });
   
      // let urlSearchParams = new URLSearchParams();
   
      // console.log("InService*********",data)
      // urlSearchParams.append('voterId', data.voterid);
      // urlSearchParams.append('mobile', data.mobile);
      // let body = urlSearchParams.toString()

      return this.http.post(this.baseUrl + "/generateOTP",data,options_n).map((res: Response) => res.json());
    }

    verifyOTP(data){
      var headers = new Headers()
      headers.append('Content-Type', 'application/json');
   
      let options_n = new RequestOptions({ headers: headers });
      console.log(data);
   
      // let urlSearchParams = new URLSearchParams();
   
      // console.log("InService*********",data)
      // urlSearchParams.append('voterId', data.voterId);
      // urlSearchParams.append('otp', data.otp);
      // let body = urlSearchParams.toString()

      return this.http.post(this.baseUrl + "/verifyOTP",data,options_n).map((res: Response) => res.json());
    }

    getComplaints(data) {
      console.log("this.citizenId",data);
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options_n = new RequestOptions({ headers: headers });
      console.log("InService*********",data)
      return this.http.get(this.baseUrl + "/complaintByCitizen/"+data,options_n).map((res: Response) => res.json());
      //instead of 4 =>"+data"
    }

    getNotificationData(citizenId) {
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options_n = new RequestOptions({ headers: headers });
      return this.http.get(this.baseUrl + "/notification/"+citizenId,options_n).map((res: Response) => res.json());
    }

    markAsReadNotification(data){
      var headers = new Headers()
      headers.append('Content-Type', 'application/json');
      let options_n = new RequestOptions({ headers: headers });
      return this.http.post(this.baseUrl + "/notificationSeen",data,options_n).map((res: Response) => res.json());
    }

    getDepts() {
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
   
      let options_n = new RequestOptions({ headers: headers });
      
      return this.http.get(this.baseUrl + "/departnemt",options_n).map((res: Response) => res.json());
    }

    getSubdepts(data) {
      console.log("SubDept",data);
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options_n = new RequestOptions({ headers: headers });
      console.log("InService*********",data)
      return this.http.get(this.baseUrl + "/subDepartnemt/"+data,options_n).map((res: Response) => res.json());
    }

    selectIncident(data){
      var headers = new Headers()
      headers.append('Content-Type', 'application/json');
   
      let options_n = new RequestOptions({ headers: headers });

      return this.http.post(this.baseUrl + "/complaint",data,options_n).map((res: Response) => res.json());
    }

    uploadImage(data){
      var headers = new Headers()
      // headers.append('Content-Type', 'multipart/form-data');
   
      let options_n = new RequestOptions({ headers: headers });

      return this.http.post(this.baseUrl + "/upload-image",data,options_n).map((res: Response) => res.json());
    }

    getImage(){
      var headers = new Headers()
      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
   
      let options_n = new RequestOptions({ headers: headers });
      
      return this.http.get(this.baseUrl + "/logo.jpg",options_n).map((res: Response) => res.json());
    }

    getNews(id) {
      console.log("this.stateId",id);
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options_n = new RequestOptions({ headers: headers });
      return this.http.get(this.baseUrl + "/news/"+id,options_n).map((res: Response) => res.json());
      //instead of 4 =>"+data"
    }

    // getAllText(){
    //   var headers = new Headers()
    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   let options_n = new RequestOptions({ headers: headers });
    //   return this.http.get(this.baseUrl + "/getAdminSettings",options_n).map((res: Response) => res.json());
    // }

    getData(){
      var headers = new Headers()
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options_n = new RequestOptions({ headers: headers });
      return this.http.get(this.baseUrl + "/getApplicationSettings",options_n).map((res: Response) => res.json());
    }

    logOut(){
      var id = localStorage.getItem('voterId');
      var headers = new Headers();
      let options_n = new RequestOptions({ headers: headers });

      return this.http.post(this.baseUrl + "/logoutCitizen/"+id,options_n).map((res: Response) => res.json());
    }
}