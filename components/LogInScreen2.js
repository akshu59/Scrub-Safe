// LoginScreen.js
import React, { useState, useRef } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { auth } from "../backend/config";
import { Card } from "react-native-paper";
import stylesheet from "../Stylesheet/stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha"; // Import the recaptcha verifier modal

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState(""); // Add a state variable to store the phone number
  const [confirm, setConfirm] = useState(null); // Add a state variable to store the confirmation object
  const [code, setCode] = useState(""); // Add a state variable to store the verification code (OTP)
  const recaptchaVerifier = useRef(null); // Create a ref for the recaptcha verifier modal

  const handlePhoneLogin = async () => {
    try {
      // Send a verification code to the phone number
      const confirmation = await auth.signInWithPhoneNumber(
        phone,
        recaptchaVerifier.current
      );
      // Set the confirmation object in state
      setConfirm(confirmation);
    } catch (error) {
      console.error(error.message);
      // Catch the error and set the error message based on the error code
      switch (error.code) {
        case "auth/invalid-phone-number":
          setError("The phone number you entered is invalid.");
          break;
        case "auth/too-many-requests":
          setError(
            "We have blocked all requests from this device due to unusual activity. Try again later."
          );
          break;
        case "auth/captcha-check-failed":
          setError(
            "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains."
          );
          break;
        default:
          setError("An unknown error occurred. Please try again later.");
          break;
      }
    }
  };

  const handleVerifyCode = async () => {
    try {
      // Confirm the verification code with Firebase
      const confirmation = await confirm.confirm(code);
      // User is logged in
      // Save the user's phone number in AsyncStorage
      await AsyncStorage.setItem("userPhone", phone);
      await AsyncStorage.setItem("userConfirm", JSON.stringify(confirmation));
      // Navigate to MainScreen
      navigation.replace("Mains");
    } catch (error) {
      console.error(error.message);
      // Catch the error and set the error message based on the error code
      switch (error.code) {
        case "auth/invalid-verification-code":
          setError("The verification code you entered is invalid.");
          break;
        case "auth/session-expired":
          setError(
            "The verification code has expired. Please request a new one."
          );
          break;
        default:
          setError("An unknown error occurred. Please try again later.");
          break;
      }
    }
  };

  const navigateToRegistration = () => {
    // Navigate to the RegistrationScreen
    navigation.navigate("Register");
  };

  return (
    <View>
      <Card style={stylesheet.card}>
        <Text style={stylesheet.header}>Login Screen</Text>
        <TextInput
          style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
          placeholder="Email (optional)"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        {confirm ? (
          // If confirmation object exists, show the verification code input
          <TextInput
            style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
            placeholder="Verification Code"
            keyboardType="number-pad"
            value={code}
            onChangeText={(text) => setCode(text)}
          />
        ) : null}

        {confirm ? (
          // If confirmation object exists, show the verify code button
          <TouchableOpacity
            onPress={handleVerifyCode}
            style={{ ...stylesheet.button, margin: 5 }}
          >
            <Text style={stylesheet.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        ) : (
          // If confirmation object does not exist, show the login with phone button
          <TouchableOpacity
            onPress={handlePhoneLogin}
            style={{ ...stylesheet.button, margin: 5 }}
          >
            <Text style={stylesheet.buttonText}>Login with Phone</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={{ ...stylesheet.button, margin: 5 }}
        >
          <Text style={stylesheet.buttonText}>Register</Text>
        </TouchableOpacity>
        {error ? (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        ) : null}
      </Card>
      {/* Add the recaptcha verifier modal */}
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
      />
    </View>
  );
};

export default LoginScreen;
