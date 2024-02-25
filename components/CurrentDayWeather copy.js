import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  AppState,
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import moment from "moment";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import * as Notifications from "expo-notifications";
import { schedulePushNotification } from "./notification copy";
const WeatherScreens = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [notStarted, setNotStared] = useState(true);

  const apiKey = "9e41119efa3331cba52e88180be86426";

  async function requestUserPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
    }
  }
  async function sendNotification(weather) {
    // Define a message based on the weather condition
    let message = "";
    if (weather === "shower rain" || weather === "rain") {
      message =
        "It looks like it's going to rain today. Please stay indoors and avoid getting infected by scrub typhus.";
    } else if (
      weather === "clear sky" ||
      weather === "few clouds" ||
      weather === "scattered clouds" ||
      weather === "broken clouds"
    ) {
      message =
        "The weather is nice today, but be careful not to let your children play in areas with scrub vegetation, agricultural fields, or forests.";
    } else {
      message =
        "The weather is unpredictable today. Please be prepared for anything.";
    }
    if (AppState.currentState == "active") {
      Alert.alert("Weather Alert", message);
      // You can use moment.js to manipulate dates easily
      const notif = ["Weather", message, "Alert", 0, 0, 0, false];
      console.log(...notif);
      const notificationContent = {
        title: "Weather Alert",
        body: message,
        // data: { data: "goes here" },
      };
    } else {
      const notificationContent = {
        title: "Weather Alert",
        body: message,
        // data: { data: "goes here" },
      };
      await Notifications.presentNotificationAsync(notificationContent);
    }
  }
  const weatherDescription =
    currentWeather &&
    currentWeather.weather &&
    currentWeather.weather[0] &&
    currentWeather.weather[0].description;

  useEffect(() => {
    if (weatherDescription) {
      console.log("started");
      sendNotification(weatherDescription);
    }
  }, [weatherDescription]); // add dependencies here

  useEffect(() => {
    // Fetch current weather data from a weather API
    async function fetchData() {
      requestUserPermission();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`
        )
        .then((response) => {
          setCurrentWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });

      // Fetch 5-day forecast data
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          // Filter the data to get daily forecasts
          const dailyData = response.data.list.filter((item, index) => {
            return index % 8 === 0; // Data for every 24 hours (8 data points per day)
          });

          setDailyForecast(dailyData);
        })
        .catch((error) => {
          console.error("Error fetching 5-day forecast data:", error);
        });
    }
    fetchData();
  }, [currentWeather]);

  if (!currentWeather || dailyForecast.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const weatherIconName = (weatherDescription, size) => {
    const weatherMapping = {
      "clear sky": "sun",
      "few clouds": "cloud",
      "scattered clouds": "cloud",
      "broken clouds": "cloud",
      "shower rain": "cloud-rain",
      rain: "cloud-rain",
      thunderstorm: "cloud-lightning",
      snow: "cloud-snow",
      mist: "cloud-drizzle",
    };

    const iconName =
      weatherMapping[weatherDescription.toLowerCase()] || "cloud";

    return <Feather name={iconName} size={size} color="orange" />;
  };

  return (
    <View style={styles.container}>
      <Card style={stylesheet.card}>
        <View
          style={{
            flexDirection: "row",
            margin: 5,
            padding: 1,
            backgroundColor: "#f0f0f0",
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={stylesheet.feather}>
              {weatherIconName(currentWeather.weather[0].description, 70)}
            </Text>
            <Text style={styles.temperature}>
              {Math.round(currentWeather.main.temp - 273.15)}°C
            </Text>
          </View>
          <View>
            <Text style={stylesheet.weatherDesc}>
              {"    "}
              {currentWeather.weather[0].description}
            </Text>
            <Text style={styles.city}>{currentWeather.name}</Text>
          </View>
        </View>
      </Card>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dailyForecast}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.dailyForecast}>
            <Card style={stylesheet.card}>
              <View
                style={{
                  margin: 5,
                  padding: 1,
                  backgroundColor: "#f0f0f0",
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Text style={stylesheet.feather}>
                    {weatherIconName(item.weather[0].description, 50)}
                  </Text>
                  <Text style={stylesheet.label}>
                    {index === 0
                      ? "Today"
                      : moment.unix(item.dt).format("dddd")}
                  </Text>
                </View>
                <Text style={{ ...stylesheet.weatherDesc, fontsize: 15 }}>
                  {item.weather[0].description}{" "}
                </Text>
                <Text style={stylesheet.weatherTemp}>
                  {Math.round(item.main.temp_max)}
                  °C {"\n"}
                  {item.main.temp_min}
                  °C
                </Text>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    fontSize: 30,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  temperature: {
    fontSize: 30,
    marginHorizontal: 15,
  },
  dailyForecast: {
    justifyContent: "space-between",
  },
});

export default WeatherScreens;
