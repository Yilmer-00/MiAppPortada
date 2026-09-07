import React, { useEffect, useRef } from "react";

import {
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";

export default function PortadaScreen({ navigation }) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 15,
          duration: 1000,
          useNativeDriver: true,
        }),

        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Animated.Image
        source={require("../../assets/nutrick.png")}
        style={[
          { width: 220, height: 220, marginBottom: 40 },
          {
            transform: [
              {
                translateY: floatAnim,
              },
            ],
          },
        ]}
        resizeMode="contain"
      />

      <TouchableOpacity
        className="rounded-full bg-[#4CAF50] px-[35px] py-3 shadow-lg"
        onPress={() => navigation.navigate("Home")}
      >
        <Text className="text-lg font-bold text-white">Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

