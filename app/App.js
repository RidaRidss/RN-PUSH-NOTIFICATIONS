import React, { Component } from "react";
import { AppState, View, Button, Text, StyleSheet } from "react-native";

import PushController, {
  scheduleLocalNotification
} from "./notifController.js"; //The push controller created earlier

import PushNotification from "react-native-push-notification";
import DatePicker from "react-native-datepicker";

// getting current time
// ======================

var date = new Date();
var hours = date.getHours();
var minutes = date.getMinutes();
var ampm = hours >= 12 ? "pm" : "am";
var hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
var strTime = hours + ":" + minutes + " " + ampm;
var strTimeWithOutZone = hours + ":" + minutes;
// ================================================================================================

// arrange a (current date n picked time from picker) format to pass as param for push notification
// ================================================================================================

var getYear = date.getFullYear();
var getMonth = date.getMonth() + 1;
var getDate = date.getDate();
var time = strTime;
var hours = Number(time.match(/^(\d+)/)[1]);
var minutes = Number(time.match(/:(\d+)/)[1]);
var AMPM = time.match(/\s(.*)$/)[1];
if (AMPM == "PM" && hours < 12) hours = hours + 12;
if (AMPM == "AM" && hours == 12) hours = hours - 12;
var sHours = hours.toString();
var sMinutes = minutes.toString();
if (hours < 10) sHours = "0" + sHours;
if (minutes < 10) sMinutes = "0" + sMinutes;

// ================================================================================================

// getting current Date

// ====================

var currentDate = getYear + "-" + getMonth + "-" + getDate;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: strTime,
      date: currentDate
    };
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  // This will notify the user in 3 seconds after sending the app to the
  // background (like after pressing the home button or switching apps)
  handleAppStateChange(appState) {
    if (appState === "background") {
      // Schedule a notification
      // PushNotification.localNotificationSchedule({
      //   message: "Scheduled delay notification message", // (required)
      //   date: new Date(Date.now() + 3 * 1000) // in 3 secs
      // });
    }
  }

  render() {
    var timePickedNDate = this.state.date + " " + this.state.time;
    console.log(timePickedNDate);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PUSH NOTIFICATIONS</Text>
        <Button
          style={{
            marginBottom: 10
          }}
          title="Set Date & Time & Press here to schedule a notification"
          onPress={() =>
            scheduleLocalNotification(
              "Change Time & you will get a push notification on current date n picked time",
              timePickedNDate,
              "logs",
              {
                test: "1"
              }
            )
          }
        />
        <DatePicker
          style={{ width: 200 }}
          date={this.state.time}
          mode="time"
          format="hh:mm A"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={time => {
            this.setState({ time: time });
          }}
        />
        <DatePicker
          style={{ width: 200, marginTop: 10 }}
          date={this.state.date}
          mode="date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
        <PushController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    margin: 15
  }
});
