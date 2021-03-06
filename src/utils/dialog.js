"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
let Dialog = class Dialog {
    constructor(loadingCtrl, alertCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    alert(title, message) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ['确定']
        });
        alert.present();
    }
    confirm(title, message, handler) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [{
                    text: '取消',
                    role: 'cancel'
                }, {
                    text: '确定',
                    handler: handler
                }]
        });
        alert.present();
    }
    loading(content) {
        return this.loadingCtrl.create({
            content: content
        });
    }
    toast(message, position = 'top') {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: position
        });
        toast.present();
    }
};
Dialog = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.LoadingController,
        ionic_angular_1.AlertController,
        ionic_angular_1.ToastController])
], Dialog);
exports.Dialog = Dialog;
//# sourceMappingURL=dialog.js.map