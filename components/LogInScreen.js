// // LoginScreen.js
// import React, { useState } from "react";
// import { TouchableOpacity, View, Text, TextInput } from "react-native";
// import { auth } from "../backend/config";
// import { Card } from "react-native-paper";
// import stylesheet from "../Stylesheet/stylesheet";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       // User is logged in, navigate to MainScreen
//       await AsyncStorage.setItem("userEmail", email);
//       await AsyncStorage.setItem("userPassword", password);
//       navigation.replace("Mains");
//     } catch (error) {
//       console.error(error.message);
//     }
//   };

//   const navigateToRegistration = () => {
//     // Navigate to the RegistrationScreen
//     navigation.navigate("Register");
//   };

//   return (
//     <View>
//       <Card style={stylesheet.card}>
//         <Text style={stylesheet.header}>Login Screen</Text>
//         <TextInput
//           style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
//           placeholder="Email"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//         />
//         <TextInput
//           style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//         />
//         <TouchableOpacity
//           onPress={handleLogin}
//           style={{ ...stylesheet.button, margin: 5 }}
//         >
//           <Text style={stylesheet.buttonText}>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={navigateToRegistration}
//           style={{ ...stylesheet.button, margin: 5 }}
//         >
//           <Text style={stylesheet.buttonText}>Register</Text>
//         </TouchableOpacity>
//       </Card>
//     </View>
//   );
// };

// export default LoginScreen;

// LoginScreen.js
import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { auth, firebase } from "../backend/config";
import { Card } from "react-native-paper";
import stylesheet from "../Stylesheet/stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckInternet from "./Network";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add a state variable to store the error message

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log(auth.currentUser.uid);
      const snap = firebase
        .firestore()
        .collection("user")
        .doc(auth.currentUser.uid);
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
      // User is logged in
      // Save the user's email and password in AsyncStorage
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      // Navigate to MainScreen
      navigation.replace("Mains");
    } catch (error) {
      // Catch the error and set the error message based on the error code
      switch (error.code) {
        case "auth/user-not-found":
          setError("The email address you entered is not registered.");
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

  const navigateToRegistration = () => {
    // Navigate to the RegistrationScreen
    navigation.navigate("Signup");
  };

  return (
    <View>
      {/* <CheckInternet /> */}
      <Card style={stylesheet.card}>
        <Text style={stylesheet.header}>Login Screen</Text>
        <TextInput
          style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{ ...stylesheet.text, fontSize: 15, marginVertical: 5 }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={{ ...stylesheet.button, margin: 5 }}
        >
          <Text style={stylesheet.buttonText}>Login</Text>
        </TouchableOpacity>
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
    </View>
  );
};

export default LoginScreen;
