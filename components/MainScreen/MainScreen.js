// import React from "react";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import ProfileScreen from "../ProfileScreen";
// import NearbyHospitalsScreen from "../NearbyHospitalsScreen";
// import WeatherScreen from "../WeatherScreen";
// import ScrubTyphusScreen from "../ScrubTyphusScreen";

// const Drawer = createDrawerNavigator();

// export default function MainScreen() {
//   return (
//     <Drawer.Navigator initialRouteName="Profile">
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen
//         name="Nearby Hospitals"
//         component={NearbyHospitalsScreen}
//       />
//       <Drawer.Screen name="Weather" component={WeatherScreen} />
//       <Drawer.Screen name="Scrub Typhus" component={ScrubTyphusScreen} />
//     </Drawer.Navigator>
//   );
// }

import "react-native-gesture-handler";
import { View, Text, Image, Button } from "react-native";
import { SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import NearbyHospitalsScreen from "../NearbyHospitalsScreen";
import ProfileScreen from "../ProfileScreen";
import ScrubTyphusScreen from "../ScrubTyphusScreen";
import WeatherScreen from "../WeatherScreen";
import User from "../../assets/user.jpg";
import { firebase, auth, firestore } from "../../backend/config";
//import firebase from "../../backend/config";
import { useState, useEffect } from "react";
import NewPage from "../NewsPage";
import Settings from "../Settings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
// const [profile, setProfile] = useState({});

// const handleLogout = async () => {
//   try {
//     await auth.signOut();
//     // User is logged out, navigate to LoginScreen
//     navigation.replace("LoginScreen");
//   } catch (error) {
//     console.error(error.message);
//   }
// };

export default function MainScreen({ navigation }) {
  const [profile, setProfile] = useState({});
  const [users, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const db = firestore;
      const doc = await firebase
        .firestore()
        .collection("user")
        .doc(user.uid)
        .get();
      if (doc.exists) {
        setProfile(doc.data());
        setUser(user);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.setItem("userEmail", "");
      await AsyncStorage.setItem("userPassword", "");
      // User is logged out, navigate to LoginScreen
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={User}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 65,
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {profile.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                {users.email}
              </Text>
            </View>
            <DrawerItemList {...props} />
            <View
              style={{
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <Button title="Logout" onPress={handleLogout} color={"#f06513"} />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250,
        },
        headerStyle: {
          backgroundColor: "rgba(255, 55, 12, 0.7)",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "Comfortaa",
        },
        drawerLabelStyle: {
          color: "#111",
          fontFamily: "ComfortaaReg",
        },
        drawerActiveBackgroundColor: "rgba(255, 55, 12, 0.08)",
      }}
    >
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <SimpleLineIcons name="user" size={20} color="#808080" />
          ),
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="News"
        options={{
          drawerLabel: "News",
          title: "Scrub Typhus News",
          drawerIcon: () => (
            <MaterialIcons name="article" size={20} color="#808080" />
          ),
        }}
        component={NewPage}
      />
      <Drawer.Screen
        name="ScrubTyphus"
        options={{
          drawerLabel: "ScrubTyphus",
          title: "ScrubTyphus",
          drawerIcon: () => (
            <MaterialIcons name="medical-services" size={20} color="#808080" />
          ),
        }}
        component={ScrubTyphusScreen}
      />
      <Drawer.Screen
        name="Setting"
        options={{
          drawerLabel: "Setting",
          title: "Setting",
          drawerIcon: () => (
            <MaterialIcons name="settings" size={20} color="#808080" />
          ),
        }}
        component={Settings}
      />
    </Drawer.Navigator>
  );
}
