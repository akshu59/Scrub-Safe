import React from "react";
import { View, Text, StyleSheet } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";

const Footer = () => (
  <View style={styles.footer}>
    <Text style={stylesheet.text}>© 2023 MIGA</Text>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    alignSelf: "flex-end",
    width: "100%",
    bottom: 0,
    alignItems: "center",
    paddingTop: 60,
  },
});

export default Footer;
