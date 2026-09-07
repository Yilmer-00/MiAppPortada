import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

export default function ProductDetailScreen({ route }) {
  const { producto } = route.params || {};
  const image = producto?.imagen || producto?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900";
  const name = producto?.nombre || producto?.name || producto?.title;
  const price = Number(producto?.precio || producto?.price || 0);
  const discount = Number(producto?.descuento || 15);
  const oldPrice = price > 0 ? Math.round(price / (1 - discount / 100)) : 0;
  const formatPrice = (value) => `$${value.toLocaleString("es-CO")}`;

  return (
    <ScrollView className="flex-1 bg-[#F5F7F3]">
      <View className="relative h-[300px] bg-[#E8F0E4]">
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          className="h-full w-full"
          resizeMode="contain"
        />
        <Text className="absolute right-[18px] top-[18px] rounded-lg bg-[#D84315] px-3 py-2 font-bold text-white">-{discount}%</Text>
      </View>
      <View className="m-3 rounded-2xl bg-white p-5">
        <Text className="text-[25px] font-bold text-[#1B3A20]">{name || "Producto"}</Text>
        <View className="mt-2.5 flex-row items-center gap-3">
          <Text className="text-2xl font-bold text-[#2E7D32]">{formatPrice(price)}</Text>
          <Text className="text-base text-[#888888] line-through">{formatPrice(oldPrice)}</Text>
        </View>
        <Text className="mt-1 font-bold text-[#D84315]">Oferta especial por tiempo limitado</Text>
        <Text className="my-5 text-base leading-[23px] text-[#666666]">
          {producto?.descripcion || producto?.description ||
            "Producto seleccionado para cuidar tu bienestar y darte excelentes resultados."}
        </Text>

        <TouchableOpacity
          className="mb-2.5 items-center rounded-lg bg-[#2E7D32] p-[15px]"
          onPress={() => alert("Añadido al carrito")}
        >
          <Text className="font-bold text-white">Agregar al carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mb-2.5 items-center rounded-lg bg-[#FF9500] p-[15px]"
          onPress={() => alert("Comprando...")}
        >
          <Text className="font-bold text-white">Comprar ya</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

