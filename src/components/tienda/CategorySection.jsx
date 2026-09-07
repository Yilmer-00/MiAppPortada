import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductCard from "./ProductCard";

export default function CategorySection({ titulo, productos }) {
  const navigation = useNavigation();

  return (
    <View className="mb-[22px]">
      <View className="mb-2.5 flex-row items-center justify-between px-0.5">
        <Text className="text-lg font-extrabold text-[#222222]">{titulo}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("CategoryDetail", { titulo, productos })}
        >
          <Text className="text-xs font-bold text-[#2E7D32]">Ver más...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={productos ? productos.slice(0, 3) : []}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => <ProductCard producto={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

