import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ButtonGroup } from "@rneui/themed";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { auth, firebase } from "../backend/config";

const SelfAssessmentForm = ({ route, navigation }) => {
  const { calculateResult } = route.params;
  const [symptoms, setSymptoms] = useState({
    fever: "no",
    travel: "no",
    cough: "no",
    rash: "no",
    vomiting: "no",
    breathShortness: "no",
    headache: "no",
    chills: "no",
    nausea: "no",
    abdominalDiscomfort: "no",
    jointPains: "no",
    eschar: "no",
  });

  const addSymptomScore = async (score) => {
    try {
      // Get a reference to the document by its id
      const docRef = firebase
        .firestore()
        .collection("user")
        .doc(auth.currentUser.uid);
      // Update the document with the new field and value
      await docRef.update({ score: score });
    } catch (error) {
      // Catch and handle any errors
      console.error(error.message);
    }
  };

  const calculateRisk = () => {
    const symptomCount = Object.values(symptoms).filter(
      (value) => value === "yes"
    ).length;

    addSymptomScore(symptomCount);
    calculateResult(symptomCount);
    navigation.goBack();
  };

  return (
    <View style={stylesheet.container}>
      <ScrollView style={stylesheet.container}>
        <Text style={stylesheet.header}>Self-Assessment Form</Text>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have fever?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.fever === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                fever: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>
            Have you traveled to vegetation-rich areas in the last 5-7 days?
          </Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.travel === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                travel: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have cough?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.cough === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                cough: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have rash?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.rash === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                rash: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have vomiting?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.vomiting === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                vomiting: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have shortness of breath?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.breathShortness === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                breathShortness: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have headache?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.headache === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                headache: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have chills?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.chills === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                chills: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have nausea?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.nausea === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                nausea: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>
            Do you have abdominal discomfort?
          </Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.abdominalDiscomfort === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                abdominalDiscomfort: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>Do you have joint pains?</Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.jointPains === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                jointPains: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>

        <Card style={stylesheet.card}>
          <Text style={stylesheet.label}>
            Do you have eschar (immediately consult the doctor)?
          </Text>
          <ButtonGroup
            buttonContainerStyle={stylesheet.selectButtons}
            selectedButtonStyle={stylesheet.selectedButtons}
            textStyle={{ fontFamily: "ComfortaaReg" }}
            buttons={["Yes", "No"]}
            selectedIndex={symptoms.eschar === "yes" ? 0 : 1}
            onPress={(selectedIndex) => {
              setSymptoms({
                ...symptoms,
                eschar: selectedIndex === 0 ? "yes" : "no",
              });
            }}
          />
        </Card>
      </ScrollView>
      <View
        style={{
          //flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <TouchableOpacity onPress={calculateRisk} style={stylesheet.button}>
          <Text style={stylesheet.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelfAssessmentForm;
