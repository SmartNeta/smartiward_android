webpackJsonp([0],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NotificationsPage = (function () {
    function NotificationsPage(nav, loadingCtrl, commonService, toastCtrl, translate) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.commonService = commonService;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.loading = this.loadingCtrl.create({
            content: this.translate.instant('please wait')
        });
        this.citizenId = localStorage.getItem('citizenId');
        this.getAllText();
    }
    NotificationsPage.prototype.ionViewDidLoad = function () {
        this.getNotifications();
    };
    NotificationsPage.prototype.getNotifications = function () {
        var _this = this;
        this.loading.present();
        this.commonService.getNotificationData(this.citizenId).subscribe(function (res) {
            console.log(res);
            _this.notifications = res.notifications;
            _this.notificationsCount = res.count;
            _this.loading.dismiss();
        }, function (err) {
            console.log("err", err);
            _this.loading.dismiss();
        });
    };
    NotificationsPage.prototype.markAsReadNotification = function (notificationId) {
        var _this = this;
        console.log("this.citizenId", this.citizenId);
        var data = {
            "notificatoinId": notificationId,
            "citizenId": this.citizenId
        };
        this.commonService.markAsReadNotification(data).subscribe(function (res) {
            _this.presentToast(_this.translate.instant('Mark as read'));
            _this.getNotifications();
        }, function (err) {
            console.log("err", err);
        });
    };
    NotificationsPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    NotificationsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getNotifications();
            _this.getAllText();
            refresher.complete();
        }, 2000);
    };
    NotificationsPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'notifications-page',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/notifications/notifications.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n        <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n        <button ion-button menuToggle>\n            <ion-icon class="menu_icon" name="menu"></ion-icon>\n        </button>\n    </ion-navbar>\n    \n\n</ion-header>\n\n<ion-content class="login-content auth-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <div class="buttons">\n        <h2 class="head">{{\'Notifications\' | translate}}</h2>\n        <ion-row class="space" *ngFor="let c of notifications">\n            <ion-col class="schedule-data1 shadow">\n              <div class="data-item">            \n                  <div class="title">{{\'Notification\' | translate}}:{{c.notification}}</div>\n                  <div>{{\'Notification date\' | translate}}:{{c.modifiedDate | date: \'dd/MM/yy\'}}</div>\n                  <div>{{\'Complaint Id\' | translate}}:{{c.complaint.incidentId}}</div>\n                  <div>{{\'Department\' | translate}}:{{c.complaint.subDepartment.department.name}}</div>\n                  <div>{{\'Sub\' | translate}}:{{c.complaint.subDepartment.name}}</div>\n                  <div>{{\'Comment\' | translate}}:{{c.complaint.complaint}}</div>\n                  <div>{{\'Status\' | translate}}:{{c.complaint.status}}</div>\n                  <ion-icon class="check_icon" name="checkmark-circle" (click)="markAsReadNotification(c.id)"></ion-icon>\n              </div>\n            </ion-col>\n        </ion-row>\n        <ion-row *ngIf="notificationsCount == 0">\n          <ion-col class="schedule-data1 shadow" style="text-align: center;">\n            <div class="title">{{\'notifications not found.\' | translate}}</div>\n          </ion-col>\n        </ion-row>\n    </div>\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/notifications/notifications.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_service__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegComplaintsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegComplaintsPage = (function () {
    function RegComplaintsPage(nav, loadingCtrl, commonService, navParams, translate) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.commonService = commonService;
        this.navParams = navParams;
        this.translate = translate;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.status = this.translate.instant('All');
        this.cList = [];
        this.translate.use(localStorage.getItem('language'));
        this.citizenId = localStorage.getItem('citizenId');
        console.log("this.citizenId", this.citizenId);
        console.log("status", this.status);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.getComplaints();
        this.getAllText();
    }
    RegComplaintsPage.prototype.getComplaints = function () {
        var _this = this;
        this.loading.present();
        console.log("this.citizenId", this.citizenId);
        this.commonService.getComplaints(this.citizenId).subscribe(function (res) {
            console.log("res", res);
            _this.complaints = res.data;
            _this.noRecords = _this.complaints.length;
            _this.complaintsCopy = _this.complaints;
            _this.loading.dismiss();
        }, function (err) {
            console.log("err", err);
            _this.loading.dismiss();
        });
    };
    RegComplaintsPage.prototype.onChange = function () {
        this.loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loading.present();
        console.log('this.status', this.status);
        var status = this.status == "OutOfScope" ? "Out Of Scope" : this.status;
        for (var i = 0; i < this.complaintsCopy.length; i++) {
            if (status == this.translate.instant('All')) {
                this.complaints = this.complaintsCopy;
                this.cList = this.complaints;
            }
            else if (this.complaintsCopy[i].status != null) {
                if (status == this.translate.instant(this.complaintsCopy[i].status)) {
                    this.cList.push(this.complaintsCopy[i]);
                }
            }
        }
        this.complaints = this.cList;
        this.noRecords = this.complaints.length;
        this.cList = [];
        this.loading.dismiss();
        console.log('this.complaints', this.complaints);
    };
    RegComplaintsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            // this.getComplaints();
            _this.getAllText();
            _this.commonService.getComplaints(_this.citizenId).subscribe(function (res) {
                console.log("res", res);
                _this.complaints = res.data;
                _this.noRecords = _this.complaints.length;
                _this.complaintsCopy = _this.complaints;
                var status = _this.status == "OutOfScope" ? "Out Of Scope" : _this.status;
                for (var i = 0; i < _this.complaintsCopy.length; i++) {
                    if (status == _this.translate.instant('All')) {
                        _this.complaints = _this.complaintsCopy;
                        _this.cList = _this.complaints;
                    }
                    else if (_this.complaintsCopy[i].status != null) {
                        if (status == _this.translate.instant(_this.complaintsCopy[i].status)) {
                            _this.cList.push(_this.complaintsCopy[i]);
                        }
                    }
                }
                _this.complaints = _this.cList;
                _this.noRecords = _this.complaints.length;
                _this.cList = [];
            }, function (err) {
                console.log("err", err);
            });
            refresher.complete();
        }, 2000);
    };
    RegComplaintsPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    RegComplaintsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'reg-complaints',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/registered_complaints/reg_complaints.html"*/'<ion-header class="login-header auth-header">\n        <ion-navbar>\n            <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n            <img class="logo" src="{{imageUrl}}">\n            <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n            <button ion-button menuToggle>\n                <ion-icon class="menu_icon" name="menu"></ion-icon>\n            </button>\n        </ion-navbar>\n        <ion-row>\n            <ion-col col-5></ion-col>\n            <ion-col class="activity" col-7>\n                <ion-item class="items">\n                    <ion-select class="selectfrom" interface="popover" [(ngModel)]="status" (ionChange)="onChange()">\n                            <ion-option [value]="All" selected>{{\'All\' | translate}}</ion-option>\n                            <ion-option [value]="Assigned">{{\'Assigned\' | translate}}</ion-option>\n                            <ion-option [value]="Unassigned">{{\'Unassigned\' | translate}}</ion-option>\n                            <ion-option [value]="Inprogress">{{\'Inprogress\' | translate}}</ion-option>\n                            <ion-option [value]="Resolved">{{\'Resolved\' | translate}}</ion-option>\n                            <!-- <ion-option [value]="Ignored">{{\'Ignored\' | translate}}</ion-option> -->\n                            <ion-option [value]="OutOfScope">{{\'Out Of Scope\' | translate}}</ion-option>\n                    </ion-select>      \n                </ion-item>\n            </ion-col>\n        </ion-row>\n\n    </ion-header>\n    \n    <ion-content class="login-content auth-content">\n        <ion-refresher (ionRefresh)="doRefresh($event)">\n            <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n        <div class="buttons">\n            <h2 class="head">{{\'Registered complaints\' | translate}}</h2>\n            <ng-container *ngIf="noRecords != 0">\n            <ion-row class="space" *ngFor="let c of complaints">\n                <ion-col class="schedule-data1 shadow">\n                    <div class="data-item">            \n                        <div class="title">{{\'Complaint\' | translate}}:#{{c.incidentId}}</div>\n                        <div>{{\'Complaint date\' | translate}}:{{c.createdDate | date: \'dd/MM/yy\'}}</div>\n                        <div>{{\'Department\' | translate}}:{{c.subDepartment.department.name}}</div>\n                        <div>{{\'Sub\' | translate}}:{{c.subDepartment.name}}</div>\n                        <div>{{\'Comment\' | translate}}:{{c.complaint}}</div>\n                        <div>{{\'Status\' | translate}}:{{c.status | translate}}</div>\n                    </div>\n                </ion-col>\n            </ion-row>\n        </ng-container>\n            <ion-row class="space" *ngIf="noRecords == 0">\n                    <ion-col class="schedule-data1 shadow">\n                        <div class="data-item">            \n                            <div class="title1">{{\'No records found\' | translate}}</div>\n                        </div>\n                    </ion-col>\n                </ion-row>\n\n            <!-- <ion-row class="space">\n                <ion-col class="schedule-data1">\n                    <div class="data-item">     \n                        <div class="title">Complaint#145</div>\n                        <div>Complaint date:12/04/18</div>\n                        <div>Department:BESCOM</div>\n                        <div>Sub:Trade Licence</div>\n                        <div>Comment:hello</div>\n                        <div>Status:under investigation</div>\n                    </div>\n                </ion-col>\n            </ion-row>\n\n        <ion-row class="space">\n                <ion-col class="schedule-data1">\n            <div class="data-item">\n                   \n                <div class="title">Complaint#145</div>\n                <div>Complaint date:12/04/18</div>\n                <div>Department:BESCOM</div>\n                <div>Sub:Trade Licence</div>\n                <div>Comment:hello</div>\n                <div>Status:under investigation</div>\n            </div>\n        </ion-col>\n        </ion-row>\n\n        <ion-row class="space">\n                <ion-col class="schedule-data1">\n            <div class="data-item">\n                   \n                <div class="title">Complaint#145</div>\n                <div>Complaint date:12/04/18</div>\n                <div>Department:BESCOM</div>\n                <div>Sub:Trade Licence</div>\n                <div>Comment:hello</div>\n                <div>Status:under investigation</div>\n            </div>\n        </ion-col>\n        </ion-row> -->\n\n\n\n            <!-- <ion-row class="space">\n                <ion-col class="schedule-data">\n                    <div class="data-item">\n                   \n                    <ion-row class="title">Complaint#145</ion-row>\n                    <ion-row>Complaint date:12/04/18</ion-row>\n                    <ion-row>Department:BESCOM</ion-row>\n                    <ion-row>Sub:Trade Licence</ion-row>\n                    <ion-row>Comment:hello</ion-row>\n                    <ion-row>Status:under investigation</ion-row>\n                    </div>\n                </ion-col>\n            </ion-row> -->\n\n\n\n            \n\n\n            <!-- <ion-row class="space">\n                <ion-col class="schedule-data">\n                    <div class="data-item">\n                        <p class="complaint_title">Status of your registered complaints</p> \n                    </div>\n                </ion-col>\n            </ion-row> -->\n        </div>\n    </ion-content>\n\n    <ion-footer>\n        <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n    </ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/registered_complaints/reg_complaints.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]])
    ], RegComplaintsPage);
    return RegComplaintsPage;
}());

//# sourceMappingURL=reg_complaints.js.map

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connectivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Network } from '@ionic-native/network';

/*
  Generated class for the ConnectivityServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var Connectivity = (function () {
    function Connectivity(platform) {
        this.platform = platform;
        this.onDevice = this.platform.is('cordova');
    }
    Connectivity = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */]])
    ], Connectivity);
    return Connectivity;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 171:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 171;

/***/ }),

