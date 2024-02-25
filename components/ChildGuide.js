// Import React and React Native components
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import { schedulePushNotification } from "./notification copy";

// Define the childGuideline component
const ChildGuideline = () => {
  // Define an array of messages to display
  const messages = [
    "Dress your child in clothing that covers arms and legs, or cover crib, stroller, and baby carrier with mosquito netting.",
    "Do not apply insect repellent onto a child's hands, eyes, or mouth or on cuts or irritated skin.",
    "Adults:  Spray insect repellent onto your hands and then apply to child's face.",
  ];

  // Define a state variable to store the current message index
  const [messageIndex, setMessageIndex] = useState(0);

  // Define a state variable to store the interval id
  const [intervalId, setIntervalId] = useState(null);

  // Use the useEffect hook to set up the interval when the component mounts
  useEffect(() => {
    // Define a function that updates the message index
    const updateMessageIndex = () => {
      // Increment the message index by one
      setMessageIndex((prevIndex) => prevIndex + 1);
      // If the message index reaches the length of the messages array, reset it to zero
      if (messageIndex === messages.length - 1) {
        setMessageIndex(0);
      }
    };

    // Set up an interval that calls the updateMessageIndex function every 5 seconds
    const id = setInterval(updateMessageIndex, 5000);
    // Save the interval id in the state variable
    setIntervalId(id);

    // Return a cleanup function that clears the interval when the component unmounts
    return () => {
      clearInterval(id);
    };
  }, [messageIndex]); // Add messageIndex as a dependency to re-run the effect when it changes

  useEffect(() => {
    const index = Math.floor(Math.random() * 3);
    schedulePushNotification("Children", messages[index], "Guide", 6, 0, true);
  }, []);
  // Return a view that displays the current message
  return (
    <Card style={stylesheet.card}>
      <Text style={stylesheet.label}>{messages[messageIndex]}</Text>
    </Card>
  );
};

export default ChildGuideline;
