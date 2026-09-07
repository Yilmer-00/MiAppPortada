import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Heart, Plus } from "lucide-react-native";

export default function ProductCard({ producto }) {
  const navigation = useNavigation();

  const nombre = producto?.nombre || producto?.name || "Producto";
  const imagen = producto?.imagen || producto?.image || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400";
  const precio = Number(producto?.precio || producto?.price || 0);
  const descuento = producto?.descuento || 0;
  const precioFormateado = `$${precio.toLocaleString("es-CO")}`;

  return (
    <View className="relative mr-3 w-[164px] rounded-[18px] border border-[#E9EDE9] bg-white p-3 shadow-sm">
      <View className="absolute left-2.5 top-2.5 z-10 rounded-[9px] bg-[#2E7D32] px-2 py-1">
        <Text className="text-[9px] font-extrabold text-white">{descuento ? `-${descuento}%` : "OFERTA"}</Text>
      </View>
      <TouchableOpacity className="absolute right-[9px] top-[9px] z-10 h-[29px] w-[29px] items-center justify-center rounded-full bg-[#F8F8F8]" activeOpacity={0.7}>
        <Heart size={16} color="#E53935" />
      </TouchableOpacity>

      <View className="mb-2.5 h-[125px] w-[120px] items-center justify-center overflow-hidden rounded-xl bg-[#F8FAF8]">
        <Image source={typeof imagen === "string" ? { uri: imagen } : imagen} className="h-full w-full" resizeMode="contain" />
      </View>

      <Text className="mb-0.5 text-[10px] text-[#888888]">Nutrik saludable</Text>
      <Text className="min-h-[34px] text-[13px] font-bold leading-[17px] text-[#2D2D2D]" numberOfLines={2}>{nombre}</Text>

      <TouchableOpacity
        className="mt-2.5 flex-row items-end justify-between"
        onPress={() => navigation.navigate("ProductDetail", { producto })}
      >
        <Text className="text-[15px] font-extrabold text-[#2E7D32]">{precioFormateado}</Text>
        <View className="h-[31px] w-[31px] items-center justify-center rounded-full bg-[#4CAF50]">
          <Plus size={16} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

