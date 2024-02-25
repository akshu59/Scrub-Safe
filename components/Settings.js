import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase/compat";
import { Alert } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { ButtonGroup, CheckBox } from "@rneui/themed";
import { StateData, DistrictData } from "./StateDistricPicker";
import { ScrollView } from "react-native-gesture-handler";
import SwitchToggle from "react-native-switch-toggle";
import { Picker } from "@react-native-picker/picker";
import { cancelNotification } from "./notification copy";
import * as Notifications from "expo-notifications";

// Import the useState and useEffect hooks from React
import { useState, useEffect } from "react";

// Define a functional component for the settings screen
function Settings(props) {
  // Use the useState hook to create state variables for the user's profile data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [diagnosedForScrubTyphus, setDiagnosedForScrubTyphus] = useState(false);
  const [awareAboutScrubTyphus, setAwareAboutScrubTyphus] = useState(false);

  // Use the useEffect hook to fetch the user's profile data from Firebase when the component mounts
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
  const handlePetInfoChange = (value) => {
    setHasPet(value);
    if (!value) {
      // Clear the pet name when the user selects "No"
      setPetName("");
    }
  };
  useEffect(() => {
    // Get the current user from Firebase
    const user = firebase.auth().currentUser;
    // Get the user's document reference from Firestore
    const userRef = firebase.firestore().collection("user").doc(user.uid);
    // Get the user's document data and update the state variables
    userRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setName(data.name);
          setAge(data.age);
          setGender(data.gender);
          setVillageOrTown(data.villageOrTown);
          setOccupation(data.occupation);
          setIndoorActivities(data.indoorActivities);
          setFrequentTravel(data.frequentTravel);
          setSelectedState(data.selectedState);
          setSelectedDistrict(data.selectedDistrict);
          setPincode(data.pincode);
          setHasPet(data.hasPet);
          setPetName(data.petName);
          setDiagnosedForScrubTyphus(data.diagnosedForScrubTyphus);
          setAwareAboutScrubTyphus(data.awareAboutScrubTyphus);
        } else {
          // Show an error message if the document does not exist
          Alert.alert("Error", "No such document.");
        }
      })
      .catch((error) => {
        // Show an error message if there is any problem with fetching the data
        Alert.alert("Error", error.message);
      });
  }, []); // Add an empty dependency array to run the effect only once

  // Define a function that updates the user's profile data in Firebase
  const updateData = () => {
    // Get the current user from Firebase
    const user = firebase.auth().currentUser;
    // Get the user's document reference from Firestore
    const userRef = firebase.firestore().collection("user").doc(user.uid);
    // Get the updated data from the state variables
    const data = {
      name,
      age,
      gender,
      villageOrTown,
      selectedState,
      selectedDistrict,
      occupation,
      indoorActivities,
      frequentTravel,
      pincode,
      hasPet,
      petName,
      diagnosedForScrubTyphus,
      awareAboutScrubTyphus,
    };
    // Update the user's document with the data
    userRef
      .update(data)
      .then(() => {
        // Show a success message
        Alert.alert("Success", "Your profile has been updated.");
      })
      .catch((error) => {
        // Show an error message
        Alert.alert("Error", error.message);
      });
  };

  // Define a function that deletes the user's profile data and account in Firebase
  const deleteData = () => {
    // Show a confirmation dialog before deleting
    Alert.alert("Confirm", "Are you sure you want to delete your account?", [
      // The "Yes" button
      {
        text: "Yes",
        onPress: () => {
          // Get the current user from Firebase
          const user = firebase.auth().currentUser;
          // Get the user's document reference from Firestore
          const userRef = firebase.firestore().collection("user").doc(user.uid);
          // Delete the user's document
          userRef
            .delete()
            .then(() => {
              // Delete the user's account
              user
                .delete()
                .then(() => {
                  // Show a success message
                  Alert.alert("Success", "Your account has been deleted.");
                  // Redirect to the login page
                  props.navigation.navigate("Login");
                })
                .catch((error) => {
                  // Show an error message
                  Alert.alert("Error", error.message);
                });
            })
            .catch((error) => {
              // Show an error message
              Alert.alert("Error", error.message);
            });
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },
    ]);
  };

  // Return a view that displays the user's profile data in a form and buttons for updating and deleting
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <TextInput className="border p-2 mb-4" placeholder="Name" />
      <TextInput className="border p-2 mb-4" placeholder="Gender" />
      <TextInput className="border p-2 mb-4" placeholder="Age" /> */}

        {/* <Text style={stylesheet.label}>Name:</Text> */}
        <TextInput
          placeholder="Full Name"
          style={{ ...stylesheet.input, marginTop: 20 }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
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
          style={stylesheet.input}
          value={villageOrTown}
          onChangeText={(text) => setVillageOrTown(text)}
        />

        {/** state and district  */}
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
            //onValueChange={(value) => setIndoorActivities(value)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
          {/* <Switch
          thumbColor={
            indoorActivities ? "rgba(255, 55, 12,1)" : "rgba(220, 220, 220,1)"
          }
          trackColor={{
            true: "rgba(255, 55, 12, 0.3)",
          }}
          value={indoorActivities}
          onValueChange={(value) => setIndoorActivities(value)}
        /> */}
        </View>
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>Travelling:</Text>
          <SwitchToggle
            switchOn={frequentTravel}
            onPress={() => setFrequentTravel(!frequentTravel)}
            //onValueChange={(value) => setIndoorActivities(value)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
          {/* <Switch
          value={frequentTravel}
          onValueChange={(value) => setFrequentTravel(value)}
        /> */}
        </View>

        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>Has Pet:</Text>
          <SwitchToggle
            switchOn={hasPet}
            onPress={() => handlePetInfoChange(!hasPet)}
            //onValueChange={(value) => setIndoorActivities(value)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
          {/* <Switch
          value={hasPet}
          onValueChange={(value) => handlePetInfoChange(value)}
         */}
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
            //onValueChange={(value) => setIndoorActivities(value)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
          {/* <Switch
          value={diagnosedForScrubTyphus}
          onValueChange={(value) => setDiagnosedForScrubTyphus(value)}
        /> */}
        </View>
        <View style={stylesheet.checkboxContainer}>
          <Text style={stylesheet.label}>
            Aware about Scrub Typhus disease:
          </Text>
          <SwitchToggle
            switchOn={awareAboutScrubTyphus}
            onPress={() => setAwareAboutScrubTyphus(!awareAboutScrubTyphus)}
            //onValueChange={(value) => setIndoorActivities(value)}
            circleColorOff={stylesheet.switchStyle.circleColorOff}
            circleColorOn={stylesheet.switchStyle.circleColorOn}
            backgroundColorOn={stylesheet.switchStyle.backgroundColorOn}
            backgroundColorOff={stylesheet.switchStyle.backgroundColoroff}
            containerStyle={stylesheet.switchContainerSize}
            circleStyle={stylesheet.switchCircleSize}
          />
          {/* <Switch
          value={awareAboutScrubTyphus}
          onValueChange={(value) => setAwareAboutScrubTyphus(value)}
        /> */}
        </View>

        {/* <Button
        style={stylesheet.button}
        title="Register"
        onPress={handleRegistration}
      /> */}
        {/* <TouchableOpacity
          onPress={handleRegister}
          style={{
            ...stylesheet.button,
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        >
          <Text style={stylesheet.buttonText}> Register</Text>
        </TouchableOpacity> */}
      </ScrollView>
      {/* Add buttons for updating and deleting */}
      <View style={styles.buttons}>
        {/* Update button */}
        <TouchableOpacity
          onPress={() => updateData()}
          style={{
            ...stylesheet.button,
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        >
          <Text style={stylesheet.buttonText}> Update</Text>
        </TouchableOpacity>
        {/* Delete button */}
        <TouchableOpacity
          onPress={() => deleteData()}
          style={{
            ...stylesheet.button,
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        >
          <Text style={stylesheet.buttonText}> Delete</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={async () => {
          //const token = (await Notifications.getExpoPushTokenAsync()).data;
          await Notifications.cancelAllScheduledNotificationsAsync();
          console.log("Done");
        }}
        style={{
          ...stylesheet.button,
          marginHorizontal: 20,
          marginVertical: 30,
        }}
      >
        <Text style={stylesheet.buttonText}> Stop Notification</Text>
      </TouchableOpacity> */}
    </View>
  );
}

// Define some styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

// Export the component
export default Settings;
