"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var ionic_angular_1 = require('ionic-angular');
var device_1 = require('@ionic-native/device');
var _ = require('lodash');
var config_1 = require('../config/config');
var dialog_1 = require('../utils/dialog');
var util_1 = require('../utils/util');
var response_result_1 = require('../utils/http/response/response-result');
var url_params_builder_1 = require('../utils/http/url-params-builder');
exports.ticket_expired = 'ticket_expired';
var HttpProviderOptions = (function (_super) {
    __extends(HttpProviderOptions, _super);
    function HttpProviderOptions(options) {
        _super.call(this, options);
        this.showErrorAlert = true;
        this.showLoading = options.showLoading;
        this.loadingContent = options.loadingContent;
        this.showErrorAlert = options.showErrorAlert;
    }
    HttpProviderOptions.prototype.merge = function (options) {
        var result = _super.prototype.merge.call(this, options);
        result.showLoading = this.showLoading;
        if (util_1.isPresent(options.showLoading)) {
            result.showLoading = options.showLoading;
        }
        if (util_1.isPresent(options.loadingContent)) {
            result.loadingContent = options.loadingContent;
        }
        if (util_1.isPresent(options.showErrorAlert)) {
            result.showErrorAlert = options.showErrorAlert;
        }
        return result;
    };
    return HttpProviderOptions;
}(http_1.RequestOptions));
exports.HttpProviderOptions = HttpProviderOptions;
var defaultRequestOptions = new HttpProviderOptions({
    showLoading: true,
    loadingContent: '正在加载...',
    showErrorAlert: true,
    method: http_1.RequestMethod.Get,
    responseType: http_1.ResponseContentType.Json
});
var HttpProvider = (function () {
    function HttpProvider(_http, dialog) {
        this._http = _http;
        this.dialog = dialog;
    }
    Object.defineProperty(HttpProvider.prototype, "http", {
        get: function () {
            return this._http;
        },
        enumerable: true,
        configurable: true
    });
    HttpProvider.prototype.requestWithError = function (url, options) {
        var _this = this;
        return this.request(url, options).then(function (result) {
            if (result.status === 1) {
                if (options.showErrorAlert) {
                    _this.dialog.alert('系统提示', result.msg);
                }
                if (util_1.isPresent(result.data) && !_.isEqual({}, result.data)) {
                    return Promise.reject(result.data);
                }
                return Promise.reject(result.msg);
            }
            return result.data;
        });
    };
    HttpProvider.prototype.request = function (url, options) {
        options = _.isUndefined(options) ? defaultRequestOptions : defaultRequestOptions.merge(options);
        var loading;
        if (options.showLoading) {
            loading = this.dialog.loading(options.loadingContent);
            loading.present();
        }
        return this.ajax(url, options).toPromise().then(function (result) {
            if (loading)
                loading.dismiss();
            return result;
        }).catch(function (err) {
            if (loading)
                loading.dismiss();
            return Promise.reject(err);
        });
    };
    HttpProvider.prototype.ajax = function (url, options) {
        if (options.method === http_1.RequestMethod.Post && util_1.isPresent(options.body) && !(options.body instanceof FormData)) {
            options.body = _.isString(options.body) ? options.body : JSON.stringify(options.body);
        }
        return this.http.request(url, options).map(function (r) { return new response_result_1.ResponseResult(r.json()); });
    };
    HttpProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, dialog_1.Dialog])
    ], HttpProvider);
    return HttpProvider;
}());
exports.HttpProvider = HttpProvider;
var CorsHttpProvider = (function () {
    function CorsHttpProvider(http, events, config, device) {
        this.http = http;
        this.events = events;
        this.config = config;
        this.device = device;
        this._ticket = null;
    }
    Object.defineProperty(CorsHttpProvider.prototype, "ticket", {
        get: function () {
            return this._ticket;
        },
        set: function (t) {
            this._ticket = t;
        },
        enumerable: true,
        configurable: true
    });
    CorsHttpProvider.prototype.login = function (options) {
        return this.request(this.config.get().login.url, {
            headers: new http_1.Headers({
                'Content-Type': 'application/x-www-form-urlencoded',
                'login': 'true',
                'uuid': this.device.uuid,
                'model': this.device.model
            }),
            method: http_1.RequestMethod.Post,
            body: url_params_builder_1.URLParamsBuilder.build(options).toString()
        });
    };
    CorsHttpProvider.prototype.logout = function () {
        var _this = this;
        return this.request(this.config.get().login.url, {
            headers: new http_1.Headers({
                'logout': 'true'
            })
        }).then(function (result) {
            _this.ticket = null;
            return result;
        });
    };
    CorsHttpProvider.prototype.request = function (url, options) {
        var _this = this;
        var search = url_params_builder_1.URLParamsBuilder.build({
            'appKey': this.config.get().login.appKey,
            'devMode': this.config.get().devMode,
            '__cors-request__': true
        });
        if (_.isUndefined(options)) {
            options = {};
        }
        if (!util_1.isPresent(options.headers)) {
            options.headers = new http_1.Headers();
        }
        options.headers.set('ticket', this.ticket);
        if (_.has(options, 'search')) {
            search.replaceAll(options.search);
        }
        return this.http.requestWithError(url, _.assign({}, options, { search: search })).then(function (result) {
            return result;
        }).catch(function (err) {
            if (err && _.isString(err) && err.toString() === exports.ticket_expired) {
                _this.events.publish(exports.ticket_expired);
                return Promise.reject(exports.ticket_expired);
            }
        });
    };
    CorsHttpProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [HttpProvider, ionic_angular_1.Events, config_1.ConfigProvider, device_1.Device])
    ], CorsHttpProvider);
    return CorsHttpProvider;
}());
exports.CorsHttpProvider = CorsHttpProvider;
//# sourceMappingURL=http.js.map