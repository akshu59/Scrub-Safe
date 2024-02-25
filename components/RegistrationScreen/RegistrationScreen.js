import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import stylesheet from "../../Stylesheet/stylesheet";
import { ButtonGroup, CheckBox } from "@rneui/themed";
import { StateData, DistrictData } from "../StateDistricPicker";
// import Confirmation from "./Confirmation";
//import { firebase } from "../config";
import { ScrollView } from "react-native-gesture-handler";
import SwitchToggle from "react-native-switch-toggle";
//import tailwind from "tailwind-rn";

export default function RegistrationScreen({ navigation }) {
  // Add your state and form handling logic here

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
  // const customCollectionRef = firebase.firestore().collection("user");

  const handlePetInfoChange = (value) => {
    setHasPet(value);
    if (!value) {
      // Clear the pet name when the user selects "No"
      setPetName("");
    }
  };

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

    console.log({
      name,
      age,
      gender,
      villageOrTown,
      selectedState,
      selectedDistrict,
      occupation,
      indoorActivities,
      frequentTravel,
      hasPet,
      petName,
      diagnosedForScrubTyphus,
      awareAboutScrubTyphus,
    });
  };

  // const handleRegistration = () => {
  //   // Validate and save the user data
  //   // Then navigate to the main screen
  //   navigation.navigate("Mains");
  // };

  return (
    <ScrollView>
      <Text style={stylesheet.title}>Registration</Text>
      {/* <TextInput className="border p-2 mb-4" placeholder="Name" />
      <TextInput className="border p-2 mb-4" placeholder="Gender" />
      <TextInput className="border p-2 mb-4" placeholder="Age" /> */}

      <Text style={stylesheet.label}>Name:</Text>
      <TextInput
        style={stylesheet.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={stylesheet.label}>Age:</Text>
      <TextInput
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
        <Text>Select a State:</Text>
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
            <Text>Select a District:</Text>
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
        style={stylesheet.input}
        value={pincode}
        onChangeText={(text) => setPincode(text)}
        keyboardType="numeric"
      />

      <Text style={stylesheet.label}>Occupation:</Text>
      <TextInput
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
          <Text style={stylesheet.label}>Pet Name:</Text>
          <TextInput
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
        <Text style={stylesheet.label}>Aware about Scrub Typhus disease:</Text>
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
      <TouchableOpacity onPress={handleRegistration} style={stylesheet.button}>
        <Text style={stylesheet.buttonText}> Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
