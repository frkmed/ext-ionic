import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer, FileOpener } from 'ionic-native';

import { ExtLocalNotifications } from '../native/local-notifications';
import { EXT_IONIC_CONFIG, Config } from '../config/config';
import { Dialog } from '../utils/dialog';

declare var cordova: any;

@Injectable()
export class HotUpdater {
  constructor(
    private platform: Platform,
    private dialog: Dialog,
    @Inject(EXT_IONIC_CONFIG) private config: Config
  ) { }

  start() {
    if (!this.config.hotUpdateUrl) {
      return;
    }

    document.addEventListener('chcp_updateInstalled', eventData => {
      this.dialog.toast('程序已更新完成，重启后生效...');
    }, false);

    document.addEventListener('chcp_updateLoadFailed', eventData => {
      var error = eventData['detail'].error;
      if (error && error.code === window['chcp'].error.APPLICATION_BUILD_VERSION_TOO_LOW) {
        if (!this.platform.is('android')) {
          return;
        }

        var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
        this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', () => {
          ExtLocalNotifications.schedule({
            id: 1000,
            title: '更新',
            text: '已经完成 0%'
          });
          let transfer = new Transfer();
          transfer.onProgress(event => {
            let progress = ((event.loaded / event.total) * 100).toFixed(2);
            ExtLocalNotifications.update({
              id: 1000,
              text: `已经完成 ${progress}%`
            });
          });
          transfer.download(this.config.hotUpdateUrl, targetPath).then(() => {
            FileOpener.open(targetPath, 'application/vnd.android.package-archive');
          });
        });
      }
    }, false);
  }
}