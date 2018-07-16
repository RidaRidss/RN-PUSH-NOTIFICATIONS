import React, { Component } from "react";
import { AppState, View, Button, Text, StyleSheet } from "react-native";

import PushController, {
  scheduleLocalNotification
} from "./notifController.js"; //The push controller created earlier

import PushNotification from "react-native-push-notification";
import DatePicker from "react-native-datepicker";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { datetime: "2016-05-15 16:04" };

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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PUSH NOTIFICATIONS</Text>
        // <Button
        //   title="Press here to schedule a notification"
        //   // onPress={() =>
        //   //   // scheduleLocalNotification(
        //   //   //   "I am your notification",
        //   //   //   this.state.datetime,
        //   //   //   "logs",
        //   //   //   {
        //   //   //     test: "1"
        //   //   //   }
        //   //   // )
        //   // }
        // />
        <DatePicker
          style={{ width: 200 }}
          date={this.state.datetime}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={datetime => {
            this.setState({ datetime: datetime });
            scheduleLocalNotification(
              "I am your notification",
              this.state.datetime,
              "logs",
              {
                test: "1"
              }
            );
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
