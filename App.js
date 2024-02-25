import { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import RegistrationScreen from "./components/RegistrationScreen";
import MainScreen from "./components/MainScreen/MainScreen";
//import * as Font from "expo-font";
import * as SplashScrn from "expo-splash-screen";
import * as Font from "expo-font";
//import LoginScreen from "./components/LogInScreen";
import LoginScreen from "./components/LogInScreen";
import SelfAssessmentForm from "./components/Assesment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, firebase } from "./backend/config";
import SignUp from "./components/SignUp";
import { Alert } from "react-native";
import LoadingComponent from "./components/Loading";
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          Comfortaa: require("./assets/Fonts/AvenirNextLTPro-Bold.otf"), // require("./assets/Fonts/Comfortaa-Bold.ttf"),
          ComfortaaReg: require("./assets/Fonts/AvenirNextLTPro-Regular.otf"), //require("./assets/Fonts/Comfortaa-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScrn.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    // Check if there is any user data stored in AsyncStorage
    (async () => {
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userPassword = await AsyncStorage.getItem("userPassword");
      if (userEmail && userPassword) {
        // Sign in the user with the stored email and password
        await auth.signInWithEmailAndPassword(userEmail, userPassword);
        const snap = firebase.firestore().collection("user").doc(user.uid);
        snap
          .get()
          .then((doc) => {
            if (doc.exists) {
              setRegistered(true);
              console.log(user && registered);
            } else {
              setRegistered(false);
            }
          })
          .catch((error) => {
            // Show an error message if there is any problem with fetching the data
            Alert.alert("Error", error.message);
          });
      }
    })();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [appIsReady, registered]);

  // useEffect(() => {
  //   // Listen to the authentication state changes
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return unsubscribe;
  // }, []);
  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        /> */}
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        />
        <Stack.Screen
          name="Load"
          component={LoadingComponent}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        />
        {/* <Stack.Screen
          name="Mains"
          component={MainScreen}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        /> */}

        {user ? (
          <>
            <Stack.Screen
              name="Mains"
              component={MainScreen}
              options={{
                headerTitle: "Scrub Safe",
                headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
                headerTitleStyle: {
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "Comfortaa",
                },
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{
                headerTitle: "Scrub Safe",
                headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
                headerTitleStyle: {
                  color: "#fff",
                  fontSize: 20,
                  fontFamily: "Comfortaa",
                },
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: "Scrub Safe",
              headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
              headerTitleStyle: {
                color: "#fff",
                fontSize: 20,
                fontFamily: "Comfortaa",
              },
            }}
          />
        )}
        {/* {user && registered ? (
          <Stack.Screen
            name="Mains"
            component={MainScreen}
            options={{
              headerTitle: "Scrub Safe",
              headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
              headerTitleStyle: {
                color: "#fff",
                fontSize: 20,
                fontFamily: "Comfortaa",
              },
            }}
          />
        ) : user ? (
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
              headerTitle: "Scrub Safe",
              headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
              headerTitleStyle: {
                color: "#fff",
                fontSize: 20,
                fontFamily: "Comfortaa",
              },
            }}
          />
        ) : (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerTitle: "Scrub Safe",
              headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
              headerTitleStyle: {
                color: "#fff",
                fontSize: 20,
                fontFamily: "Comfortaa",
              },
            }}
          />
        )} */}

        <Stack.Screen
          name="SelfAssessmentScreen"
          component={SelfAssessmentForm}
          options={{
            headerTitle: "Scrub Safe",
            headerStyle: { backgroundColor: "rgba(255, 55, 12, 0.7)" },
            headerTitleStyle: {
              color: "#fff",
              fontSize: 20,
              fontFamily: "Comfortaa",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
