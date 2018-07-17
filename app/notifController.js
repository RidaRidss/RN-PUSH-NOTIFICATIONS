import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import moment from "moment";
import localization from "moment/locale/hu";

const NOTIFICATION_DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm";

export default class notifController extends Component {
  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log("NOTIFICATION: ", notification);
      },
      popInitialNotification: true
    });
  }

  render() {
    return null;
  }
}

export function scheduleLocalNotification(message, date, id, payload) {
  // message: type String
  // date: type String  format 'YYYY-MM-DD HH:mm' (NOTIFICATION_DATE_TIME_FORMAT)

  //construct the notification parameters
  const fireDate = moment(date, NOTIFICATION_DATE_TIME_FORMAT).toDate();
  const notification = {
    id: createPushId(id), //for android cancel notification (must be stringified number)
    message, // (required)
    date: fireDate,
    data: JSON.stringify(payload),
    vibrate: true, // (optional) default: true
    vibration: 600, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "#my_sleep_time", // (optional) add tag to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    autoCancel: true, // (optional) default: true

    /* iOS and Android properties */
    title: "Reminder", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    playSound: true, // (optional) default: true
    color: "green", // (optional) default: system default
    soundName: "default",
    repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    actions: '["Yes", "No"]' // (Android only) See the doc for notification actions to know more
  };

  //schedule the notification
  PushNotification.localNotificationSchedule(notification);
}

export function createPushId(pushType) {
  return NOTIFICATION_TYPE_TO_ID[pushType];
}

export const NOTIFICATION_TYPE_TO_ID = {
  logs: "0",
  rems: "1",
  ins: "2"
};