/***/ 215:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 215;

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommonService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CommonService = (function () {
    function CommonService(http) {
        this.http = http;
        //  this.baseUrl="http://192.168.1.174:8585/open/mobile";  //local
        this.baseUrl = "http://13.233.175.188:8585/open/mobile"; //server
    }
    CommonService.prototype.generateOTP = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        // let urlSearchParams = new URLSearchParams();
        // console.log("InService*********",data)
        // urlSearchParams.append('voterId', data.voterid);
        // urlSearchParams.append('mobile', data.mobile);
        // let body = urlSearchParams.toString()
        return this.http.post(this.baseUrl + "/generateOTP", data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.verifyOTP = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log(data);
        // let urlSearchParams = new URLSearchParams();
        // console.log("InService*********",data)
        // urlSearchParams.append('voterId', data.voterId);
        // urlSearchParams.append('otp', data.otp);
        // let body = urlSearchParams.toString()
        return this.http.post(this.baseUrl + "/verifyOTP", data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getComplaints = function (data) {
        console.log("this.citizenId", data);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log("InService*********", data);
        return this.http.get(this.baseUrl + "/complaintByCitizen/" + data, options_n).map(function (res) { return res.json(); });
        //instead of 4 =>"+data"
    };
    CommonService.prototype.getNotificationData = function (citizenId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "/notification/" + citizenId, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.markAsReadNotification = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseUrl + "/notificationSeen", data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getDepts = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "/departnemt", options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getSubdepts = function (data) {
        console.log("SubDept", data);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log("InService*********", data);
        return this.http.get(this.baseUrl + "/subDepartnemt/" + data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.selectIncident = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseUrl + "/complaint", data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.uploadImage = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        // headers.append('Content-Type', 'multipart/form-data');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseUrl + "/upload-image", data, options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getImage = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        // headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "/logo.jpg", options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.getNews = function (id) {
        console.log("this.stateId", id);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "/news/" + id, options_n).map(function (res) { return res.json(); });
        //instead of 4 =>"+data"
    };
    // getAllText(){
    //   var headers = new Headers()
    //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //   let options_n = new RequestOptions({ headers: headers });
    //   return this.http.get(this.baseUrl + "/getAdminSettings",options_n).map((res: Response) => res.json());
    // }
    CommonService.prototype.getData = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.baseUrl + "/getApplicationSettings", options_n).map(function (res) { return res.json(); });
    };
    CommonService.prototype.logOut = function () {
        var id = localStorage.getItem('voterId');
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        var options_n = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.baseUrl + "/logoutCitizen/" + id, options_n).map(function (res) { return res.json(); });
    };
    CommonService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], CommonService);
    return CommonService;
}());

//# sourceMappingURL=common.service.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewsModalPage = (function () {
    function NewsModalPage(nav, loadingCtrl, navParams, commonService, translate, viewCtrl) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.commonService = commonService;
        this.translate = translate;
        this.viewCtrl = viewCtrl;
        this.translate.use(localStorage.getItem('language'));
        this.news = this.navParams.get('news');
        console.log("this.news", this.news);
    }
    NewsModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    NewsModalPage.prototype.createWebLink = function (link) {
        if (link) {
            var pattern = /^((http|https|ftp):\/\/)/;
            if (!pattern.test(link)) {
                link = "http://" + link;
            }
            return link;
        }
        else {
            return "";
        }
    };
    ;
    NewsModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'news-modal',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/complaints/news-modal/news_modal.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n            <ion-buttons left>\n            <button ion-button (click)="dismiss()">\n                <ion-icon name="arrow-back" class="menu_icon"></ion-icon>\n            </button>\n        </ion-buttons>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="http://13.233.175.188:8585/open/mobile/logo.jpg">\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-row>\n        <ion-col class="news_header">{{news.header}}</ion-col>\n    </ion-row>\n    \n    <ion-row>\n        <ion-col class="news_image">\n            <img class="news_photo" src="http://13.233.175.188:8585/open/mobile/download-image/{{news.image}}">\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="news_desc">\n            <p class="p-margin">\n                {{news.details}}\n            </p>\n        </ion-col>\n    </ion-row>\n\n    <ion-row>\n        <ion-col class="news_link"><a [attr.href]="createWebLink(news.webLink)">{{createWebLink(news.webLink)}}</a></ion-col>\n    </ion-row>\n</ion-content>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/complaints/news-modal/news_modal.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */]])
    ], NewsModalPage);
    return NewsModalPage;
}());

