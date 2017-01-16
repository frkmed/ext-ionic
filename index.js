export { defaultConfig } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { MapToIterable } from './src/pipes/map-to-iterable';
export { OrderBy } from './src/pipes/order-by';
export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
export { BaiduMap } from './src/components/baidu-map/baidu-map-component';
export { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
export { StarRatingCmp } from './src/components/star-rating/star-rating';
export { StringUtils } from './src/utils/string';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptions, HttpProvider, CorsHttpProvider } from './src/utils/http/http';
import './src/rxjs-extensions';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import * as _ from 'lodash';
import { WHCYIT_IONIC_CONFIG, defaultConfig } from './src/config/config';
import { Dialog } from './src/utils/dialog';
import { HttpProvider, CorsHttpProvider } from './src/utils/http/http';
import { MapToIterable } from './src/pipes/map-to-iterable';
import { OrderBy } from './src/pipes/order-by';
import { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
import { OpenUrlModalCmp } from './src/components/open-url-modal/open-url-modal-component';
import { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
import { BaiduMapController } from './src/components/baidu-map/baidu-map';
import { BaiduMap } from './src/components/baidu-map/baidu-map-component';
import { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
import { ImageLoaderController } from './src/components/image-loader/image-loader';
import { StarRatingCmp } from './src/components/star-rating/star-rating';
export var WhcyitModule = (function () {
    function WhcyitModule() {
    }
    WhcyitModule.forRoot = function (config) {
        return {
            ngModule: WhcyitModule,
            providers: [
                { provide: WHCYIT_IONIC_CONFIG, useValue: _.isUndefined(config) ? defaultConfig : _.assign({}, defaultConfig, config) },
                OpenUrlModalController,
                BaiduMapController,
                ImageLoaderController,
                Dialog,
                HttpProvider,
                CorsHttpProvider,
                MapToIterable,
                OrderBy
            ]
        };
    };
    WhcyitModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        IonicModule
                    ],
                    exports: [
                        MapToIterable,
                        OrderBy,
                        AlphaScroll,
                        BaiduMap,
                        ImageLoaderCmp,
                        StarRatingCmp
                    ],
                    declarations: [
                        MapToIterable,
                        OrderBy,
                        AlphaScroll,
                        BaiduMap,
                        ImageLoaderCmp,
                        StarRatingCmp,
                        OpenUrlModalCmp
                    ],
                    entryComponents: [
                        OpenUrlModalCmp
                    ]
                },] },
    ];
    WhcyitModule.ctorParameters = [];
    return WhcyitModule;
}());
//# sourceMappingURL=index.js.map