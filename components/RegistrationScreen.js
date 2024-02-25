// RegisterScreen.js
import React, { useState } from "react";
import { auth, firebase } from "../backend/config";
import { TouchableOpacity, View, Text, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import stylesheet from "../Stylesheet/stylesheet";
import { ButtonGroup, CheckBox } from "@rneui/themed";
import { StateData, DistrictData } from "./StateDistricPicker";
// import Confirmation from "./Confirmation";
//import { firebase } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import SwitchToggle from "react-native-switch-toggle";
import { Card } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [villageOrTown, setVillageOrTown] = useState("");
  const [occupation, setOccupation] = useState("");
  const [pincode, setPincode] = useState("");
  const [indoorActivities, setIndoorActivities] = useState(false);
  const [frequentTravel, setFrequentTravel] = useState(false);
  const [hasPet, setHasPet] = useState(false);
  const [petName, setPetName] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [diagnosedForScrubTyphus, setDiagnosedForScrubTyphus] = useState(false);
  const [awareAboutScrubTyphus, setAwareAboutScrubTyphus] = useState(false);

  const [data, setData] = useState();
  const [submit, setSubmit] = useState(false);
  const score = 0;
  const handleRegister = async () => {
    try {
      // Create user in Firebase Authentication
      if (
        !name ||
        !age ||
        !villageOrTown ||
        !selectedState ||
        !selectedDistrict ||
        !occupation ||
        !pincode ||
        (hasPet && !petName)
      ) {
        Alert.alert(
          "Please fill all the fields", // Alert title
          "Some fields are missing or invalid.", // Alert message
          [
            {
              text: "OK", // Button label
            },
          ],
          { cancelable: false } // Alert options
        );
      } else {
        // Store user data in Firestore
        await firebase
          .firestore()
          .collection("user")
          .doc(auth.currentUser.uid)
          .set({
            name,
            age,
            gender,
            villageOrTown,
            selectedState,
            selectedDistrict,
            occupation,
            indoorActivities,
            pincode,
            frequentTravel,
            hasPet,
            petName,
            diagnosedForScrubTyphus,
            awareAboutScrubTyphus,
            score,
          });

        // User is registered and logged in, navigate to MainScreen
        navigation.replace("Mains");
      }
    } catch (error) {
      console.error(error.message);
      // Catch the error and set the error message based on the error code
    }
  };

  const stateItems = StateData.map((state, index) => (
    <Picker.Item key={index} label={state} value={state} />
  ));

  const districtItems =
    selectedState && DistrictData[selectedState]
      ? DistrictData[selectedState].map((district, index) => (
          <Picker.Item key={index} label={district} value={district} />
        ))
      : [];

  const genderList = ["Male", "Female", "Others"];
  //const customCollectionRef = firebase.firestore().collection("user");

  const handlePetInfoChange = (value) => {
    setHasPet(value);
    if (!value) {
      // Clear the pet name when the user selects "No"
      setPetName("");
    }
  };

  // const handleBlur = async () => {
  //   try {
  //     // Validate the email format using a regular expression
  //     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  //     if (!regex.test(email)) {
  //       // The email format is invalid, set the error message in state
  //       setError("The email format is invalid.");
  //       return;
  //     }
  //     // Check if the email exists in Firebase Auth by using the fetchSignInMethodsForEmail method
  //     const signInMethods = await auth.fetchSignInMethodsForEmail(email);
  //     console.log(signInMethods.length > 0);
  //     if (signInMethods.length > 0) {
  //       // The email exists in Firebase Auth, set the error message in state
  //       setError("The email already exists.");
  //       return;
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     // Catch any errors and set the error message in state
  //     setError(error.message);
  //   }
  // };
  const handleConfirmation = () => {
    // Handle the "Yes" button click here, e.g., navigate to Display page
    // Replace this with your navigation logic
  };

  const handleRegistration = () => {
    // You can handle form submission here
    setSubmit(true);

    // customCollectionRef
    //   .add({
    //     name,
    //     age,
    //     gender,
    //     villageOrTown,
    //     occupation,
    //     indoorActivities,
    //     frequentTravel,
    //     hasPet,
    //     petName,
    //     diagnosedForScrubTyphus,
    //     awareAboutScrubTyphus,
    //   })
    //   .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });

    //   console.log({
    //     name,
    //     age,
    //     gender,
    //     villageOrTown,
    //     selectedState,
    //     selectedDistrict,
    //     occupation,
    //     indoorActivities,
    //     frequentTravel,
    //     hasPet,
    //     petName,
    //     diagnosedForScrubTyphus,
    //     awareAboutScrubTyphus,
    //   });
  };

  // const handleRegistration = () => {
  //   // Validate and save the user data
  //   // Then navigate to the main screen
  //   navigation.navigate("Mains");
  // };

  return (
    <ScrollView>
      <Card style={stylesheet.card}>
        <Text style={stylesheet.header}>Registration</Text>
        <TextInput
          placeholder="Full Name"
          style={{ ...stylesheet.input, marginTop: 20 }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {/* <TextInput
        style={stylesheet.input}
        value={email}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        keyboardType="email-address"
      />
      {error ? (
        <Text style={{ ...stylesheet.text, color: "red" }}>{error}</Text>
      ) : null}
      <TextInput
        placeholder="Password"
        style={stylesheet.input}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      /> */}
        <TextInput
          placeholder="Age"
          style={stylesheet.input}
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
        />

        <Text style={stylesheet.label}>Gender:</Text>
        <ButtonGroup
          buttonContainerStyle={stylesheet.selectButtons}
          selectedButtonStyle={stylesheet.selectedButtons}
          textStyle={{ fontFamily: "ComfortaaReg" }}
          buttons={["Male", "Female", "Others"]}
          selectedIndex={genderList.indexOf(gender)}
          onPress={(value) => {
            setGender(genderList[value]);
          }}
        />

        <Text style={stylesheet.label}>Village/Town:</Text>
        <TextInput
          placeholder="Village/Town"
          style={stylesheet.input}
          value={villageOrTown}
          onChangeText={(text) => setVillageOrTown(text)}
        />
        <View>
          <Text style={stylesheet.label}>State:</Text>
          <Picker
            selectedValue={selectedState}
            onValueChange={(itemValue) => {
              setSelectedState(itemValue);
            }}
          >
            <Picker.Item label="Select a State" value="" />
            {stateItems}
          </Picker>
          {selectedState && (
            <View>
              <Text style={stylesheet.label}>District:</Text>
              <Picker
                selectedValue={selectedDistrict}
                onValueChange={(itemValue) => {
                  setSelectedDistrict(itemValue);
                }}
              >
                <Picker.Item label="Select a District" value="" />
                {districtItems}
              </Picker>
            </View>
          )}
        </View>

        <Text style={stylesheet.label}>Pincode:</Text>
        <TextInput
          placeholder="Pincode"
          style={stylesheet.input}
          value={pincode}
          onChangeText={(text) => setPincode(text)}
          keyboardType="numeric"
        />
        <Text style={stylesheet.label}>Occupation:</Text>
        <TextInput
          placeholder="Occupation"
          style={stylesheet.input}
          value={occupation}
          onChangeText={(text) => setOccupation(text)}
        />
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>Activities:</Text>
          <SwitchToggle
            switchOn={indoorActivities}
            onPress={() => setIndoorActivities(!indoorActivities)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
        </View>
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>Travelling:</Text>
          <SwitchToggle
            switchOn={frequentTravel}
            onPress={() => setFrequentTravel(!frequentTravel)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
        </View>

        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>Has Pet:</Text>
          <SwitchToggle
            switchOn={hasPet}
            onPress={() => handlePetInfoChange(!hasPet)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
        </View>
        {hasPet && (
          <>
            <TextInput
              placeholder="Pet Name:"
              style={stylesheet.input}
              value={petName}
              onChangeText={(text) => setPetName(text)}
            />
          </>
        )}
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>
            Earlier diagnosed for scrub typhus:
          </Text>
          <SwitchToggle
            switchOn={diagnosedForScrubTyphus}
            onPress={() => setDiagnosedForScrubTyphus(!diagnosedForScrubTyphus)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
        </View>
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>
            Aware about Scrub Typhus disease:
          </Text>
          <SwitchToggle
            switchOn={awareAboutScrubTyphus}
            onPress={() => setAwareAboutScrubTyphus(!awareAboutScrubTyphus)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          style={{
            ...stylesheet.button,
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        >
          <Text style={stylesheet.buttonText}> Register</Text>
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

export default RegisterScreen;
