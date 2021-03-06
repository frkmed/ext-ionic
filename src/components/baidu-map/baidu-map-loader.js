"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baiduMapLoader = () => {
    return new Promise((resolve, reject) => {
        window['baiduMapLoaded'] = () => {
            resolve();
        };
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=DmMSdcEILbFTUHs4QvlcV2G0&callback=baiduMapLoaded';
        script.onerror = () => {
            document.body.removeChild(script);
            reject();
        };
        document.body.appendChild(script);
    });
};
//# sourceMappingURL=baidu-map-loader.js.map