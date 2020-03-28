import { Component } from '@angular/core';
import { NavController, LoadingController,ModalController,NavParams,ToastController,ActionSheetController } from 'ionic-angular';
// import{ ContactPartners } from '../contact_partners/contact_partners';
import{ RegComplaintsPage } from '../registered_complaints/reg_complaints';
import{ ComplaintsPage } from '../complaints/complaints'
import { CommonService } from '../../providers/common.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocationSelect } from '../location-select/location-select';
import { File,FileEntry } from '@ionic-native/file';
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
// import { ImageLoader,ImageLoaderConfig } from 'ionic-image-loader';


@Component({
    selector: 'reg-incident',
    templateUrl: 'reg_incident.html'
})
export class RegisterIncident {
    selectedSubDept:any;
    imageURI:any;
    imageFileName:any;
    base64Image:any;
    loading:any;
    res:any;
    image: string = null;
    fileName:string;
    temp:any;
    descText:any;
    citizen:any;
    imageUrl:string="http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
    public obj={
      citizen: {
        voterId: ""
      },
      stateAssembly:"",
      image: "",
      compliantSource: "Mobile",
      complaint: "",
      latitude: "",
      longitude: "",
      subDepartment: {
        id: null
      }
    };

    constructor(public nav: NavController,public loadingCtrl: LoadingController,public navParams:NavParams,public commonService:CommonService,private transfer: FileTransfer,private camera: Camera,public toastCtrl: ToastController,public actionSheetCtrl: ActionSheetController,public modalCtrl: ModalController,private file: File,private http: Http,public translate: TranslateService) {
        this.translate.use(localStorage.getItem('language'));       
        this.selectedSubDept = this.navParams.get('selectedSubDept');
        console.log("this.selectedSubDept",this.selectedSubDept);
        this.citizen = JSON.parse(localStorage.getItem('citizen'));
        console.log("this.citizen",this.citizen);
        console.log("voterId",localStorage.getItem("voterId"));
        this.getAllText();
    }   

    // next(){
    //     this.nav.push(ContactPartners);
    // }

    uploadFile(imageFileUri: any):void {
      // let loader = this.loadingCtrl.create({
      //   content: "Uploading..."
      // });
      // loader.present();
      this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file =>  this.readFile(file)))
      .catch(err => console.log(err));

      
      // const fileTransfer: FileTransferObject = this.transfer.create();
    
      // let options: FileUploadOptions = {
      //   fileKey: 'file',
      //   fileName: 'ionicfile',
      //   httpMethod: 'POST',
      //   chunkedMode: false,
      //   mimeType: "multipart/form-data",
      //   headers: {}
      // }

      // let body = new FormData();
      // body.append('file',this.imageURI);
    
      // fileTransfer.upload(this.imageURI, 'http://139.162.5.110:8585/open/mobile/upload-image', options)
      //   .then((data) => {
      //   console.log(data+" Uploaded Successfully");
      //   // this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      //   loader.dismiss();
      //   this.presentToast("Image uploaded successfully");
      // }, (err) => {
      //   console.log("error",err);
      //   loader.dismiss();
      //   this.presentToast(err);
      // });
    }

    private readFile(file: any) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("file108",file);
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {type: file.type});
        formData.append('file', imgBlob, file.name);
        this.temp = formData; 
      };
      reader.readAsArrayBuffer(file);
    }

    public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
        title: this.translate.instant('Select Image Source'),
        buttons: [
          {
            text: this.translate.instant('Load from Library'),
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
          },
          {
            text: this.translate.instant('Use Camera'),
            handler: () => {
              this.takePicture(this.camera.PictureSourceType.CAMERA);
            }
          },
          {
            text: this.translate.instant('Cancel'),
            role: 'cancel'
          }
        ]
      });
      actionSheet.present();
    }

    takePicture(sourceType) {
        const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.FILE_URI,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
       sourceType: sourceType
        }
      
        this.camera.getPicture(options).then((imageData) => {
          this.image =  imageData;

          this.uploadFile(imageData);
        }, (err) => {
          console.log(err);
          this.presentToast(err);
        });
      }


      presentToast(msg) {
        let toast = this.toastCtrl.create({
          message: msg,
          duration: 3000,
          position: 'bottom'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();
      }

      launchLocationPage(){
 
        let modal = this.modalCtrl.create(LocationSelect);
 
        modal.onDidDismiss((location) => {
            console.log(location);
            this.obj.latitude = location.lat;
            this.obj.longitude = location.lng;
        });
 
        modal.present();   
 
    }

    createIncident(){
      if(this.temp){
      this.loading = this.loadingCtrl.create({
        content: "Loading...",
     });
      this.loading.present();
      this.commonService.uploadImage(this.temp).subscribe(res=>{
        console.log("res",res);
        if(res.code == '201'){
          this.obj.image = res.data;
          // this.presentToast(res.Message);
          this.saveComplaint();
        }else{
          this.presentToast(res.Message);
        }
      })
    }else{      
      this.loading = this.loadingCtrl.create({
        content: "Loading...",
      });
      this.loading.present();
      this.saveComplaint();
    }
    }

    saveComplaint(){
        this.obj.citizen.voterId = localStorage.getItem('voterId');
        this.obj.stateAssembly = this.citizen.booth.ward.assemblyConstituency.parliamentaryConstituency.district.stateAssembly;
        // this.obj.latitude = "18.5083";
        // this.obj.longitude = "73.9101";
        this.obj.subDepartment.id = this.selectedSubDept.id;
        console.log("obj",this.obj);
        this.commonService.selectIncident(this.obj).subscribe(resp=>{
          this.res=resp;
            console.log("REsponce*******"+JSON.stringify(this.res));
            this.loading.dismissAll();  
          if (this.res.data) {
            this.presentToast(this.translate.instant('register_success'));
            this.nav.setRoot(RegComplaintsPage); 
          }else{
            this.presentToast(this.translate.instant('register_fail'));
          }
      },err=>{
      this.loading.dismissAll();
      console.log('err',err);
      });
    }

    cancelIncident(){
      this.nav.setRoot(ComplaintsPage);
    }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?"+ new Date();
        this.getAllText();
        this.temp = null;
        this.image =null;
        this.obj.complaint = "";
        this.obj.latitude = "";
        this.obj.longitude = "";
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