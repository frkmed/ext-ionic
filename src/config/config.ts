import * as _ from 'lodash';
import { OpaqueToken, Injectable } from '@angular/core';

import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';
import { HttpInterceptor } from '../providers/http';

export interface LoginConfig {
  appKey?: string;
  url?: string;
}

export interface Config {
  color?: string;
  hotUpdateUrl?: any;
  devMode?: boolean;
  login?: LoginConfig;
  openUrlModal?: OpenUrlModalOptions;
  imageLoader?: ImageLoaderOptions;
  baiduMap?: BaiduMapOptions;
  interceptors?: Array<HttpInterceptor>;
}

const defaultConfig: Config = {
  devMode: false,
  openUrlModal: {
    onmessage: (e) => { }
  },
  imageLoader: {
    spinnerEnabled: true,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    display: 'block',
    width: '100%',
    height: '100%',
    useImg: true,
    cacheDirectoryName: 'image-loader-cache'
  },
  baiduMap: {
    navCtrl: true,
    scaleCtrl: true,
    overviewCtrl: true,
    enableScrollWheelZoom: true,
    zoom: 10,
    city: '武汉',
    mass: {
      enabled: false
    }
  },
  interceptors: []
};

@Injectable()
export class ConfigProvider {
  private _config: Config;

  get(): Config {
    return this._config;
  }

  init(config: Config) {
    this._config = _.isUndefined(config) ? defaultConfig : _.assign({}, defaultConfig, config);
  }
}

export function setupConfig(userConfig: Config): Config {
  const conifg = new ConfigProvider();
  conifg.init(userConfig);
  return conifg;
}

export const EXT_IONIC_CONFIG = new OpaqueToken('EXT_IONIC_CONFIG');