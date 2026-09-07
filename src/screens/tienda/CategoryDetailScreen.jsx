import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import ProductCard from "../../components/tienda/ProductCard";

export default function CategoryDetailScreen({ route }) {
  const { titulo, productos } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-[#F7F9F7]">
      <View className="border-b border-[#E0E0E0] bg-white p-4">
        <Text className="text-[22px] font-extrabold text-[#2E7D32]">{titulo || "Categoría"}</Text>
        <Text className="mt-1 text-sm text-[#666666]">{productos?.length || 0} productos disponibles</Text>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        contentContainerClassName="p-3"
        columnWrapperClassName="mb-3 justify-between"
        renderItem={({ item }) => <ProductCard producto={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

