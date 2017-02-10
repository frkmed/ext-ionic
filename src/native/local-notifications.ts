import { Cordova, Plugin, ILocalNotification, LocalNotifications } from 'ionic-native';

export interface ExtILocalNotification extends ILocalNotification {
  progress?: boolean;
  removeProgress?: boolean;
  maxProgress?: number;
  currentProgress?: number;
}

@Plugin({
  pluginName: 'LocalNotifications',
  plugin: 'de.appplant.cordova.plugin.local-notification',
  pluginRef: 'cordova.plugins.notification.local',
  repo: 'https://github.com/squallliu/cordova-plugin-local-notifications'
})
export class ExtLocalNotifications extends LocalNotifications {
  @Cordova({
    sync: true
  })
  static updateProgress(options?: ExtILocalNotification): void { }
}