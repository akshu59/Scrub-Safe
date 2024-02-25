// SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { auth } from "../../backend/config";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import AuthLoadingScreen from "../AuthLogIn";

const SplashScreen = ({ navigation }) => {
  console.log("User " + auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //Location
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }
      })();
      //Notification
      (async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status === "granted") {
          console.log("Permission granted");
        } else {
          console.log("Permission denied");
        }
      })();
      if (user) {
        // User is logged in, navigate to MainScreen
        navigation.replace("Mains");
      } else {
        // User is not logged in, navigate to LoginScreen
        navigation.replace("LoginScreen");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ backgroundColor: "#feece0" }}>
      <Text>Splash Screen</Text>
      {/* <AuthLoadingScreen /> */}
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
