// SplashScreen.js
import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { auth, firebase } from "../../backend/config";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
        console.log(user.uid);
        const snap = firebase.firestore().collection("user").doc(user.uid);
        snap
          .get()
          .then((doc) => {
            if (doc.exists) {
              navigation.replace("Mains");
            } else {
              navigation.replace("Register");
            }
          })
          .catch((error) => {
            // Show an error message if there is any problem with fetching the data
            Alert.alert("Error", error.message);
          });
      } else {
        // User is not logged in, navigate to LoginScreen
        navigation.replace("Load");
        navigation.replace("LoginScreen");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Splash Screen</Text>
      <ActivityIndicator />
    </View>
  );
};

export default SplashScreen;
