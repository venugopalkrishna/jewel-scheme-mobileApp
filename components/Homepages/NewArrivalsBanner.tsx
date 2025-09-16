import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const NewArrivalsBanner = () => {
  const images = [
    require("../../assets/images/advertisement.jpeg"),
    require("../../assets/images/add2.jpeg"),
    require("../../assets/images/add3.jpeg"),
    require("../../assets/images/add2.jpeg"),
  ];

  const groupedImages = [];
  for (let i = 0; i < images.length; i += 2) {
    groupedImages.push(images.slice(i, i + 2));
    console.log(groupedImages, "igroupww");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.NewArrivalsHeader}>New Arrivals</Text>
      <Swiper
        showsPagination={false}
        dotColor="#ccc"
        activeDotColor="#000"
        loop
      >
        {groupedImages.map((group, index) => (
          <View key={index} style={styles.slide}>
            {group.map((img, imgIndex) => (
              <Image
                key={imgIndex}
                source={img}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </View>
        ))}
      </Swiper>
    </View>
  );
};
export default NewArrivalsBanner;

const styles = StyleSheet.create({
  slide: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  container: {
    height: 180, // adjust as needed
  },
  image: {
    width: width / 2 - 10, // Half width for 2 images
    height: 180,
    borderRadius: 8,
  },
  NewArrivalsHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    margin: 8,
    fontFamily: "serif",
    color: "#890348ff",
    fontStyle: "italic",
  },
});
