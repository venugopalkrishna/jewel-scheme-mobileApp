import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

export default function AdvertisementCarousel() {
  const images = [
    require("../../assets/images/advertisement.jpeg"),
    require("../../assets/images/add2.jpeg"),
    require("../../assets/images/add3.jpeg"),
  ];

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3} // seconds
        showsPagination={false}
        dotColor="#ccc"
        activeDotColor="#000"
        loop
      >
        {images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180, // adjust as needed
  },
  image: {
    width: width,
    height: 180,
    objectFit: "cover",
  },
});
