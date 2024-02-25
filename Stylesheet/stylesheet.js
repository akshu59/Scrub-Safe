import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: "#333",
    paddingLeft: 4,
    paddingRight: 4,
    fontFamily: "Comfortaa",
  },
  title2: {
    fontSize: 20,
    color: "#333",
    marginHorizontal: 10,
    fontFamily: "Comfortaa",
  },
  header: {
    fontSize: 25,
    color: "#333",
    paddingLeft: 4,
    paddingRight: 4,
    fontFamily: "Comfortaa",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    paddingLeft: 4,
    paddingRight: 4,
    fontFamily: "ComfortaaReg",
  },
  list: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
  },

  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButtonText: {
    marginLeft: 10,
    color: "#666",
    fontFamily: "Comfortaa",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    fontFamily: "ComfortaaReg",
  },
  listText: {
    fontFamily: "ComfortaaReg",
    flexWrap: "wrap",
    fontSize: 16,
    paddingLeft: 4,
    paddingRight: 4,
  },
  listView: {
    marginBottom: 2,
    flex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontFamily: "Comfortaa",
    textAlign: "center",
  },
  button: {
    // 1em is usually 16px
    letterSpacing: 0.1,
    textDecorationLine: "none",
    backgroundColor: "rgba(255, 55, 12, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 3,
    borderColor: "#ffffff",
    borderRadius: 25,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
  },
  feather: {
    alignContent: "center",
    marginHorizontal: 8,
  },
  weatherDesc: {
    marginBottom: 2,
    marginTop: 6,
    paddingHorizontal: 8,
    fontSize: 20,
    fontFamily: "ComfortaaReg",
  },
  weatherTemp: {
    marginBottom: 8,
    paddingHorizontal: 8,
    fontSize: 24,
    fontFamily: "ComfortaaReg",
  },
  selectButtons: {
    letterSpacing: 0.1,
    textDecorationLine: "none",
  },
  selectedButtons: {
    letterSpacing: 0.1,
    textDecorationLine: "none",
    backgroundColor: "rgba(255, 55, 12, 0.7)",
  },
  switch: {
    Color: "rgba(255, 55, 12, 0.7)",
  },
  input: {
    borderColor: "gray",
    borderRadius: 4,
    marginBottom: 8,
    marginHorizontal: 10,
    paddingHorizontal: 8,
    fontFamily: "ComfortaaReg",
  },
  label: {
    marginBottom: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: "ComfortaaReg",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
  highLowWrapper: {
    flexDirection: "row",
  },
  switchStyle: {
    circleColorOff: "rgba(255, 255, 255,1)",
    circleColorOn: "rgba(247, 98, 67,1)",
    backgroundColorOn: "rgba(180, 180, 180,1)",
    backgroundColorOff: "rgba(180, 180, 180,1)",
  },
  switchContainerSize: {
    marginHorizontal: 26,
    width: 50,
    height: 25,
    borderRadius: 25,
    padding: 4,
  },
  switchCircleSize: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  tagView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
});
