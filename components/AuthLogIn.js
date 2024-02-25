import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as Keychain from "react-native-keychain";
import { auth } from "../backend/config";

// Create a functional component for the auth loading screen
const AuthLoadingScreen = ({ navigation }) => {
  // Use the useEffect hook to check the authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the user data from keychain
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          // Get the user's uid and data from keychain
          const { username: uid, password: userData } = credentials;
          // Check if the user is already signed in with Firebase Auth
          const currentUser = auth.currentUser;
          if (currentUser && currentUser.uid === uid) {
            // The user is already signed in, no need to sign in again
            // Navigate to the app stack
            navigation.navigate("Mains");
          } else {
            // The user is not signed in, try to sign in with the stored uid and data
            await auth.signInWithCustomToken(uid, userData);
            // Navigate to the app stack
            navigation.navigate("Mains");
          }
        } else {
          // There is no user data stored in keychain, navigate to the auth stack
          navigation.navigate("LoginScreen");
        }
      } catch (error) {
        console.error(error.message);
        // Catch the error and navigate to the auth stack
        navigation.navigate("LoginScreen");
      }
    };
    checkAuth();
  }, []);

  return (
    <View>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
};

export default AuthLoadingScreen;
