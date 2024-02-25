import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { auth, firebase } from "../backend/config";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import AsyncStorage from "@react-native-async-storage/async-storage";

// A component to render the login screen
export default LoginScreen = ({ navigation }) => {
  // State variables to store the phone number, confirmation object, verification code and timer
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);

  // A ref for the recaptcha verifier modal
  const recaptchaVerifier = useRef(null);

  // A function to handle the login with phone number
  const handlePhoneLogin = async () => {
    try {
      // Send a verification code to the phone number
      const confirmation = await auth().signInWithPhoneNumber(
        "+91" + phone,
        recaptchaVerifier.current
      );
      // Set the confirmation object in state
      setConfirm(confirmation);
      // Start the timer for the verification code
      startTimer();
    } catch (error) {
      console.error(error.message);
      // Catch the error and show an alert message
      Alert.alert("Error", error.message);
    }
  };

  // A function to handle the verification of the code
  const handleVerifyCode = async () => {
    try {
      // Confirm the verification code with Firebase
      await confirm.confirm(code);
      // User is logged in
      // Save the user token in AsyncStorage
      await AsyncStorage.setItem("userToken", auth().currentUser.uid);
      // Check if the user data exists in Firebase Datastore by querying the users collection using the user uid as the document id
      const userDoc = await firebase
        .firestore()
        .collection("user")
        .doc(auth().currentUser.uid)
        .get();
      if (userDoc.exists) {
        // User data exists, navigate to the main screen
        navigation.navigate("Mains");
      } else {
        // User data does not exist, navigate to the registration screen
        navigation.navigate("Register");
      }
    } catch (error) {
      console.error(error.message);
      // Catch the error and show an alert message
      Alert.alert("Error", error.message);
    }
  };

  // A function to start the timer for the verification code
  const startTimer = () => {
    // Set an interval to decrement the timer every second
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          // If timer reaches zero, clear the interval and reset the timer
          clearInterval(interval);
          return 60;
        } else {
          // Otherwise, return the previous timer minus one
          return prevTimer - 1;
        }
      });
    }, 1000);
  };

  // A function to resend the verification code
  const handleResendCode = () => {
    // Reset the confirmation object and code in state
    setConfirm(null);
    setCode("");
    // Call the handlePhoneLogin function again
    handlePhoneLogin();
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Text>Enter your phone number</Text>
      <TextInput
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="+91"
        keyboardType="phone-pad"
      />
      {confirm ? (
        // If confirmation object exists, show the verification code input and button
        <View>
          <Text>Enter the verification code</Text>
          <TextInput
            value={code}
            onChangeText={(text) => setCode(text)}
            placeholder="123456"
            keyboardType="number-pad"
          />
          <Button title="Verify Code" onPress={handleVerifyCode} />
          <Text>Code expires in {timer} seconds</Text>
          {timer === 60 ? (
            // If timer is reset, show the resend code button
            <Button title="Resend Code" onPress={handleResendCode} />
          ) : null}
        </View>
      ) : (
        // If confirmation object does not exist, show the login with phone button
        <Button title="Login with Phone" onPress={handlePhoneLogin} />
      )}
      {/* Add the recaptcha verifier modal */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth().app.options}
      />
    </View>
  );
};
