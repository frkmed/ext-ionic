"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const star_rating_1 = require("./star-rating");
let StarRatingModule = StarRatingModule_1 = class StarRatingModule {
    static forRoot() {
        return {
            ngModule: StarRatingModule_1, providers: []
        };
    }
};
StarRatingModule = StarRatingModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            ionic_angular_1.IonicModule
        ],
        exports: [
            star_rating_1.StarRatingCmp
        ],
        declarations: [
            star_rating_1.StarRatingCmp
        ]
    })
], StarRatingModule);
exports.StarRatingModule = StarRatingModule;
var StarRatingModule_1;
//# sourceMappingURL=star-rating.module.js.map