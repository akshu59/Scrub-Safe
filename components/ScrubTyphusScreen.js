import React from "react";
import { View, Text } from "react-native";
import stylesheet from "../Stylesheet/stylesheet";
import { FlatList } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import Footer from "./Footer";

export default function ScrubTyphusScreen() {
  return (
    <ScrollView>
      <Text style={stylesheet.header}>Scrub Typhus</Text>
      <Card style={stylesheet.card}>
        <Text style={stylesheet.title}>Details</Text>
        <Text style={stylesheet.text}>
          Scrub typhus, also known as bush typhus, is a disease caused by a
          bacteria called Orientia tsutsugamushi. Scrub typhus is spread to
          people through bites of infected chiggers (larval mites).{"\n"}
        </Text>
        <FlatList
          nestedScrollEnabled={true}
          data={[
            {
              key: "Scrub typhus is the neglected vector borne disease prevalent in India and Himachal Pradesh.",
            },
            {
              key: "It is caused by intracellular bacterium Orientia tsutsugamushi (tsutsuga: fever and mushi: bug).",
            },
            {
              key: "Scrub typhus is ancient disease infecting humans for more than 200 years.",
            },
            {
              key: "Scrub typhus implicated as a cause of Acute Encephalitis Syndrome in children in India ",
            },
            {
              key: "The impact of disease is more on rural population, especially the field workers or outdoor workers.",
            },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={stylesheet.listView}>
                <Text style={stylesheet.listText}>{`\u2022 ${item.key}`}</Text>
              </View>
            );
          }}
        />
      </Card>

      <Card style={stylesheet.card}>
        <Text style={stylesheet.title}>About Vector (Mite)</Text>
        <FlatList
          nestedScrollEnabled={true}
          data={[
            {
              key: "Scrub typhus is transmitted through the bite of Leptotrombidium mite.",
            },
            {
              key: "These mite stays in moist grassy areas like grasslands, rice fields, forests and lawns.",
            },
            {
              key: "Mites mostly lives on the body of wild rodents and can also be found on some other small mammals. ",
            },
            {
              key: "Potential reservoir of pathogenic bacteria is mite itself.",
            },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={stylesheet.listView}>
                <Text style={stylesheet.listText}>{`\u2022 ${item.key}`}</Text>
              </View>
            );
          }}
        />
      </Card>

      <Card style={stylesheet.card}>
        <Text style={stylesheet.title}>Symptoms</Text>
        <Text style={stylesheet.text}>
          The most common symptoms of scrub typhus include:{"\n"}
          <FlatList
            nestedScrollEnabled={true}
            data={[
              { key: "Fever" },
              { key: "Headache" },
              { key: "Body aches " },
              { key: "Sometimes rash" },
              {
                key: "A dark,scab-like region at the site of the chigger bite",
              },
              { key: "Mental changes ranging from confusion to coma" },
              { key: "Enlarged lymph nodes" },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={stylesheet.listView}>
                  <Text
                    style={stylesheet.listText}
                  >{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
          {"\n"}People with severe illness may develop organ failure hello and
          bleeding, which can be fatal if left untreated.
        </Text>
      </Card>

      <Card style={stylesheet.card}>
        <Text style={stylesheet.title}>Preventions</Text>
        <Text style={stylesheet.text}>
          No vaccine is available to prevent scrub typhus. Here are some ways to
          reduce your risk of getting scrub typhus: {"\n"}
          {"\n"}1. Avoid contact with infected chiggers. When traveling to areas
          where scrub typhus is common, avoid areas with lots of vegetation and
          brush where chiggers may be found. {"\n"}
          {"\n"}2. Use Environmental Protection Agency (EPA)-registered insect
          repellents containing DEET or other active ingredients registered for
          use against chiggers, on exposed skin and clothing.
        </Text>
      </Card>
      <Footer />
    </ScrollView>
  );
}