//# sourceMappingURL=news_modal.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsPage = (function () {
    function SettingsPage(nav, loadingCtrl, translate, commonService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.commonService = commonService;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        if (localStorage.getItem("language") != undefined) {
            this.translate.use(localStorage.getItem("language"));
            this.lang = localStorage.getItem("language");
        }
        else {
            this.lang = "en";
        }
        console.log("this.lang", this.lang);
        this.getAllText();
    }
    SettingsPage.prototype.switchLanguage = function () {
        localStorage.setItem('language', this.lang);
        this.translate.use(this.lang);
    };
    SettingsPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'settings',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/settings/settings.html"*/'<ion-header class="login-header auth-header">\n        <ion-navbar>\n            <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n            <img class="logo" src="{{imageUrl}}">\n            <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n            <button ion-button menuToggle>\n                <ion-icon class="menu_icon" name="menu"></ion-icon>\n            </button>\n        </ion-navbar>       \n\n    </ion-header>\n    \n    <ion-content class="login-content auth-content">\n        <ion-list>\n            <ion-item>\n                <ion-label>{{\'Language\' | translate}}</ion-label>\n                <ion-select [(ngModel)]="lang" (ionChange)="switchLanguage()" okText="{{\'Ok\'|translate}}" cancelText="{{\'Cancel\'|translate}}">\n                    <ion-option value="en">{{\'English\' | translate}}<span *ngIf="lang != \'en\'">(English)</span></ion-option>\n                    <ion-option value="hi">{{\'Hindi\' | translate}}<span *ngIf="lang != \'en\'">(Hindi)</span></ion-option>\n                    <ion-option value="kn">{{\'Kannada\' | translate}}<span *ngIf="lang != \'en\'">(Kannada)</span></ion-option>\n                </ion-select>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n\n    <ion-footer>\n        <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n    </ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__otp_otp__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { TabsNavigationPage } from '../tabs-navigation/tabs-navigation';
// import { SignupPage } from '../signup/signup';
// import { ForgotPasswordPage } from '../forgot-password/forgot-password';

// import { FacebookLoginService } from '../facebook-login/facebook-login.service';
// import { GoogleLoginService } from '../google-login/google-login.service';
// import { TwitterLoginService } from '../twitter-login/twitter-login.service';

var LoginPage = (function () {
    // public obj = {
    //   username:"",
    //   password:"",
    //   action:"clientLogin"
    // }
    function LoginPage(navCtrl, commonService, 
        // public facebookLoginService: FacebookLoginService,
        // public googleLoginService: GoogleLoginService,
        // public twitterLoginService: TwitterLoginService,
        loadingCtrl, toastCtrl, menu) {
        // this.main_page = { component: TabsNavigationPage };
        this.navCtrl = navCtrl;
        this.commonService = commonService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.menu = menu;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.login = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            voterId: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
            mobile: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required)
        });
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menu.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    LoginPage.prototype.doLogin = function (data) {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loading.present();
        console.log("Parameters*********", data);
        this.commonService.generateOTP(data).subscribe(function (resp) {
            _this.res = resp;
            console.log("REsponce*******" + JSON.stringify(_this.res));
            _this.loading.dismissAll();
            // this.nav.setRoot(this.main_page.component);
            if (_this.res.msg == 'success') {
                // code...
                // this.storage.set('user_id',this.res.client_id);
                // localStorage.setItem('userid',this.res.client_id);
                // this.presentToast(this.res.msg);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__otp_otp__["a" /* OtpPage */], { voterId: data.voterId, mobile: _this.login.value.mobile });
            }
            else {
                _this.presentToast(_this.res.msg);
            }
            // this.navCtrl.push(LandingPage);
            //  }
        }, function (err) {
            _this.loading.dismissAll();
            //  this.presentToast(err.statusText);
            console.log('err', err);
        });
    };
    // doFacebookLogin() {
    //   this.loading = this.loadingCtrl.create();
    //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    //   // let this = this;
    //   this.facebookLoginService.getFacebookUser()
    //   .then((data) => {
    //      // user is previously logged with FB and we have his data we will let him access the app
    //     this.navCtrl.setRoot(this.main_page.component);
    //   }, (error) => {
    //     //we don't have the user data so we will ask him to log in
    //     this.facebookLoginService.doFacebookLogin()
    //     .then((res) => {
    //       this.loading.dismiss();
    //       this.navCtrl.setRoot(this.main_page.component);
    //     }, (err) => {
    //       console.log("Facebook Login error", err);
    //     });
    //   });
    // }
    // doGoogleLogin() {
    //   this.loading = this.loadingCtrl.create();
    //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    //   this.googleLoginService.trySilentLogin()
    //   .then((data) => {
    //      // user is previously logged with Google and we have his data we will let him access the app
    //     this.navCtrl.setRoot(this.main_page.component);
    //   }, (error) => {
    //     //we don't have the user data so we will ask him to log in
    //     this.googleLoginService.doGoogleLogin()
    //     .then((res) => {
    //       this.loading.dismiss();
    //       this.navCtrl.setRoot(this.main_page.component);
    //     }, (err) => {
    //       console.log("Google Login error", err);
    //     });
    //   });
    // }
    // doTwitterLogin(){
    //   this.loading = this.loadingCtrl.create();
    //   // Here we will check if the user is already logged in because we don't want to ask users to log in each time they open the app
    //   this.twitterLoginService.getTwitterUser()
    //   .then((data) => {
    //      // user is previously logged with FB and we have his data we will let him access the app
    //     this.navCtrl.setRoot(this.main_page.component);
    //   }, (error) => {
    //     //we don't have the user data so we will ask him to log in
    //     this.twitterLoginService.doTwitterLogin()
    //     .then((res) => {
    //       this.loading.dismiss();
    //       this.navCtrl.setRoot(this.main_page.component);
    //     }, (err) => {
    //       console.log("Twitter Login error", err);
    //     });
    //   });
    // }
    // goToSignup() {
    //   this.navCtrl.push(SignupPage);
    // }
    // goToForgotPassword() {
    //   this.navCtrl.push(ForgotPasswordPage);
    // }
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            dismissOnPageChange: true,
            duration: 3000
        });
        toast.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'login-page',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/login/login.html"*/'<ion-header class="login-header auth-header">\n  <ion-navbar>\n      <!-- <img class="logo" left src="http://13.233.175.188:8585/open/mobile/logo.jpg"> -->\n    <ion-title style="color: black">Sign in</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n  <ion-row>\n    <ion-col class="bjplogo">\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo1" src="{{imageUrl}}">\n    </ion-col>\n  </ion-row>\n  <!-- <p class="sampark">संपर्क</p> -->\n  <form class="login-form auth-form" [formGroup]="login" (ngSubmit)="doLogin(login.value)">\n    <ion-item>\n      <ion-label stacked class="textLabel">Your Voter ID</ion-label>\n      <ion-input type="text" formControlName="voterId" minlength="5" maxlength="15"></ion-input>\n    </ion-item>\n    <!-- <show-hide-container> -->\n      <ion-item>\n        <ion-label stacked class="textLabel">Your Mobile no.</ion-label>\n        <ion-input type="tel" formControlName="mobile" minlength="10" maxlength="10"></ion-input>\n      </ion-item>\n    <!-- </show-hide-container> -->\n    <button ion-button block class="auth-action-button login-button" type="submit" [disabled]="!login.valid">Submit</button>\n  </form>\n  <!-- <ion-row class="alt-options">\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="forgot-button" (click)="goToForgotPassword()">{{\'FORGOT_PASSWORD?\' | translate }}</button>\n    </ion-col>\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="signup-button" (click)="goToSignup()">{{\'SIGN_UP!\' | translate}}</button>\n    </ion-col>\n  </ion-row> -->\n  <!-- <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookLogin()">Log in with Facebook</button>\n  <button ion-button block class="google-auth-button" (click)="doGoogleLogin()">Log in with Google</button>\n  <button ion-button block class="twitter-auth-button" (click)="doTwitterLogin()">Log in with Twitter</button> -->\n</ion-content>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_common_service__["a" /* CommonService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__complaints_complaints__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__ = __webpack_require__(354);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OtpPage = (function () {
    function OtpPage(navCtrl, navParams, alertCtrl, loadingCtrl, toastCtrl, commonService, androidPermissions, platform, events, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.commonService = commonService;
        this.androidPermissions = androidPermissions;
        this.platform = platform;
        this.events = events;
        this.menu = menu;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.voterId = this.navParams.get('voterId');
        this.mobile = this.navParams.get('mobile');
        console.log("this.voterId", this.voterId);
        console.log("this.mobile", this.mobile);
        // this.form = new FormGroup({
        //   otp1: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
        //   otp2: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
        //   otp3: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)]),
        //   otp4: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.minLength(1)])
        // });
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({
            otp: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required),
        });
        if (this.platform.is('ios')) {
            this.deviceType = "ios";
        }
        else if (this.platform.is('android')) {
            this.deviceType = "android";
        }
    }
    OtpPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(false, 'menu1');
    };
    OtpPage.prototype.ionViewWillLeave = function () {
        // Don't forget to return the swipe to normal, otherwise 
        // the rest of the pages won't be able to swipe to open menu
        this.menu.swipeEnable(true);
        // If you have more than one side menu, use the id like below
        // this.menu.swipeEnable(true, 'menu1');
    };
    OtpPage.prototype.ionViewWillEnter = function () {
        // setTimeout(() => {
        //   this.otp1.setFocus();
        // }, 750);
        // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
        //   success => console.log('Permission granted'),
        // err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
        // );
        // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
    };
    // ReadListSMS()
    // {
    // this.platform.ready().then((readySource) => {
    // let filter = {
    //       box : 'inbox', // 'inbox' (default), 'sent', 'draft'
    //       indexFrom : 0, // start from index 0
    //       maxCount : 10, // count of SMS to return each time
    //             };
    //       if(SMS) SMS.listSMS(filter, (ListSms)=>{
    //           console.log("Sms",ListSms);
    //           },
    //           Error=>{
    //           console.log('error list sms: ' + Error);
    //           });
    //     });
    // }
    // ionViewDidEnter()
    // {
    // this.menu.swipeEnable(false);
    // this.platform.ready().then((readySource) => {
    // if(SMS) SMS.startWatch(()=>{
    //         console.log('watching started');
    //       }, Error=>{
    //       console.log('failed to start watching');
    //   });
    //   document.addEventListener('onSMSArrive', (e:any)=>{
    //       SMS.stopWatch();
    //       var sms = e.data;
    //       console.log("sms",sms);
    //       var smsAdd = sms.address;
    //         if(smsAdd.substr(smsAdd.length-6,6) == 'SAMPRK'){
    //           this.message = sms.body;
    //           this.form.setValue({otp4: this.message[this.message.length-1],
    //                               otp3: this.message[this.message.length-2],
    //                               otp2: this.message[this.message.length-3],
    //                               otp1: this.message[this.message.length-4] });
    //           console.log("this.form",this.form);
    //           this.submit();
    //         }   
    //       });
    //     });
    // }
    OtpPage.prototype.submit = function () {
        var _this = this;
        var data = {};
        // data['phone'] = this.mobile;
        // data['otp'] = this.form.value.otp1 + this.form.value.otp2 + this.form.value.otp3 + this.form.value.otp4;
        data['otp'] = this.form.value.otp;
        if (data['otp'].length != 4) {
            this.presentToast('Invalid OTP');
            return false;
        }
        data['mobile'] = this.mobile;
        data['voterId'] = this.voterId;
        data['deviceId'] = localStorage.getItem('deviceId');
        data['deviceType'] = this.deviceType;
        this.loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loading.present();
        console.log("Parameters*********" + data);
        this.commonService.verifyOTP(data).subscribe(function (data) {
            _this.res = data;
            console.log("REsponce*******" + JSON.stringify(_this.res));
            _this.loading.dismissAll();
            // this.nav.setRoot(this.main_page.component);
            if (_this.res.msg == 'success') {
                // code...
                // this.storage.set('user_id',this.res.client_id);
                // localStorage.setItem('userid',this.res.client_id);
                _this.stateId = _this.res.citizen.booth.ward.assemblyConstituency.parliamentaryConstituency.district.stateAssembly.id;
                localStorage.setItem('voterId', _this.voterId);
                localStorage.setItem('citizenId', _this.res.citizen.id);
                localStorage.setItem('stateId', _this.stateId);
                localStorage.setItem('citizen', JSON.stringify(_this.res.citizen));
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__complaints_complaints__["a" /* ComplaintsPage */]);
            }
            else {
                _this.presentToast(_this.res.msg);
            }
            // this.navCtrl.push(LandingPage);
            //  }
        }, function (err) {
            _this.loading.dismissAll();
            //  this.presentToast(err.statusText);
            console.log('err', err);
        });
        // this.doLogin(data);
    };
    OtpPage.prototype.ReSendOTP = function () {
        var _this = this;
        var data = {};
        this.loading = this.loadingCtrl.create({
            content: "Loading...",
        });
        this.loading.present();
        data['mobile'] = this.mobile;
        data['voterId'] = this.voterId;
        console.log("Parameters*********", data);
        this.commonService.generateOTP(data).subscribe(function (resp) {
            _this.res = resp;
            console.log("REsponce*******" + JSON.stringify(_this.res));
            _this.loading.dismissAll();
            if (_this.res.msg == 'success') {
                _this.presentToast("Request for OTP initiated");
                // this.navCtrl.push(OtpPage, { voterId: data.voterId, mobile: this.login.value.mobile });
            }
            else {
                _this.presentToast(_this.res.msg);
            }
        }, function (err) {
            _this.loading.dismissAll();
            //  this.presentToast(err.statusText);
            console.log('err', err);
        });
    };
    OtpPage.prototype.next = function (el, value) {
        console.log("this.form.value[value]", this.form.value[value], value);
        if (this.form.value[value].length == 0) {
            //console.log("value===1", this.form.value.otp1.length);
            //console.log("value===2", this.form.value.otp2);
        }
        else {
            el.setFocus();
            //console.log("else value===1", this.form.value.otp1.length);
            //console.log("esle alue===2", this.form.value.otp2.length);
        }
    };
    OtpPage.prototype.keyPress = function (event) {
        var pattern = /[0-9\+\-\ ]/;
        var inputChar = String.fromCharCode(event.charCode);
        if (!inputChar) {
            return false;
        }
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    };
    OtpPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            position: 'bottom',
            dismissOnPageChange: true,
            duration: 3000
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('otp1'),
        __metadata("design:type", Object)
    ], OtpPage.prototype, "otp1", void 0);
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-otp',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/otp/otp.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n      <!-- <img class="logo" src="http://13.233.175.188:8585/open/mobile/logo.jpg"> -->\n      <ion-title>Verify OTP</ion-title>\n    </ion-navbar>\n  </ion-header>\n<ion-content class="login-content auth-content" padding>\n    <ion-row>\n    <ion-col class="bjplogo">\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo1" src="{{imageUrl}}">\n    </ion-col>\n    </ion-row>\n<form [formGroup]="form" (ngSubmit)="submit(form.value)">\n    <ion-label stacked>Enter OTP</ion-label>\n    <ion-item class="input-border" margin-bottom no-padding>\n      <ion-input type="tel" placeholder="Enter OTP" formControlName="otp" maxlength="4" pattern="[0-9]{4}"></ion-input>\n      <!-- <table style="margin: 0px auto;">\n        <tr>\n          <td>\n            <ion-input type="password" (keypress)="keyPress($event)" formControlName="otp1" #otp1 class="otp_input" maxlength=\'1\' (keyup)="next(otp2, \'otp1\')">\n            </ion-input>\n          </td>\n          <td>\n            <ion-input type="password" (keypress)="keyPress($event)" formControlName="otp2" #otp2 class="otp_input" maxlength=\'1\' (keyup)="next(otp3, \'otp2\')">\n            </ion-input>\n          </td>\n          <td>\n            <ion-input type="password" (keypress)="keyPress($event)" formControlName="otp3" #otp3 class="otp_input" maxlength=\'1\' (keyup)="next(otp4, \'otp3\')">\n            </ion-input>\n          </td>\n          <td>\n            <ion-input type="password" (keypress)="keyPress($event)" formControlName="otp4" #otp4 class="otp_input" maxlength=\'1\' (keyup)="submit()">\n            </ion-input>\n          </td>\n        </tr>\n      </table> -->\n    </ion-item>\n    <button ion-button block type="submit"[disabled]="!form.valid" class="otp_btn">\n      Verify OTP\n    </button>\n\n    <ion-row>\n      <ion-col class="btn-resend">\n        <span (click)="ReSendOTP()">Resend OTP</span>\n      </ion-col>\n    </ion-row>\n    \n\n  </form>\n</ion-content>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/otp/otp.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* MenuController */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepartmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subdepartment_subdepartment__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DepartmentPage = (function () {
    function DepartmentPage(nav, loadingCtrl, commonService, translate) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.commonService = commonService;
        this.translate = translate;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.translate.use(localStorage.getItem('language'));
        console.log(localStorage.getItem('language'));
        this.getAllDepts();
        this.getAllText();
    }
    DepartmentPage.prototype.next = function (d) {
        this.deptId = d.id;
        console.log("d", d);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__subdepartment_subdepartment__["a" /* SubdepartmentPage */], { selctedDept: d });
    };
    DepartmentPage.prototype.getAllDepts = function () {
        var _this = this;
        this.commonService.getDepts().subscribe(function (res) {
            console.log("res", res);
            _this.depts = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    DepartmentPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getAllDepts();
            _this.getAllText();
            refresher.complete();
        }, 2000);
    };
    DepartmentPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    DepartmentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'department',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/department/department.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n        <button ion-button menuToggle>\n            <ion-icon class="menu_icon" name="menu"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <div class="buttons">\n        <h2 class="head">{{\'Select Department\' | translate}}</h2>\n    </div>\n    <ion-card *ngFor="let d of depts" (click)="next(d)" [ngClass]="(deptId==d.id)?\'active\':\'\'">\n        <ion-card-content class="card_content_padding">\n            <ion-row class="record" >\n                <ion-col class="logo_col" col-3>\n                    <img class="dept_logo" src="assets/images/Smartneta/councillogo.png">\n                </ion-col>\n                <ion-col class="dept" col-9>\n                    {{d.name}}\n                </ion-col>\n            </ion-row>   \n        </ion-card-content>\n    </ion-card>\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/department/department.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], DepartmentPage);
    return DepartmentPage;
}());

//# sourceMappingURL=department.js.map

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubdepartmentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_incident_reg_incident__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SubdepartmentPage = (function () {
    function SubdepartmentPage(nav, loadingCtrl, navParams, commonService, translate) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.commonService = commonService;
        this.translate = translate;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.translate.use(localStorage.getItem('language'));
        this.selectedDept = this.navParams.get('selctedDept');
        console.log("this.selectedDept", this.selectedDept);
        this.getAllSubDepts();
        this.getAllText();
    }
    SubdepartmentPage.prototype.next = function (sd) {
        this.subDeptId = sd.id;
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__register_incident_reg_incident__["a" /* RegisterIncident */], { selectedSubDept: sd });
        // this.nav.setRoot(RegisterIncident,{selectedSubDept:sd});
    };
    SubdepartmentPage.prototype.getAllSubDepts = function () {
        var _this = this;
        this.commonService.getSubdepts(this.selectedDept.id).subscribe(function (res) {
            console.log("res", res);
            _this.subDepts = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    SubdepartmentPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getAllSubDepts();
            _this.getAllText();
            refresher.complete();
        }, 2000);
    };
    SubdepartmentPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    SubdepartmentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'subdepartment',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/subdepartment/subdepartment.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n        <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n        <button ion-button menuToggle>\n            <ion-icon class="menu_icon" name="menu"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <div class="buttons">\n        <h2 class="head">{{\'Select Sub-department\' | translate}}</h2>\n    </div>\n    <ion-card class="page_title">\n        <ion-card-content class="card_content_padding">\n            <ion-row style="display: table">\n                <ion-col col-4 class="deptLogo_col">\n                    <img class="dept_logo" src="assets/images/Smartneta/councillogo.png">\n                </ion-col>\n                <ion-col class="dept">\n                    {{selectedDept.name}}\n                </ion-col>\n            </ion-row>   \n        </ion-card-content>\n    </ion-card>\n\n    <div class="subdept"> \n    <ion-card (click)="next(sd)" *ngFor="let sd of subDepts" [ngClass]="(subDeptId==sd.id)?\'active\':\'\'" >\n        <ion-card-content class="card_content_padding">\n            <ion-row>\n                <!-- <ion-col>\n                    <img class="dept_logo" src="assets/images/Smartneta/bescom-squarelogo.png">\n                </ion-col> -->\n                <ion-col class="dept1">\n                    {{sd.name}}\n                </ion-col>\n            </ion-row>   \n        </ion-card-content>\n    </ion-card>\n    <!-- <ion-card>\n        <ion-card-content class="card_content_padding">\n            <ion-row>\n                <ion-col class="dept1">\n                    Trade license\n                </ion-col>\n            </ion-row>   \n        </ion-card-content>\n    </ion-card>\n    <ion-card>\n        <ion-card-content class="card_content_padding">\n            <ion-row>\n                <ion-col class="dept1">\n                    Tree cutting\n                </ion-col>\n            </ion-row>\n        </ion-card-content>\n    </ion-card>\n    <ion-card>\n        <ion-card-content class="card_content_padding">\n            <ion-row>\n                <ion-col class="dept1">\n                    Death certificate\n                </ion-col>\n            </ion-row>   \n        </ion-card-content>\n    </ion-card> -->\n</div>\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/subdepartment/subdepartment.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], SubdepartmentPage);
    return SubdepartmentPage;
}());

