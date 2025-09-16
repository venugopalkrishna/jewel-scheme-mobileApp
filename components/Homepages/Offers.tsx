import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const Offers = () => {
  const images = [
    require("../../assets/images/advertisement.jpeg"),
    require("../../assets/images/add2.jpeg"),
    require("../../assets/images/add3.jpeg"),
    require("../../assets/images/add3.jpeg"),
    require("../../assets/images/add2.jpeg"),
  ];

  // Group images into chunks of 2
  const groupedImages = [];
  for (let i = 0; i < images.length; i += 2) {
    groupedImages.push(images.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.offersHeader}>OFFERS</Text>
      <Swiper showsPagination={false} loop>
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

export default Offers;

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  slide: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  image: {
    width: width / 2 - 10, // Half width for 2 images
    height: 180,
    borderRadius: 8,
  },
  offersHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    margin: 8,
    fontFamily: "serif",
    color: "#890348ff",
    fontStyle: "italic",
  },
});
