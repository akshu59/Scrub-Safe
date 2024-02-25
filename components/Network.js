import * as Network from "expo-network";
import { Alert } from "react-native";

export default CheckInternet = async () => {
  const networkState = await Network.getNetworkStateAsync();
  if (networkState.isConnected && networkState.isInternetReachable) {
    Alert.alert(
      "You have internet access",
      "Your IP address is: " + (await Network.getIpAddressAsync()),
      [{ text: "OK" }]
    );
  } else {
    Alert.alert(
      "You do not have internet access",
      "Please check your network settings and try again",
      [{ text: "OK" }]
    );
  }
};