//# sourceMappingURL=subdepartment.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterIncident; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registered_complaints_reg_complaints__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__complaints_complaints__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__location_select_location_select__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import{ ContactPartners } from '../contact_partners/contact_partners';









// import { ImageLoader,ImageLoaderConfig } from 'ionic-image-loader';
var RegisterIncident = (function () {
    function RegisterIncident(nav, loadingCtrl, navParams, commonService, transfer, camera, toastCtrl, actionSheetCtrl, modalCtrl, file, http, translate) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.commonService = commonService;
        this.transfer = transfer;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.file = file;
        this.http = http;
        this.translate = translate;
        this.image = null;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.obj = {
            citizen: {
                voterId: ""
            },
            stateAssembly: "",
            image: "",
            compliantSource: "Mobile",
            complaint: "",
            latitude: "",
            longitude: "",
            subDepartment: {
                id: null
            }
        };
        this.translate.use(localStorage.getItem('language'));
        this.selectedSubDept = this.navParams.get('selectedSubDept');
        console.log("this.selectedSubDept", this.selectedSubDept);
        this.citizen = JSON.parse(localStorage.getItem('citizen'));
        console.log("this.citizen", this.citizen);
        console.log("voterId", localStorage.getItem("voterId"));
        this.getAllText();
    }
    // next(){
    //     this.nav.push(ContactPartners);
    // }
    RegisterIncident.prototype.uploadFile = function (imageFileUri) {
        var _this = this;
        // let loader = this.loadingCtrl.create({
        //   content: "Uploading..."
        // });
        // loader.present();
        this.file.resolveLocalFilesystemUrl(imageFileUri)
            .then(function (entry) { return entry.file(function (file) { return _this.readFile(file); }); })
            .catch(function (err) { return console.log(err); });
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
    };
    RegisterIncident.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            console.log("file108", file);
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], { type: file.type });
            formData.append('file', imgBlob, file.name);
            _this.temp = formData;
        };
        reader.readAsArrayBuffer(file);
    };
    RegisterIncident.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: this.translate.instant('Select Image Source'),
            buttons: [
                {
                    text: this.translate.instant('Load from Library'),
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: this.translate.instant('Use Camera'),
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: this.translate.instant('Cancel'),
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    RegisterIncident.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: false,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.image = imageData;
            _this.uploadFile(imageData);
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    RegisterIncident.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    RegisterIncident.prototype.launchLocationPage = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__location_select_location_select__["a" /* LocationSelect */]);
        modal.onDidDismiss(function (location) {
            console.log(location);
            _this.obj.latitude = location.lat;
            _this.obj.longitude = location.lng;
        });
        modal.present();
    };
    RegisterIncident.prototype.createIncident = function () {
        var _this = this;
        if (this.temp) {
            this.loading = this.loadingCtrl.create({
                content: "Loading...",
            });
            this.loading.present();
            this.commonService.uploadImage(this.temp).subscribe(function (res) {
                console.log("res", res);
                if (res.code == '201') {
                    _this.obj.image = res.data;
                    // this.presentToast(res.Message);
                    _this.saveComplaint();
                }
                else {
                    _this.presentToast(res.Message);
                }
            });
        }
        else {
            this.loading = this.loadingCtrl.create({
                content: "Loading...",
            });
            this.loading.present();
            this.saveComplaint();
        }
    };
    RegisterIncident.prototype.saveComplaint = function () {
        var _this = this;
        this.obj.citizen.voterId = localStorage.getItem('voterId');
        this.obj.stateAssembly = this.citizen.booth.ward.assemblyConstituency.parliamentaryConstituency.district.stateAssembly;
        // this.obj.latitude = "18.5083";
        // this.obj.longitude = "73.9101";
        this.obj.subDepartment.id = this.selectedSubDept.id;
        console.log("obj", this.obj);
        this.commonService.selectIncident(this.obj).subscribe(function (resp) {
            _this.res = resp;
            console.log("REsponce*******" + JSON.stringify(_this.res));
            _this.loading.dismissAll();
            if (_this.res.data) {
                _this.presentToast(_this.translate.instant('register_success'));
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__registered_complaints_reg_complaints__["a" /* RegComplaintsPage */]);
            }
            else {
                _this.presentToast(_this.translate.instant('register_fail'));
            }
        }, function (err) {
            _this.loading.dismissAll();
            console.log('err', err);
        });
    };
    RegisterIncident.prototype.cancelIncident = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__complaints_complaints__["a" /* ComplaintsPage */]);
    };
    RegisterIncident.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getAllText();
            _this.temp = null;
            _this.image = null;
            _this.obj.complaint = "";
            _this.obj.latitude = "";
            _this.obj.longitude = "";
            refresher.complete();
        }, 2000);
    };
    RegisterIncident.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    RegisterIncident = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'reg-incident',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/register_incident/reg_incident.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n        <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n        <button ion-button menuToggle>\n            <ion-icon class="menu_icon" name="menu"></ion-icon>\n        </button>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n        <ion-refresher (ionRefresh)="doRefresh($event)">\n            <ion-refresher-content></ion-refresher-content>\n        </ion-refresher>\n    <div>\n        <h3 class="head">{{\'Register my incident\' | translate}}</h3>\n    </div>    \n    <!-- <ion-row>\n        <ion-col col-7 class="upload_area">\n                <ion-icon name="camera"></ion-icon>\n        </ion-col>\n        <ion-col col-5 class="buttons">\n            <div>\n                <button ion-button class="save_button">Submit</button>\n            </div>\n            <div>\n                <button ion-button color="secondary" class="edit_button">Edit</button>\n            </div>\n        </ion-col>\n    </ion-row> -->\n    <ion-row class="user-main-data-row">\n        <ion-col col-3></ion-col>\n        <ion-col col-6 no-padding style="text-align: center;">\n          <!-- <preload-image class="user-image" [ratio]="{w:1, h:1}" [(src)]="assets/images/Smartneta/councillogo.png"></preload-image> -->\n          <!-- <img class="user-image" *ngIf="!base64Image" src="assets/images/Smartneta/upload.png" (click)="presentActionSheet()"> -->\n          <!-- <img class="user-image" [src]="base64Image" *ngIf="base64Image" (click)="presentActionSheet()" /> -->\n          <img class="user-image" [src]="image || \'assets/images/Smartneta/upload.png\'" (click)="presentActionSheet()">\n          <!-- <ion-icon name="camera"></ion-icon> -->\n          <!-- <ion-icon class="user-image" name="person"></ion-icon> -->\n          <ion-row class="">\n              <ion-col>{{\'upload photo\' | translate}}</ion-col>\n          </ion-row>\n        </ion-col>\n        <ion-col col-3></ion-col>\n        <!-- <ion-col no-padding>\n          <ion-row class="social-presence-row">\n            <ion-col no-padding>\n                <button ion-button block small>\n                    Submit\n                </button>\n            </ion-col>\n          </ion-row>\n          <ion-row class="profile-action-row">\n            <ion-col no-padding>\n              <button ion-button block small>\n                Edit\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-col> -->\n    </ion-row>\n    <!-- <ion-item> -->\n        <ion-label stacked class="comments">{{\'Your comments\' | translate}}</ion-label>\n        <ion-textarea [(ngModel)]="obj.complaint"></ion-textarea>\n    <!-- </ion-item> -->\n    <div class="map_area" (click)="launchLocationPage()">\n        {{\'select_location\' | translate}}\n    </div>\n    <ion-row>\n        <ion-col></ion-col>\n        <ion-col>\n            <button ion-button class="save_button1" (click)="createIncident()">{{\'Save\' | translate}}</button>\n        </ion-col>\n        <ion-col>\n            <button ion-button color="secondary" (click)="cancelIncident()">{{\'Cancel\' | translate}}</button>\n        </ion-col>\n        <ion-col></ion-col>\n    </ion-row>\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/register_incident/reg_incident.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */]])
    ], RegisterIncident);
    return RegisterIncident;
}());

//# sourceMappingURL=reg_incident.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationSelect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_connectivity_service_connectivity_service__ = __webpack_require__(161);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LocationSelect = (function () {
    function LocationSelect(navCtrl, connectivityService, zone, maps, platform, geolocation, viewCtrl) {
        this.navCtrl = navCtrl;
        this.connectivityService = connectivityService;
        this.zone = zone;
        this.maps = maps;
        this.platform = platform;
        this.geolocation = geolocation;
        this.viewCtrl = viewCtrl;
        this.query = '';
        this.places = [];
        this.searchDisabled = true;
        this.saveDisabled = false;
    }
    LocationSelect.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("ionViewDidLoad Location Select");
        // debugger
        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
            _this.autocompleteService = new google.maps.places.AutocompleteService();
            _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
            console.log("this.placesService", _this.placesService);
            _this.searchDisabled = false;
        });
        console.log(this.maps.cur_lat);
        console.log(this.maps.cur_lng);
    };
    LocationSelect.prototype.selectPlace = function (place) {
        var _this = this;
        console.log("place", place);
        this.query = place.description;
        //debugger;
        this.places = [];
        var location = {
            lat: null,
            lng: null,
            name: place.name
        };
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            //  debugger;
            _this.zone.run(function () {
                location.name = details.name;
                location.lat = details.geometry.location.lat();
                location.lng = details.geometry.location.lng();
                // this.saveDisabled = false;
                _this.maps.map.setCenter({ lat: location.lat, lng: location.lng });
                _this.location = location;
            });
            _this.maps.tessetMarker(location.lat, location.lng);
        });
    };
    LocationSelect.prototype.search = function (query) {
        console.log("query", query);
        this.maps.getLatLngFromAddress(query);
    };
    LocationSelect.prototype.searchPlace = function () {
        // this.saveDisabled = true;
        var _this = this;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    LocationSelect.prototype.save = function () {
        if (this.location != undefined) {
            this.viewCtrl.dismiss(this.location);
        }
        else {
            this.location = {
                lat: this.maps.cur_lat,
                lng: this.maps.cur_lng,
            };
            this.viewCtrl.dismiss(this.location);
        }
    };
    LocationSelect.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], LocationSelect.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["ElementRef"])
    ], LocationSelect.prototype, "pleaseConnect", void 0);
    LocationSelect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-location-select',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/location-select/location-select.html"*/'<!--\n  Generated template for the LocationSelectPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>LocationSelect</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<!-- <ion-content padding>\n\n</ion-content> -->\n\n<ion-header>\n  <ion-navbar color="primary">\n      <ion-buttons left>\n          <button ion-button (click)="close()">{{\'Cancel\' | translate}}</button>\n      </ion-buttons>\n      <!-- <ion-buttons >\n        <button ion-button (click)="search(query)">Search</button>\n    </ion-buttons> -->\n      <ion-buttons right>\n          <button [disabled]="saveDisabled" ion-button (click)="save()">{{\'Save\' | translate}}</button>\n      </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar>\n      <ion-searchbar [(ngModel)]="query" (ionInput)="searchPlace()"></ion-searchbar>\n  </ion-toolbar>\n\n  <ion-list>\n      <ion-item *ngFor="let place of places" (touchstart)="selectPlace(place)">{{place.description}}</ion-item>\n  </ion-list>\n\n</ion-header>\n\n<ion-content>\n\n  <div #pleaseConnect id="please-connect">\n      <p>{{\'Please connect to the Internet\' | translate}}</p>\n  </div>\n\n  <div #map id="map">\n      <ion-spinner></ion-spinner>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/location-select/location-select.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_connectivity_service_connectivity_service__["a" /* Connectivity */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_3__providers_google_maps_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* ViewController */]])
    ], LocationSelect);
    return LocationSelect;
}());

