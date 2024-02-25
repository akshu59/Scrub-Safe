// Import React and React Native components
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { Card } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

// Define the NewsItem component that renders a single news article
const NewsItem = ({ title, snippet, source, time, url }) => {
  return (
    <Card style={stylesheet.card}>
      <View
        style={{
          margin: 10,
          padding: 10,
          backgroundColor: "#f0f0f0",
          borderRadius: 10,
        }}
      >
        <Text style={stylesheet.title}>{title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...stylesheet.title, fontSize: 10 }}>
            {moment(time, "YYYY-MM-DDTHH:mm:ssZ").format("MMM DD, YYYY")} |
          </Text>
          <Text style={{ ...stylesheet.title, fontSize: 10 }}>{source}</Text>
        </View>
        <Text style={stylesheet.text}>{snippet}</Text>
        <Text
          style={{ color: "blue", fontSize: 12 }}
          onPress={() => Linking.openURL(url)}
        >
          Read more
        </Text>
      </View>
    </Card>
  );
};

// Define the NewsList component that fetches and displays the news articles
const NewPage = () => {
  // Define a state variable to store the news data
  const [newsData, setNewsData] = useState([]);

  // Define a state variable to store the date range for the API query
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // Set the default start date to one month ago
    endDate: new Date(), // Set the default end date to today
    showStartDatePicker: false, // Set the initial state of the start date picker to hidden
    showEndDatePicker: false, // Set the initial state of the end date picker to hidden
  });

  const startDate = `${dateRange.startDate.getFullYear()}-${
    dateRange.startDate.getMonth() + 1
  }-${dateRange.startDate.getDate()}`;
  const endDate = `${dateRange.endDate.getFullYear()}-${
    dateRange.endDate.getMonth() + 1
  }-${dateRange.endDate.getDate()}`;
  // Use the useEffect hook to fetch the news data when the component mounts or when the date range changes
  useEffect(() => {
    // Define a function that fetches the news data from Bing News Search API
    const fetchNewsData = async () => {
      // Define the query parameters
      const apiKey = "fa936b2eeea745cf9a4aad2c504ae9d1"; // Replace with your own API key
      // Define the request options
      const options = {
        method: "GET",
      };

      // Define the request URL
      const url = `https://newsapi.org/v2/everything?q=scrub-typhus&from=${startDate}&to=${endDate}&sortBy=popularity&apiKey=${apiKey}`;

      // Make the request and handle the response
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        // Extract the relevant fields from the data
        if (data.articles != null) {
          const newsData = await data.articles.map((item) => ({
            title: item.title,
            source: item.source.name,
            time: item.publishedAt,
            snippet: item.description,
            url: item.url,
          }));
          // Update the state variable with the news data
          setNewsData(newsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Call the fetchNewsData function
    fetchNewsData();
  }, [dateRange]); // Add dateRange as a dependency to run the effect whenever it changes

  // Define a function that handles the change of start date or end date
  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      // If the user confirms a date selection, update the corresponding state variable
      if (dateRange.showStartDatePicker) {
        setDateRange({
          ...dateRange,
          startDate: selectedDate,
          showStartDatePicker: false,
        });
      } else if (dateRange.showEndDatePicker) {
        setDateRange({
          ...dateRange,
          endDate: selectedDate,
          showEndDatePicker: false,
        });
      }
    } else if (event.type === "dismissed") {
      // If the user cancels a date selection, hide the corresponding date picker
      if (dateRange.showStartDatePicker) {
        setDateRange({ ...dateRange, showStartDatePicker: false });
      } else if (dateRange.showEndDatePicker) {
        setDateRange({ ...dateRange, showEndDatePicker: false });
      }
    }
  };

  // Define a function that toggles the visibility of the start date picker
  const toggleStartDatePicker = () => {
    setDateRange({
      ...dateRange,
      showStartDatePicker: !dateRange.showStartDatePicker,
    });
  };

  // Define a function that toggles the visibility of the end date picker
  const toggleEndDatePicker = () => {
    setDateRange({
      ...dateRange,
      showEndDatePicker: !dateRange.showEndDatePicker,
    });
  };

  // Return a view that displays the news data using a FlatList component
  return (
    <View style={{ flex: 1 }}>
      {/* <Text style={stylesheet.title2}>News related to scrub typhus</Text> */}
      {/* <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          onPress={toggleStartDatePicker}
          title={`Start date: ${startDate}`}
        />
        <Button onPress={toggleEndDatePicker} title={`End date: ${endDate}`} />
      </View> */}
      {dateRange.showStartDatePicker && (
        <DateTimePicker
          value={dateRange.startDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {dateRange.showEndDatePicker && (
        <DateTimePicker
          value={dateRange.endDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => <NewsItem {...item} />}
      />
    </View>
  );
};

// Export the NewsList component
export default NewPage;
