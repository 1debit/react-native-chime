/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

import type {TurboModule} from '../TurboModule/RCTExport';

import * as TurboModuleRegistry from '../TurboModule/TurboModuleRegistry';

type Permissions = {|
  alert: boolean,
  badge: boolean,
  sound: boolean,
|};

type Notification = {|
  +alertTitle?: ?string,
  // Actual type: string | number
  +fireDate?: ?number,
  +alertBody?: ?string,
  +userInfo?: ?Object,
  +category?: ?string,
  // Actual type: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute'
  +repeatInterval?: ?string,
  +applicationIconBadgeNumber?: ?number,
  +isSilent?: ?boolean,
  /**
   * Custom notification sound to play. Write-only: soundName will be null when
   * accessing already created notifications using getScheduledLocalNotifications
   * or getDeliveredNotifications.
   */
  +soundName?: ?string,
  /** DEPRECATED. This was used for iOS's legacy UILocalNotification. */
  +alertAction?: ?string,
|};

export interface Spec extends TurboModule {
  +getConstants: () => {||};
  +onFinishRemoteNotification: (
    notificationId: string,
    /**
     * Type:
     *  'UIBackgroundFetchResultNewData' |
     *  'UIBackgroundFetchResultNoData' |
     *  'UIBackgroundFetchResultFailed'
     */
    fetchResult: string,
  ) => void;
  +setApplicationIconBadgeNumber: (num: number) => void;
  +getApplicationIconBadgeNumber: (callback: (num: number) => void) => void;
  +requestPermissions: (permission: {|
    +alert: boolean,
    +badge: boolean,
    +sound: boolean,
  |}) => Promise<Permissions>;
  +abandonPermissions: () => void;
  +checkPermissions: (callback: (permissions: Permissions) => void) => void;
  +presentLocalNotification: (notification: Notification) => void;
  +scheduleLocalNotification: (notification: Notification) => void;
  +cancelAllLocalNotifications: () => void;
  +cancelLocalNotifications: (userInfo: Object) => void;
  +getInitialNotification: () => Promise<?Notification>;
  +getScheduledLocalNotifications: (
    callback: (notification: Notification) => void,
  ) => void;
  +removeAllDeliveredNotifications: () => void;
  +removeDeliveredNotifications: (identifiers: Array<string>) => void;
  +getDeliveredNotifications: (
    callback: (notification: Array<Notification>) => void,
  ) => void;
  +getAuthorizationStatus: (
    callback: (authorizationStatus: number) => void,
  ) => void;
  +addListener: (eventType: string) => void;
  +removeListeners: (count: number) => void;
}

export default (TurboModuleRegistry.get<Spec>(
  'PushNotificationManager',
): ?Spec);