//# sourceMappingURL=location-select.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectivity_service_connectivity_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(91);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GoogleMapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  Inner HTML Error
  https://stackoverflow.com/questions/49466226/what-is-the-solution-of-erro-that-cannot-read-property-innerhtml-of-undefined
*/
var GoogleMaps = (function () {
    function GoogleMaps(connectivityService, geolocation) {
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
        // AJ's
        // apiKey: string = "AIzaSyDs0yrw9_9JxzS175LUlyMjw9Ugyr2vT7g";
        // apiKey: string = "AIzaSyC9AONAX0_mENZwS9WtlFskMWcIFVSAXGE";
        this.apiKey = "AIzaSyB8QzRpweAqRz8NHyVUS2QhxhnS_9WPTn4";
        this.markers = [];
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                // if(this.connectivityService.isOnline()){
                window['mapInit'] = function () {
                    _this.initMap().then(function () {
                        _this.enableMap();
                        resolve(true);
                    });
                };
                var script = document.createElement("script");
                script.id = "googleMaps";
                if (_this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
                }
                else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }
                document.body.appendChild(script);
                // }
            }
            else {
                // if(this.connectivityService.isOnline()){
                _this.initMap().then(function () {
                    _this.enableMap();
                    resolve(true);
                });
                // }
                // else {
                //   this.disableMap();
                //   resolve(true);
                // }
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            _this.options = {
                enableHighAccuracy: true
            };
            _this.geolocation.getCurrentPosition(_this.options).then(function (position) {
                console.log("position", position);
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                _this.cur_lat = position.coords.latitude;
                _this.cur_lng = position.coords.longitude;
                console.log("latLng", latLng);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                //debugger;
                _this.map = new google.maps.Map(_this.mapElement, mapOptions);
                _this.addMarker();
                resolve(true);
            });
        });
    };
    GoogleMaps.prototype.getLatLngFromAddress = function (place) {
        var me = this;
        var geocoder = new google.maps.Geocoder();
        var latitude;
        var longitude;
        geocoder.geocode({ 'address': place }, function (results, status) {
            //this.geolocation.getCurrentPosition(this.options).then((position) => {
            if (status == google.maps.GeocoderStatus.OK) {
                latitude = results[0].geometry.location.lat();
                longitude = results[0].geometry.location.lng();
                console.log("latitude", latitude);
                console.log("longitude", longitude);
                me.tessetMarker(latitude, longitude);
            }
        });
        // console.log("latitude",latitude);
        // console.log("longitude",longitude);
        // }
    };
    GoogleMaps.prototype.tessetMarker = function (latitude, longitude) {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
        this.markers = [];
        var latLng = new google.maps.LatLng(latitude, longitude);
        var marker = new google.maps.Marker({
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
    };
    GoogleMaps.prototype.addMarker = function () {
        var marker = new google.maps.Marker({
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
    };
    // createMarker(){
    //   let markeraOptions: MarkerOptions =
    // }
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        //this.connectivityService.watchOnline().subscribe(() => {
        var _this = this;
        setTimeout(function () {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                _this.loadGoogleMaps();
            }
            else {
                if (!_this.mapInitialised) {
                    _this.initMap();
                }
                _this.enableMap();
            }
        }, 2000);
        // });
        // this.connectivityService.watchOffline().subscribe(() => {
        //   this.disableMap();
        // });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__connectivity_service_connectivity_service__["a" /* Connectivity */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactUsPage = (function () {
    function ContactUsPage(nav, loadingCtrl, navParams, translate, modalCtrl, commonService) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.commonService = commonService;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.translate.use(localStorage.getItem('language'));
        this.getAllText();
    }
    ContactUsPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    ContactUsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getAllText();
            refresher.complete();
        }, 2000);
    };
    ContactUsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'contact-us',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/contact-us/contact_us.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <ion-buttons left>\n            <button ion-button menuToggle>\n                <ion-icon name="menu" class="menu_icon"></ion-icon>\n            </button>\n        </ion-buttons>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-row>\n        <ion-col class="about">\n            <h3 style="margin-bottom: 0;">{{\'about\' | translate}}</h3>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="description" *ngIf="descText != undefined">\n            {{descText.about}}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="about">\n            <h3 style="margin: 0;">{{\'Contact\' | translate}}</h3>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="description" *ngIf="descText != undefined">\n                {{descText.address1}}<br /><br />\n                {{descText.address2}}<br /><br />\n                Phone :{{descText.contact}}\n            <!-- India Office<br />\n            579, 32nd D Cross Rd,<br />\n            4th Block, Jayanagar,<br     />\n            Bengaluru 560011<br />\n            Mobile - +919844202861<br /><br />\n\n            Australia Office<br />\n            No. 25, Mildred avenue<br />\n            Hornsby,Sydney - 2077<br />\n            Phone :+610452356478 -->\n           \n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="about">\n            <h3 style="margin: 0;">{{\'Email\' | translate}}</h3>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="description" *ngIf="descText != undefined">\n                {{descText.email}}\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="about">\n            <h3 style="margin: 0;">{{\'Website\' | translate}}</h3>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="description" *ngIf="descText != undefined">\n            <a href={{descText.website}}><b>{{descText.website}}</b></a>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col style="padding: 16px" *ngIf="descText != undefined">\n            <a href={{descText.facebookLink}} class="fa fa-facebook"></a>\n            <a href={{descText.twitterLink}} class="fa fa-twitter"></a>\n        </ion-col>\n    </ion-row>\n\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/contact-us/contact_us.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */]])
    ], ContactUsPage);
    return ContactUsPage;
}());

//# sourceMappingURL=contact_us.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoogleMap = (function () {
    function GoogleMap(_elementRef) {
        this._elementRef = _elementRef;
        this._mapOptions = {
            zoom: 15
        };
        this.$mapReady = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this._mapIdledOnce = false;
    }
    Object.defineProperty(GoogleMap.prototype, "options", {
        set: function (val) {
            if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val)) {
                this._mapOptions = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    GoogleMap.prototype.ngOnInit = function () {
        this.initMap();
    };
    GoogleMap.prototype.initMap = function () {
        var _this = this;
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this._mapOptions);
        // Workarround for init method: try to catch the first idel event after the map cretion (this._mapIdledOnce). The following idle events don't matter.
        var _ready_listener = this._map.addListener('idle', function () {
            console.log("mapReady - IDLE");
            if (!_this._mapIdledOnce) {
                _this.$mapReady.emit(_this._map);
                _this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], GoogleMap.prototype, "options", null);
    GoogleMap = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'google-map',
            template: ''
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], GoogleMap);
    return GoogleMap;
}());

//# sourceMappingURL=google-map.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GoogleMapsService = (function () {
    // There are some issues with async observers (https://gist.github.com/endash/1f961830d0c5b744598a)
    //    - That's why we need to use ngZones
    // Here's another post explaining the issue (http://stackoverflow.com/a/38100262/1116959)
    //    - Seems that google.maps API is not patched by Angular's zone
    function GoogleMapsService(zone) {
        this.zone = zone;
        this._AutocompleteService = new google.maps.places.AutocompleteService();
        this._Geocoder = new google.maps.Geocoder;
        // As we are already using a map, we don't need to pass the map element to the PlacesServices (https://groups.google.com/forum/#!topic/google-maps-js-api-v3/QJ67k-ATuFg)
        this._PlacesService = new google.maps.places.PlacesService(document.createElement("div"));
        this._DirectionsService = new google.maps.DirectionsService;
        this._DistanceMatrixService = new google.maps.DistanceMatrixService;
    }
    // Caveat:  As we are using Observable.create don't forget a well-formed finite Observable must attempt to call
    //          either the observer’s onCompleted method exactly once or its onError method exactly once, and must not
    //          thereafter attempt to call any of the observer’s other methods.
    //    - http://reactivex.io/documentation/operators/create.html
    //    - http://stackoverflow.com/a/38376519/1116959
    // https://developers.google.com/maps/documentation/javascript/reference#AutocompletePrediction
    GoogleMapsService.prototype.getPlacePredictions = function (query) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._AutocompleteService.getPlacePredictions({ input: query }, function (places_predictions, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    _this.zone.run(function () {
                        observer.next([]);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.next(places_predictions);
                        observer.complete();
                    });
                }
            });
        });
    };
    GoogleMapsService.prototype.geocodePlace = function (placeId) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._Geocoder.geocode({ 'placeId': placeId }, function (results, status) {
                if (status.toString() === 'OK') {
                    if (results[0]) {
                        _this.zone.run(function () {
                            observer.next(results[0].geometry.location);
                            observer.complete();
                        });
                    }
                    else {
                        _this.zone.run(function () {
                            observer.error(new Error("no results"));
                        });
                    }
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error"));
                    });
                }
            });
        });
    };
    // https://developers.google.com/maps/documentation/javascript/reference#PlaceResult
    GoogleMapsService.prototype.getPlacesNearby = function (location) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._PlacesService.nearbySearch({
                location: location,
                radius: 500,
                types: ['restaurant']
            }, function (results, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    _this.zone.run(function () {
                        observer.next([]);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.next(results);
                        observer.complete();
                    });
                }
            });
        });
    };
    // https://developers.google.com/maps/documentation/javascript/reference#DirectionsResult
    GoogleMapsService.prototype.getDirections = function (origin, destination) {
        var _this = this;
        var _origin = {
            location: origin
        }, _destination = {
            location: destination
        }, route_query = {
            origin: _origin,
            destination: _destination,
            travelMode: google.maps.TravelMode.WALKING
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._DirectionsService.route(route_query, function (route, status) {
                if (status.toString() === 'OK') {
                    _this.zone.run(function () {
                        // Yield a single value and complete
                        observer.next(route);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error due to " + status));
                    });
                }
            });
        });
    };
    GoogleMapsService.prototype.getDistanceMatrix = function (origin, destination) {
        var _this = this;
        var _origin = {
            location: origin
        }, _destination = {
            location: destination
        }, distance_query = {
            origins: [_origin],
            destinations: [_destination],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this._DistanceMatrixService.getDistanceMatrix(distance_query, function (distance, status) {
                if (status.toString() === 'OK') {
                    _this.zone.run(function () {
                        // Yield a single value and complete
                        observer.next(distance);
                        observer.complete();
                    });
                }
                else {
                    _this.zone.run(function () {
                        observer.error(new Error("error due to " + status));
                    });
                }
            });
        });
    };
    GoogleMapsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], GoogleMapsService);
    return GoogleMapsService;
}());

//# sourceMappingURL=maps.service.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowHideInput = (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = 'password';
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])(),
        __metadata("design:type", String)
    ], ShowHideInput.prototype, "type", void 0);
    ShowHideInput = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[show-hide-input]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], ShowHideInput);
    return ShowHideInput;
}());

//# sourceMappingURL=show-hide-input.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(374);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(411);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common_http__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_notifications_notifications__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_preload_image_preload_image__ = __webpack_require__(703);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_background_image_background_image__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_show_hide_password_show_hide_container__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_show_hide_password_show_hide_input__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_color_radio_color_radio__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_counter_input_counter_input__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_rating_rating__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_google_map_google_map__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_video_player_video_player_module__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_validators_validators_module__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_maps_maps_service__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_language_language_service__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_keyboard__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_file_transfer__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_file__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__providers_connectivity_service_connectivity_service__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_google_maps_google_maps__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_push__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_android_permissions__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_otp_otp__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_complaints_complaints__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_registered_complaints_reg_complaints__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_department_department__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_subdepartment_subdepartment__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_register_incident_reg_incident__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_location_select_location_select__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_complaints_news_modal_news_modal__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_contact_us_contact_us__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








//pages
// import { ListingPage } from '../pages/listing/listing';




// import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
// import { WalkthroughPage } from '../pages/walkthrough/walkthrough';
// import { SignupPage } from '../pages/signup/signup';
// import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
// import { SchedulePage } from '../pages/schedule/schedule';
// import { List1Page } from '../pages/list-1/list-1';
// import { List2Page } from '../pages/list-2/list-2';
// import { GridPage } from '../pages/grid/grid';
// import { FiltersPage } from '../pages/filters/filters';
// import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
// import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
// import { FormValidationsPage } from '../pages/form-validations/form-validations';
//custom components










