import React from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, firebase } from "../backend/config";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      await auth.createUserWithEmailAndPassword(email, password);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      navigation.navigate("Register");
    }
  };

  const handleBlur = async () => {
    try {
      // Validate the email format using a regular expression
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
      if (!regex.test(email)) {
        // The email format is invalid, set the error message in state
        setError("The email format is invalid.");
        return;
      }
      // Check if the email exists in Firebase Auth by using the fetchSignInMethodsForEmail method
      const signInMethods = await auth.fetchSignInMethodsForEmail(email);
      console.log(signInMethods.length > 0);
      if (signInMethods.length > 0) {
        // The email exists in Firebase Auth, set the error message in state
        setError("The email already exists.");
        return;
      }
    } catch (error) {
      console.error(error.message);
      // Catch any errors and set the error message in state
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("The email already exists.");
          break;
        case "auth/wrong-password":
          setError("The password you entered is incorrect.");
          break;
        case "auth/invalid-login-credentials":
          setError("The login credentials you entered is incorrect.");
          break;
        case "auth/missing-password":
          setError("Password Missing");
          break;
        case "auth/invalid-email":
          setError("Email is Incorrect");
          break;
        default:
          setError("An unknown error occurred. Please try again later.");
          break;
      }
    }
  };

  return (
    <Card style={stylesheet.card}>
      <View>
        <Text style={stylesheet.header}>Sign Up</Text>
        <TextInput
          placeholder="Email"
          style={stylesheet.input}
          value={email}
          onChangeText={setEmail}
          onBlur={handleBlur}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={stylesheet.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={stylesheet.input}
          placeholder="Re-enter Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <TouchableOpacity
          onPress={handleSignUp}
          style={{ ...stylesheet.button, margin: 5 }}
        >
          <Text style={stylesheet.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default SignUp;
