// import React from "react";
// import { View, Text } from "react-native";
// import stylesheet from "../Stylesheet/stylesheet";

// export default function ProfileScreen() {
//   // Fetch and display the user's profile data here

//   return (
//     <View>
//       <Text style={stylesheet.title}>Profile</Text>
//       {/* Display the user's profile data here */}
//     </View>
//   );
// }

// MainScreen.js
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
//import { ScrollView } from "react-native-gesture-handler";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import CurrentDayWeather from "./CurrentDayWeather";
import * as Location from "expo-location";
import NearbyHospitalsScreen from "./NearbyHospitalsScreen";
import WeatherScreens from "./CurrentDayWeather copy";
import ChildGuideline from "./ChildGuide";
import NewsList from "./FreeNews";
// import Notification from "./Notification";
import Notification from "./notification copy";
import { auth, firebase } from "../backend/config";
//import messaging from "@react-native-firebase/messaging";
//import { PermissionsAndroid } from "react-native";

const ProfileScreen = ({ navigation }) => {
  const [score, setScore] = useState();
  const [color, setColor] = useState();
  const [message, setMessage] = useState();

  const [refreshing, setRefreshing] = useState(true);

  const onRefresh = () => {
    setRefreshing(false);
    console.log("working");

    setRefreshing(true);
  };
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // const ms = async () => {
  //   const authStatus = await messaging().requestPermission();
  // };
  // useEffect(async () => {
  //   messaging()
  //     .getToken()
  //     .then((tok) => console.log(tok));
  // }, []);
  // useEffect(async () => {
  //   // if (ms()) {
  //   //   messaging()
  //   //     .getToken()
  //   //     .then((token) => console.log(token));
  //   // }
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           "Notification caused app to open from quit state:",
  //           remoteMessage.notification
  //         );
  //       }
  //     });

  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       "Notification caused app to open from background state:",
  //       remoteMessage.notification
  //     );
  //     navigation.navigate(remoteMessage.data.type);
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log("Message handled in the background!", remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(async () => {
    console.error("Entered");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }
    // ms();
  }, []);

  useEffect(() => {
    const getSymptomScore = async () => {
      try {
        // Get a reference to the document by its id
        const docRef = firebase
          .firestore()
          .collection("user")
          .doc(auth.currentUser.uid);
        // Get the document snapshot and data
        const docSnap = await docRef.get();
        const docData = docSnap.data();
        // Check if the document exists and has the SymptomScore field
        if (docSnap.exists && docData.hasOwnProperty("score")) {
          // Set the score value in state
          if (docData.score > 0) {
            handleScore(docData.score);
          }
        } else {
          // Log a message if the document or field does not exist
          console.log("No document or SymptomScore found");
        }
      } catch (error) {
        // Catch and handle any errors
        console.error(error.message);
      }
    };
    getSymptomScore();
  }, []);

  const handleScore = (symptomCount) => {
    if (symptomCount >= 5) {
      setScore("High Risk");
      setMessage("Immediately consult the doctor at nearby health center");
      setColor("red");
    } else if (symptomCount >= 2) {
      setScore("Medium Risk");
      setMessage("Consult the doctor at nearby health center");
      setColor("#F7B500");
    } else {
      setScore("Low Risk");
      setMessage("You are safe 😊");
      setColor("green");
    }
  };

  return (
    <ScrollView
    // refreshControl={
    //   <RefreshControl refreshing={!refreshing} onRefresh={onRefresh} />
    // }
    >
      <Text style={stylesheet.title2}>Self-Assesment</Text>
      <Card style={stylesheet.card}>
        {score ? (
          <View>
            <Text
              style={{
                ...stylesheet.label,
                textAlign: "center",
                marginBottom: 0.5,
              }}
            >
              Self-Assessment Result:{" "}
            </Text>
            <Text
              style={{
                ...stylesheet.header,
                color: color,
                textAlign: "center",
              }}
            >
              {score}
            </Text>
            <Text
              style={{
                ...stylesheet.label,
                color: color,
                textAlign: "center",
              }}
            >
              {message}
            </Text>
          </View>
        ) : (
          <Text style={{ ...stylesheet.label, textAlign: "center" }}>
            Self-Assessment not yet initiated
          </Text>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SelfAssessmentScreen", {
                calculateResult: handleScore,
              });
            }}
            style={stylesheet.button}
          >
            <Text style={stylesheet.buttonText}>Take Self-Assessment</Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Text style={stylesheet.title2}>Weather</Text>
      <WeatherScreens />
      <Text style={stylesheet.title2}>Guidelines for Parents</Text>
      <ChildGuideline />
      <Text style={stylesheet.title2}>Near By Hospitals</Text>
      <NearbyHospitalsScreen />
      <Notification />
      <NewsList />
    </ScrollView>
  );
};

export default ProfileScreen;