//services
// import { ListingService } from '../pages/listing/listing.service';
// import { List1Service } from '../pages/list-1/list-1.service';
// import { List2Service } from '../pages/list-2/list-2.service';
// import { ScheduleService } from '../pages/schedule/schedule.service';



// Ionic Native Plugins












//Smartneta






// import{ ContactPartners } from '../pages/contact_partners/contact_partners';



function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_4__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */],
                // ListingPage,
                // TabsNavigationPage,
                // WalkthroughPage,
                // SignupPage,
                // ForgotPasswordPage,
                // SchedulePage,
                // List1Page,
                // List2Page,
                // GridPage,
                // FiltersPage,
                // TermsOfServicePage,
                // PrivacyPolicyPage,
                // FormValidationsPage,
                //custom components
                __WEBPACK_IMPORTED_MODULE_12__components_preload_image_preload_image__["a" /* PreloadImage */],
                __WEBPACK_IMPORTED_MODULE_13__components_background_image_background_image__["a" /* BackgroundImage */],
                __WEBPACK_IMPORTED_MODULE_14__components_show_hide_password_show_hide_container__["a" /* ShowHideContainer */],
                __WEBPACK_IMPORTED_MODULE_15__components_show_hide_password_show_hide_input__["a" /* ShowHideInput */],
                __WEBPACK_IMPORTED_MODULE_16__components_color_radio_color_radio__["a" /* ColorRadio */],
                __WEBPACK_IMPORTED_MODULE_17__components_counter_input_counter_input__["a" /* CounterInput */],
                __WEBPACK_IMPORTED_MODULE_18__components_rating_rating__["a" /* Rating */],
                __WEBPACK_IMPORTED_MODULE_19__components_google_map_google_map__["a" /* GoogleMap */],
                __WEBPACK_IMPORTED_MODULE_37__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_complaints_complaints__["a" /* ComplaintsPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_registered_complaints_reg_complaints__["a" /* RegComplaintsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_department_department__["a" /* DepartmentPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_subdepartment_subdepartment__["a" /* SubdepartmentPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_register_incident_reg_incident__["a" /* RegisterIncident */],
                // ContactPartners,
                __WEBPACK_IMPORTED_MODULE_43__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_44__pages_complaints_news_modal_news_modal__["a" /* NewsModalPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_contact_us_contact_us__["a" /* ContactUsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                    modalEnter: 'modal-slide-in',
                    modalLeave: 'modal-slide-out',
                    pageTransition: 'ios-transition',
                    swipeBackEnabled: false
                }, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_7__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_20__components_video_player_video_player_module__["a" /* VideoPlayerModule */],
                __WEBPACK_IMPORTED_MODULE_21__components_validators_validators_module__["a" /* ValidatorsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_maps_maps__["a" /* MapsPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_complaints_complaints__["a" /* ComplaintsPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_registered_complaints_reg_complaints__["a" /* RegComplaintsPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_department_department__["a" /* DepartmentPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_subdepartment_subdepartment__["a" /* SubdepartmentPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_register_incident_reg_incident__["a" /* RegisterIncident */],
                __WEBPACK_IMPORTED_MODULE_43__pages_location_select_location_select__["a" /* LocationSelect */],
                __WEBPACK_IMPORTED_MODULE_44__pages_complaints_news_modal_news_modal__["a" /* NewsModalPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_contact_us_contact_us__["a" /* ContactUsPage */],
            ],
            providers: [
                // ListingService,
                // List1Service,
                // List2Service,
                // ScheduleService,
                __WEBPACK_IMPORTED_MODULE_22__pages_maps_maps_service__["a" /* GoogleMapsService */],
                __WEBPACK_IMPORTED_MODULE_23__providers_language_language_service__["a" /* LanguageService */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_keyboard__["a" /* Keyboard */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_24__providers_common_service__["a" /* CommonService */],
                __WEBPACK_IMPORTED_MODULE_33__providers_connectivity_service_connectivity_service__["a" /* Connectivity */],
                __WEBPACK_IMPORTED_MODULE_34__providers_google_maps_google_maps__["a" /* GoogleMaps */],
                // Network,
                __WEBPACK_IMPORTED_MODULE_35__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] }
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_complaints_complaints__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_registered_complaints_reg_complaints__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_department_department__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_contact_us_contact_us__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var MyApp = (function () {
    function MyApp(platform, menu, app, splashScreen, statusBar, translate, alertCtrl, toastCtrl, push, events, commonService) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.app = app;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.push = push;
        this.events = events;
        this.commonService = commonService;
        this.textDir = "ltr";
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        translate.setDefaultLang('en');
        translate.use('en');
        // app.viewWillEnter.subscribe(
        //   () => console.log('view about to be entered')
        // )
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.splashScreen.hide();
            _this.statusBar.styleDefault();
            console.log(localStorage.getItem('voterId'));
            if (localStorage.getItem('voterId') == null) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */];
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_complaints_complaints__["a" /* ComplaintsPage */];
            }
            if (_this.platform.is('cordova')) {
                _this.initPushNotification();
            }
        });
        this.platform.registerBackButtonAction(function () {
            // Catches the active view
            var nav = _this.app.getActiveNavs()[0];
            var activeView = nav.getActive();
            // Checks if can go back before show up the alert
            if (activeView.name === 'ComplaintsPage') {
                if (nav.canGoBack()) {
                    nav.pop();
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Exit app',
                        message: 'Are you sure?',
                        cssClass: 'exit_alert',
                        buttons: [{
                                text: 'Cancel',
                                role: 'cancel',
                                handler: function () {
                                    _this.nav.setRoot('ComplaintsPage');
                                    console.log('** App Output Canceled! **');
                                }
                            }, {
                                text: 'Exit app',
                                handler: function () {
                                    _this.platform.exitApp();
                                }
                            }]
                    });
                    alert_1.present();
                }
            }
        });
        this.translate.onLangChange.subscribe(function (event) {
            if (event.lang == 'ar') {
                platform.setDir('rtl', true);
            }
            else {
                platform.setDir('ltr', true);
            }
            __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].forkJoin(
            // this.translate.get('HOME'),
            // this.translate.get('FORMS'),
            // this.translate.get('FUNCTIONALITIES'),
            // this.translate.get('LAYOUTS'),
            // this.translate.get('SETTINGS'),
            // this.translate.get('WORDPRESS_INTEGRATION'),
            // this.translate.get('FIREBASE_INTEGRATION'),
            _this.translate.get('Home'), _this.translate.get('New complaint'), _this.translate.get('My complaints'), _this.translate.get('Language'), _this.translate.get('ContactUs'), _this.translate.get('Logout')).subscribe(function (data) {
                _this.pages = [
                    { title: data[0], icon: 'home', component: __WEBPACK_IMPORTED_MODULE_0__pages_complaints_complaints__["a" /* ComplaintsPage */] },
                    { title: data[1], icon: 'document', component: __WEBPACK_IMPORTED_MODULE_12__pages_department_department__["a" /* DepartmentPage */] },
                    { title: data[2], icon: 'document', component: __WEBPACK_IMPORTED_MODULE_11__pages_registered_complaints_reg_complaints__["a" /* RegComplaintsPage */] },
                    { title: data[3], icon: 'settings', component: __WEBPACK_IMPORTED_MODULE_8__pages_settings_settings__["a" /* SettingsPage */] },
                    { title: data[4], icon: 'call', component: __WEBPACK_IMPORTED_MODULE_13__pages_contact_us_contact_us__["a" /* ContactUsPage */] },
                    { title: data[5], icon: 'log-out', component: __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */] }
                ];
                _this.pushPages = [];
            });
        });
    }
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        console.log("Inside push notification");
        this.push.hasPermission().then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We don\'t have permission to send push notifications');
            }
        });
        // to initialize push notifications
        var options = {
            android: {
                // senderID: '986571927369',
                senderID: '629040521479',
                sound: 'true',
                vibrate: 'true',
                icon: 'note'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'true'
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log("this.notificationData", notification);
            _this.notificationData = notification.additionalData.data;
            console.log("this.nav.getActive()", _this.nav.getActive());
            console.log("this.notificationData", _this.notificationData);
            if (notification.additionalData.foreground == false) {
                console.log("In False");
            }
            if (notification.additionalData.foreground == true) {
                console.log("In True");
                var alert_2 = _this.alertCtrl.create({
                    title: notification.title,
                    message: notification.message,
                    buttons: [{
                            text: 'Ok',
                            role: 'cancel'
                        }]
                });
                alert_2.present();
            }
            if (notification.additionalData.foreground == false) {
                // if(this.notificationData.type=="individual"){
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__["a" /* NotificationsPage */]);
                // }
            }
        });
        console.log('...................................');
        // debugger
        pushObject.on('registration').subscribe(function (registration) {
            console.log('Device registered', registration);
            localStorage.setItem('deviceId', registration.registrationId);
        });
        pushObject.on('error').subscribe(function (error) {
            return console.error('Error with Push plugin', error);
        });
        console.log('...................................');
    };
    MyApp.prototype.logout = function () {
        this.commonService.logOut().subscribe(function (resp) {
            console.log("response", resp);
            localStorage.clear();
        }, function (err) {
            console.log('err', err);
        });
    };
    MyApp.prototype.openPage = function (page) {
        console.log(page.title);
        if (page.title == 'Logout') {
            this.logout();
        }
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.pushPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
        this.app.getRootNav().push(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'app-root',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/app/app.html"*/'<ion-menu [content]="content" [swipeEnabled]="true">\n  <ion-content class="menu-content">\n  <div class="menu_logo">\n    <!-- <img class="menu_img" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n    <img class="menu_img" src="{{imageUrl}}">\n  </div>\n    <ion-list class="menu-list">\n      <button ion-item detail-none *ngFor="let page of pages" (click)="openPage(page)">\n        <ion-icon *ngIf="page.icon" name="{{page.icon}}" item-left></ion-icon>\n        {{page.title}}\n      </button>\n      <button ion-item detail-none *ngFor="let page of pushPages" (click)="pushPage(page)">\n        <ion-icon *ngIf="page.icon" name="{{page.icon}}" item-left></ion-icon>\n        {{page.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_7__providers_common_service__["a" /* CommonService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__maps_service__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__maps_model__ = __webpack_require__(702);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MapsPage = (function () {
    function MapsPage(nav, loadingCtrl, toastCtrl, GoogleMapsService, geolocation, keyboard) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.GoogleMapsService = GoogleMapsService;
        this.geolocation = geolocation;
        this.keyboard = keyboard;
        this.map_model = new __WEBPACK_IMPORTED_MODULE_7__maps_model__["a" /* MapsModel */]();
    }
    MapsPage.prototype.ngOnInit = function () {
        var _this = this;
        var _loading = this.loadingCtrl.create();
        _loading.present();
        this._GoogleMap.$mapReady.subscribe(function (map) {
            _this.map_model.init(map);
            _loading.dismiss();
        });
    };
    MapsPage.prototype.searchPlacesPredictions = function (query) {
        var env = this;
        if (query !== "") {
            env.GoogleMapsService.getPlacePredictions(query).subscribe(function (places_predictions) {
                env.map_model.search_places_predictions = places_predictions;
            }, function (e) {
                console.log('onError: %s', e);
            }, function () {
                console.log('onCompleted');
            });
        }
        else {
            env.map_model.search_places_predictions = [];
        }
    };
    MapsPage.prototype.setOrigin = function (location) {
        var env = this;
        // Clean map
        env.map_model.cleanMap();
        // Set the origin for later directions
        env.map_model.directions_origin.location = location;
        env.map_model.addPlaceToMap(location, '#00e9d5');
        // With this result we should find restaurants (*places) arround this location and then show them in the map
        // Now we are able to search *restaurants near this location
        env.GoogleMapsService.getPlacesNearby(location).subscribe(function (nearby_places) {
            // Create a location bound to center the map based on the results
            var bound = new google.maps.LatLngBounds();
            for (var i = 0; i < nearby_places.length; i++) {
                bound.extend(nearby_places[i].geometry.location);
                env.map_model.addNearbyPlace(nearby_places[i]);
            }
            // Select first place to give a hint to the user about how this works
            env.choosePlace(env.map_model.nearby_places[0]);
            // To fit map with places
            env.map_model.map.fitBounds(bound);
        }, function (e) {
            console.log('onError: %s', e);
        }, function () {
            console.log('onCompleted');
        });
    };
    MapsPage.prototype.selectSearchResult = function (place) {
        var env = this;
        env.map_model.search_query = place.description;
        env.map_model.search_places_predictions = [];
        // We need to get the location from this place. Let's geocode this place!
        env.GoogleMapsService.geocodePlace(place.place_id).subscribe(function (place_location) {
            env.setOrigin(place_location);
        }, function (e) {
            console.log('onError: %s', e);
        }, function () {
            console.log('onCompleted');
        });
    };
    MapsPage.prototype.clearSearch = function () {
        var env = this;
        this.keyboard.close();
        // Clean map
        env.map_model.cleanMap();
    };
    MapsPage.prototype.geolocateMe = function () {
        var env = this, _loading = env.loadingCtrl.create();
        _loading.present();
        this.geolocation.getCurrentPosition().then(function (position) {
            var current_location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            env.map_model.search_query = position.coords.latitude.toFixed(2) + ", " + position.coords.longitude.toFixed(2);
            env.setOrigin(current_location);
            env.map_model.using_geolocation = true;
            _loading.dismiss();
        }).catch(function (error) {
            console.log('Error getting location', error);
            _loading.dismiss();
        });
    };
    MapsPage.prototype.choosePlace = function (place) {
        var _this = this;
        var env = this;
        // Check if the place is not already selected
        if (!place.selected) {
            // De-select previous places
            env.map_model.deselectPlaces();
            // Select current place
            place.select();
            // Get both route directions and distance between the two locations
            var directions_observable = env.GoogleMapsService
                .getDirections(env.map_model.directions_origin.location, place.location), distance_observable = env.GoogleMapsService
                .getDistanceMatrix(env.map_model.directions_origin.location, place.location);
            __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].forkJoin(directions_observable, distance_observable).subscribe(function (data) {
                var directions = data[0], distance = data[1].rows[0].elements[0].distance.text, duration = data[1].rows[0].elements[0].duration.text;
                env.map_model.directions_display.setDirections(directions);
                if (env.toast) {
                    env.toast.dismiss();
                }
                env.toast = _this.toastCtrl.create({
                    message: 'That\'s ' + distance + ' away and will take ' + duration,
                    duration: 2000
                });
                env.toast.present();
            }, function (e) {
                console.log('onError: %s', e);
            }, function () {
                console.log('onCompleted');
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__["a" /* GoogleMap */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_google_map_google_map__["a" /* GoogleMap */])
    ], MapsPage.prototype, "_GoogleMap", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'maps-page',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/maps/maps.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ \'GOOGLE_MAPS\' | translate}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-row no-padding class="map-row">\n    <ion-col no-padding class="map-col">\n      <div class="search-container">\n        <!-- <ion-toolbar class="search-toolbar transparent-background"> -->\n        <ion-toolbar class="search-toolbar">\n          <ion-buttons start>\n            <button ion-button icon-only (click)="geolocateMe()" class="geolocation-button" [ngClass]="{\'using-geolocation\': map_model.using_geolocation}">\n              <ion-icon name="locate"></ion-icon>\n            </button>\n          </ion-buttons>\n          <ion-searchbar class="search-places-bar" placeholder="Search places near location" [(ngModel)]="map_model.search_query" (ionInput)="searchPlacesPredictions(map_model.search_query)" (ionClear)="clearSearch()"></ion-searchbar>\n        </ion-toolbar>\n        <ion-list [hidden]="map_model.search_places_predictions.length == 0" class="search-options-list">\n          <ion-item *ngFor="let place of map_model.search_places_predictions" tappable (click)="selectSearchResult(place)">\n            {{ place.description }}\n          </ion-item>\n        </ion-list>\n      </div>\n      <div class="map-container">\n        <google-map [options]="map_model.map_options"></google-map>\n      </div>\n      <ion-scroll [hidden]="map_model.nearby_places.length == 0" scrollX="true" class="nearby-places-container">\n        <ion-row class="nearby-places-row">\n          <ion-col width-64 class="place-item-outer" *ngFor="let place of map_model.nearby_places" [ngClass]="{\'selected-place\': place.selected}" (click)="choosePlace(place)">\n            <ion-card class="place-card">\n              <background-image class="place-image-heading" [src]="place.details.image">\n                <ion-row class="heading-row">\n                  <ion-col no-padding width-100>\n                    <h2 class="place-title">{{ place.details.name }}</h2>\n                  </ion-col>\n                </ion-row>\n              </background-image>\n              <div class="place-details-container">\n                <ion-row class="details-row">\n                  <ion-col no-padding width-50>\n                    <span class="opening-hours" [ngClass]="{\'opened\': (place.details && place.details.opening_hours && place.details.opening_hours.open_now), \'closed\': !(place.details && place.details.opening_hours && place.details.opening_hours.open_now)}">\n                      {{ (place.details && place.details.opening_hours && place.details.opening_hours.open_now) ? \'OPENED\' : \'CLOSED\' }}\n                    </span>\n                  </ion-col>\n                  <ion-col no-padding width-50>\n                    <div class="place-rating">\n                      <ion-item class="rating-item">\n                        <rating [(ngModel)]="place.details.rating" max="5" read-only="true"></rating>\n                      </ion-item>\n                    </div>\n                  </ion-col>\n                </ion-row>\n                <ion-list class="details-list" no-lines>\n                  <ion-item class="place-location">\n                    <ion-avatar item-left>\n                      <ion-icon name="pin"></ion-icon>\n                    </ion-avatar>\n                    <span class="location-text">{{ place.details.vicinity }}</span>\n                  </ion-item>\n                </ion-list>\n              </div>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-scroll>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/maps/maps.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__maps_service__["a" /* GoogleMapsService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_keyboard__["a" /* Keyboard */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ }),

/***/ 702:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsModel; });
/* unused harmony export MapPlace */
var MapsModel = (function () {
    function MapsModel() {
        this.map_options = {
            center: { lat: 40.785091, lng: -73.968285 },
            zoom: 13,
            disableDefaultUI: true
        };
        this.map_places = [];
        this.search_query = '';
        this.search_places_predictions = [];
        this.nearby_places = [];
        this.directions_origin = new MapPlace();
        this.using_geolocation = false;
    }
    // https://developers.google.com/maps/documentation/javascript/reference#Map
    MapsModel.prototype.init = function (map) {
        this.map = map;
        // https://developers.google.com/maps/documentation/javascript/reference#DirectionsRenderer
        this.directions_display = new google.maps.DirectionsRenderer({
            map: this.map,
            suppressMarkers: true,
            preserveViewport: true
        });
    };
    MapsModel.prototype.cleanMap = function () {
        // Empty nearby places array
        this.nearby_places = [];
        // To clear previous directions
        // this.directions_display.setDirections({routes: []});
        // To remove all previous markers from the map
        this.map_places.forEach(function (place) {
            place.marker.setMap(null);
        });
        // Empty markers array
        this.map_places = [];
        this.using_geolocation = false;
    };
    MapsModel.prototype.addPlaceToMap = function (location, color) {
        if (color === void 0) { color = '#333333'; }
        var _map_place = new MapPlace();
        _map_place.location = location;
        _map_place.marker = new google.maps.Marker({
            position: location,
            map: this.map,
            icon: MapPlace.createIcon(color)
        });
        this.map_places.push(_map_place);
        return _map_place;
    };
    MapsModel.prototype.addNearbyPlace = function (place_result) {
        var _map_place = this.addPlaceToMap(place_result.geometry.location, '#666666');
        // This is an extra attribute for nearby places only
        _map_place.details = place_result;
        var getRandom = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        // Add a random image
        _map_place.details["image"] = "./assets/images/maps/place-" + getRandom(1, 9) + ".jpg";
        this.nearby_places.push(_map_place);
    };
    MapsModel.prototype.deselectPlaces = function () {
        this.nearby_places.forEach(function (place) {
            place.deselect();
        });
    };
    return MapsModel;
}());

var MapPlace = (function () {
    function MapPlace() {
        this.selected = false;
    }
    // https://developers.google.com/maps/documentation/javascript/reference#Symbol
    MapPlace.createIcon = function (color) {
        var _icon = {
            path: "M144 400c80 0 144 -60 144 -134c0 -104 -144 -282 -144 -282s-144 178 -144 282c0 74 64 134 144 134zM144 209c26 0 47 21 47 47s-21 47 -47 47s-47 -21 -47 -47s21 -47 47 -47z",
            fillColor: color,
            fillOpacity: .6,
            anchor: new google.maps.Point(0, 0),
            strokeWeight: 0,
            scale: 0.08,
            rotation: 180
        };
        return _icon;
    };
    MapPlace.prototype.setIcon = function (color) {
        this.marker.setIcon(MapPlace.createIcon(color));
    };
    MapPlace.prototype.deselect = function () {
        this.selected = false;
        this.setIcon('#666666');
    };
    MapPlace.prototype.select = function () {
        this.selected = true;
        this.setIcon('#ae75e7');
    };
    return MapPlace;
}());

//# sourceMappingURL=maps.model.js.map

/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloadImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PreloadImage = (function () {
    function PreloadImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
        this._img = new Image();
    }
    Object.defineProperty(PreloadImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreloadImage.prototype, "ratio", {
        set: function (ratio) {
            this._ratio = ratio || null;
        },
        enumerable: true,
        configurable: true
    });
    PreloadImage.prototype.ngOnChanges = function (changes) {
        var ratio_height = (this._ratio.h / this._ratio.w * 100) + "%";
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'padding-bottom', ratio_height);
        this._update();
        // console.log("CHANGES preload-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    PreloadImage.prototype._update = function () {
        var _this = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.alt)) {
            this._img.alt = this.alt;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.title)) {
            this._img.title = this.title;
        }
        this._img.addEventListener('load', function () {
            _this._elementRef.nativeElement.appendChild(_this._img);
            _this._loaded(true);
        });
        this._img.src = this._src;
        this._loaded(false);
    };
    PreloadImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PreloadImage.prototype, "alt", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], PreloadImage.prototype, "title", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], PreloadImage.prototype, "src", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PreloadImage.prototype, "ratio", null);
    PreloadImage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'preload-image',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/components/preload-image/preload-image.html"*/'<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/components/preload-image/preload-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], PreloadImage);
    return PreloadImage;
}());

//# sourceMappingURL=preload-image.js.map

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundImage = (function () {
    function BackgroundImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
    }
    Object.defineProperty(BackgroundImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    BackgroundImage.prototype.ngOnChanges = function (changes) {
        this._update();
        // console.log("CHANGES background-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    BackgroundImage.prototype._update = function () {
        var _this = this;
        var img = new Image();
        img.addEventListener('load', function () {
            _this._elementRef.nativeElement.style.backgroundImage = 'url(' + _this._src + ')';
            _this._loaded(true);
        });
        img.src = this._src;
        this._loaded(false);
    };
    BackgroundImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], BackgroundImage.prototype, "class", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], BackgroundImage.prototype, "src", null);
    BackgroundImage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'background-image',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/components/background-image/background-image.html"*/'<span class="bg-overlay"></span>\n<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/components/background-image/background-image.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], BackgroundImage);
    return BackgroundImage;
}());

//# sourceMappingURL=background-image.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__show_hide_input__ = __webpack_require__(367);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowHideContainer = (function () {
    function ShowHideContainer() {
        this.show = false;
    }
    ShowHideContainer.prototype.toggleShow = function () {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */])
    ], ShowHideContainer.prototype, "input", void 0);
    ShowHideContainer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'show-hide-container',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/components/show-hide-password/show-hide-password.html"*/'<ng-content></ng-content>\n<a class="type-toggle" (click)="toggleShow()">\n	<ion-icon class="show-option" [hidden]="show" name="eye"></ion-icon>\n	<ion-icon class="hide-option" [hidden]="!show" name="eye-off"></ion-icon>\n</a>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/components/show-hide-password/show-hide-password.html"*/,
            host: {
                'class': 'show-hide-password'
            }
        }),
        __metadata("design:paramtypes", [])
    ], ShowHideContainer);
    return ShowHideContainer;
}());

//# sourceMappingURL=show-hide-container.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorRadio; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorRadio = (function () {
    function ColorRadio(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ColorRadio.prototype.setColor = function (color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
        this.renderer.setElementStyle(this.el.nativeElement, 'borderColor', color);
    };
    ColorRadio.prototype.ngOnInit = function () {
        console.log(this.color);
        this.setColor(this.color);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('color-radio'),
        __metadata("design:type", String)
    ], ColorRadio.prototype, "color", void 0);
    ColorRadio = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[color-radio]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], ColorRadio);
    return ColorRadio;
}());

//# sourceMappingURL=color-radio.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export counterRangeValidator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
function counterRangeValidator(maxValue, minValue) {
    return function (c) {
        var err = {
            rangeError: {
                given: c.value,
                max: maxValue || 10,
                min: minValue || 0
            }
        };
        return (c.value > +maxValue || c.value < +minValue) ? err : null;
    };
}
var CounterInput = (function () {
    function CounterInput() {
        this.propagateChange = noop;
        this.validateFn = noop;
        this._counterValue = 0;
    }
    CounterInput_1 = CounterInput;
    Object.defineProperty(CounterInput.prototype, "counterValue", {
        get: function () {
            return this._counterValue;
        },
        set: function (val) {
            this._counterValue = val;
            this.propagateChange(val);
        },
        enumerable: true,
        configurable: true
    });
    CounterInput.prototype.ngOnChanges = function (inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = counterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    };
    CounterInput.prototype.writeValue = function (value) {
        if (value) {
            this.counterValue = value;
        }
    };
    CounterInput.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CounterInput.prototype.registerOnTouched = function () { };
    CounterInput.prototype.increase = function () {
        this.counterValue++;
    };
    CounterInput.prototype.decrease = function () {
        this.counterValue--;
    };
    CounterInput.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('counterValue'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "_counterValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('max'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "counterRangeMax", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('min'),
        __metadata("design:type", Object)
    ], CounterInput.prototype, "counterRangeMin", void 0);
    CounterInput = CounterInput_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'counter-input',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/components/counter-input/counter-input.html"*/'<button ion-button icon-only class="counter-icon" (click)="decrease()">\n  <ion-icon name="remove"></ion-icon>\n</button>\n<span class="counter-inner">{{counterValue}}</span>\n<button ion-button icon-only class="counter-icon" (click)="increase()">\n  <ion-icon name="add"></ion-icon>\n</button>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/components/counter-input/counter-input.html"*/,
            host: {
                'class': 'counter-input'
            },
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CounterInput_1; }), multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALIDATORS"], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return CounterInput_1; }), multi: true }
            ]
        })
    ], CounterInput);
    return CounterInput;
    var CounterInput_1;
}());

//# sourceMappingURL=counter-input.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RATING_CONTROL_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
var RATING_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return Rating; }),
    multi: true
};
var Rating = (function () {
    function Rating() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = noop;
    }
    Rating.prototype.ngOnInit = function () {
        var states = [];
        for (var i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    };
    Object.defineProperty(Rating.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
                this.propagateChange(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Rating.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Rating.prototype.registerOnTouched = function () { };
    Rating.prototype.rate = function (amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], Rating.prototype, "max", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('read-only'),
        __metadata("design:type", Object)
    ], Rating.prototype, "readOnly", void 0);
    Rating = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rating',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/components/rating/rating.html"*/'<button class="rating-icon" ion-button icon-only round *ngFor="let r of range; let i = index" (click)="rate(i + 1)">\n	<ion-icon [name]="value === undefined ? (r === 1 ? \'star\' : (r === 2 ? \'star-half\' : \'star-outline\')) : (value > i ? (value < i+1 ? \'star-half\' : \'star\') : \'star-outline\')"></ion-icon>\n</button>\n'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/components/rating/rating.html"*/,
            providers: [RATING_CONTROL_VALUE_ACCESSOR]
        })
    ], Rating);
    return Rating;
}());

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoPlayerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Video stuff
// import { VgCoreModule } from 'videogular2/core';
// import { VgControlsModule } from 'videogular2/controls';
// import { VgOverlayPlayModule } from 'videogular2/overlay-play';
// import { VgBufferingModule } from 'videogular2/buffering';
var VideoPlayerModule = (function () {
    function VideoPlayerModule() {
    }
    VideoPlayerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: []
        })
    ], VideoPlayerModule);
    return VideoPlayerModule;
}());

//# sourceMappingURL=video-player.module.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ValidatorsModule = (function () {
    function ValidatorsModule() {
    }
    ValidatorsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            exports: [
                __WEBPACK_IMPORTED_MODULE_1_angular2_text_mask__["TextMaskModule"]
            ]
        })
    ], ValidatorsModule);
    return ValidatorsModule;
}());

//# sourceMappingURL=validators.module.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LanguageService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LanguageService = (function () {
    function LanguageService() {
        this.languages = new Array();
        this.languages.push({ name: "English", code: "en" }, { name: "Spanish", code: "es" }, { name: "Arabic", code: "ar" });
    }
    LanguageService.prototype.getLanguages = function () {
        return this.languages;
    };
    LanguageService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LanguageService);
    return LanguageService;
}());

//# sourceMappingURL=language.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComplaintsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notifications_notifications__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_common_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__news_modal_news_modal__ = __webpack_require__(346);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ComplaintsPage = (function () {
    function ComplaintsPage(nav, loadingCtrl, navParams, commonService, translate, modalCtrl, events) {
        this.nav = nav;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.commonService = commonService;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
        this.getAllText();
        this.translate.use(localStorage.getItem('language'));
        // this.lang = 'en';
        // this.translate.setDefaultLang('en');
        // this.translate.use('en');
        // localStorage.setItem('language','en');
        this.citizenId = localStorage.getItem('citizenId');
        events.subscribe('notification:received', function (note) {
            console.log("note", note);
        });
    }
    ComplaintsPage.prototype.ionViewDidLoad = function () {
        this.getAllNews();
        this.getNotifications();
        console.log("Hello ionViewDidLoad");
        this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
    };
    ComplaintsPage.prototype.gotoNotification = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_2__notifications_notifications__["a" /* NotificationsPage */]);
    };
    ComplaintsPage.prototype.getNotifications = function () {
        var _this = this;
        this.commonService.getNotificationData(this.citizenId).subscribe(function (res) {
            _this.totalCount = res.count;
        }, function (err) {
            console.log("err", err);
        });
    };
    ComplaintsPage.prototype.getAllNews = function () {
        var _this = this;
        this.commonService.getNews(localStorage.getItem('stateId')).subscribe(function (res) {
            console.log('res', res);
            _this.news = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    ComplaintsPage.prototype.showNews = function (n) {
        console.log(n);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__news_modal_news_modal__["a" /* NewsModalPage */], { news: n });
        // modal.onDidDismiss((location) => {
        //     console.log(location);
        //     this.obj.latitude = location.lat;
        //     this.obj.longitude = location.lng;
        // });
        modal.present();
    };
    ComplaintsPage.prototype.getAllText = function () {
        var _this = this;
        this.commonService.getData().subscribe(function (res) {
            console.log('res', res);
            _this.descText = res.data;
        }, function (err) {
            console.log("err", err);
        });
    };
    ComplaintsPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            _this.imageUrl = "http://13.233.175.188:8585/open/mobile/logo.jpg?" + new Date();
            _this.getAllNews();
            _this.getNotifications();
            _this.getAllText();
            refresher.complete();
        }, 2000);
    };
    ComplaintsPage.prototype.createWebLink = function (link) {
        if (link) {
            var pattern = /^((http|https|ftp):\/\/)/;
            if (!pattern.test(link)) {
                link = "http://" + link;
            }
            return link;
        }
        else {
            return "";
        }
    };
    ;
    ComplaintsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'complaints',template:/*ion-inline-start:"/home/oem/dev/workspace/smartneta/src/pages/complaints/complaints.html"*/'<ion-header class="login-header auth-header">\n    <ion-navbar>\n        <!-- <ion-title>Complaints</ion-title> -->\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <!-- <ion-icon name="menu" class="menu_icon"></ion-icon> -->\n        <!-- <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n        <button ion-button>\n            <ion-icon name="notifications"></ion-icon>\n        </button> -->\n\n        <ion-buttons left>\n            <button ion-button menuToggle>\n                <ion-icon name="menu" class="menu_icon"></ion-icon>\n            </button>\n        </ion-buttons>\n        <!-- <img class="logo" src="assets/images/Smartneta/BJP_logo.svg.png"> -->\n        <img class="logo" src="{{imageUrl}}">\n        <ion-buttons end style="display: flex !important;">\n            <button ion-button (click)="gotoNotification()">\n                <ion-icon name="ios-notifications" class="bell_icon"></ion-icon>\n                <span class="notification" *ngIf="totalCount > 0">{{totalCount}}</span>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n      \n<ion-content class="login-content auth-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n        <ion-refresher-content></ion-refresher-content>\n    </ion-refresher>\n    <ion-row>\n        <ion-col class="bjplogo">\n            <img class="logo1" src="{{imageUrl}}">\n        </ion-col>\n    </ion-row>\n    <div class="">\n        <ion-row>\n            <ion-col class="schedule-data">\n                <div class="data-item">\n                    <p class="complaint_title" *ngIf="descText!=undefined">\n                        <!-- <span>{{\'Info\' | translate}}</span><br />\n                        <span>{{\'Info1\' | translate}}</span><br />\n                        <span>{{\'Info2\' | translate}}</span> -->\n                        {{descText.text}}\n                    </p> \n                </div>\n            </ion-col>\n        </ion-row>\n\n        <!-- <ion-row class="space">\n            <ion-col class="schedule-data">\n                <div class="data-item" (click)="selctDept()">\n                    <p class="complaint_title">Register a new complaint</p> \n                </div>\n            </ion-col>\n        </ion-row>\n        <ion-row class="space">\n            <ion-col class="schedule-data">\n                <div class="data-item" (click)="getAllComplaints()">\n                    <p class="complaint_title">Status of your registered complaints</p> \n                </div>\n            </ion-col>\n        </ion-row> -->\n    </div>\n    <!-- <hr> -->\n    <div class="ads">\n        <ion-row *ngFor="let n of news" class="row-border" >\n            <ion-col col-3 class="">\n                <img class="adImage" (click)="showNews(n)" src=\'http://13.233.175.188:8585/open/mobile/download-image/{{n.image}}\'>\n            </ion-col>\n            <ion-col col-9 class="">\n                <ion-row (click)="showNews(n)" class="adTitle">{{n.header}}</ion-row>\n                <ion-row (click)="showNews(n)" class="adSite">{{n.details}}</ion-row>\n                <ion-row>\n                    <ion-col class="link-text">\n                        <a [attr.href]="createWebLink(n.webLink)">{{createWebLink(n.webLink)}}</a>\n                    </ion-col>\n                </ion-row>\n            </ion-col>\n        </ion-row>\n        <!-- <hr> -->\n        <!-- <ion-row>\n            <ion-col col-3 class="">\n                <img class="adImage" src="assets/images/Smartneta/upload_image.png">\n            </ion-col>\n            <ion-col col-9 class="">\n                <ion-row class="adTitle">Salary above Rs.30,000? Top credit cards for you</ion-row>\n                <ion-row class="adSite">BankBazaar</ion-row>\n            </ion-col>\n        </ion-row>\n        <hr>\n        <ion-row>\n            <ion-col col-3 class="">\n                <img class="adImage" src="assets/images/Smartneta/upload_image.png">\n            </ion-col>\n            <ion-col col-9 class="">\n                <ion-row class="adTitle">Just pay Rs 11 & avoid expensive Medical Bills</ion-row>\n                <ion-row class="adSite">Quickbima.com</ion-row>\n            </ion-col>\n        </ion-row>\n        <hr>\n        <ion-row>\n            <ion-col col-3 class="">\n                <img class="adImage" src="assets/images/Smartneta/upload_image.png">\n            </ion-col>\n            <ion-col col-9 class="">\n                <ion-row class="adTitle">Just pay Rs 11 & avoid expensive Medical Bills</ion-row>\n                <ion-row class="adSite">Quickbima.com</ion-row>\n            </ion-col>\n        </ion-row> -->\n    </div>\n</ion-content>\n\n<ion-footer>\n    <p class="footer" *ngIf="descText!=undefined">&copy;{{descText.footer}} <a href="http://smartneta.com/privacy-policy/"><u class="privacy">Privacy Policy</u></a></p>\n</ion-footer>'/*ion-inline-end:"/home/oem/dev/workspace/smartneta/src/pages/complaints/complaints.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_common_service__["a" /* CommonService */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
    ], ComplaintsPage);
    return ComplaintsPage;
}());

//# sourceMappingURL=complaints.js.map

/***/ })

},[369]);
//# sourceMappingURL=main.js.map