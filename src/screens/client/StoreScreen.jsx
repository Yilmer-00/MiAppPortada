import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, X, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Catálogo completo de productos para buscar
const PRODUCTS = [
  {
    id: "1",
    title: "Mantequilla de Maní Crunchy",
    brand: "Nutrik Natural",
    price: "$28.000",
    weight: "500g",
    image: require("../../../assets/mantequilla.png"),
  },
  {
    id: "2",
    title: "Barra de Proteína Cacao",
    brand: "FitBar Organic",
    price: "$12.000",
    weight: "60g",
    image: require("../../../assets/barra.png"),
  },
  {
    id: "3",
    title: "Matcha Orgánico en Polvo",
    brand: "Green Tea Co",
    price: "$52.000",
    weight: "100g",
    image: require("../../../assets/matcha.png"),
  },
  {
    id: "4",
    title: "Creatina Monohidratada",
    brand: "Nutrik Pure",
    price: "$85.000",
    weight: "300g",
    image: require("../../../assets/proteina.png"),
  },
  {
    id: "5",
    title: "Aceite de Coco Extra Virgen",
    brand: "BioVida",
    price: "$34.000",
    weight: "450ml",
    image: require("../../../assets/coco.png"),
  },
  {
    id: "6",
    title: "Granola de Frutos Secos",
    brand: "Nutrik Natural",
    price: "$22.000",
    weight: "400g",
    image: require("../../../assets/secos.png"),
  },
];

export default function StoreScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Matcha', 'Proteína']);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchSubmit = () => {
    const trimmed = searchQuery.trim();
    if (trimmed && !recentSearches.includes(trimmed)) {
      setRecentSearches([trimmed, ...recentSearches.slice(0, 3)]);
    }
  };

  const removeRecentSearch = (term) => {
    setRecentSearches(recentSearches.filter((item) => item !== term));
  };

  // Navegación exacta igual a NewScreen
  const handleAdd = (product) => {
    navigation.navigate("Tienda", {
      screen: "ProductDetail",
      params: {
        producto: {
          id: product.id,
          nombre: product.title,
          precio: Number(product.price.replace(/[^0-9]/g, "")),
          imagen: product.image,
          descuento: 10,
          marca: product.brand,
          descripcion: `${product.title} de ${product.brand}, recién llegado a nuestra tienda.`,
        },
      },
    });
  };

  // Filtrado solo cuando hay texto ingresado
  const filteredProducts = searchQuery.trim().length > 0
    ? PRODUCTS.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <ScrollView className="flex-1 bg-[#F8F9FA] px-4 pt-6">
      {/* Encabezado */}
      <View className="mb-4">
        <Text className="text-2xl font-extrabold text-gray-900">Buscar</Text>
        <Text className="text-xs text-gray-500 mt-0.5">
          Encuentra tus productos saludables favoritos
        </Text>
      </View>

      {/* Campo de Búsqueda */}
      <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl px-3 py-2.5 mb-3 shadow-sm">
        <Search size={18} color="#6B7280" className="mr-2" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          placeholder="Escribe el nombre del producto..."
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-gray-800 text-sm p-0"
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={18} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Historial de Búsquedas Recientes */}
      {recentSearches.length > 0 && (
        <View className="mb-4">
          <View className="flex-row flex-wrap gap-1.5">
            {recentSearches.map((term, index) => (
              <View
                key={index}
                className="flex-row items-center bg-gray-200/80 rounded-full px-3 py-1"
              >
                <TouchableOpacity onPress={() => setSearchQuery(term)}>
                  <Text className="text-xs text-gray-700 mr-1">{term}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeRecentSearch(term)}>
                  <X size={12} color="#4B5563" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* RESULTADOS DE BÚSQUEDA */}
      {searchQuery.trim().length > 0 ? (
        <View className="pb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Resultados para "{searchQuery}"
            </Text>
            <Text className="text-xs text-gray-400 font-medium">
              {filteredProducts.length} encontrados
            </Text>
          </View>

          {filteredProducts.length === 0 ? (
            <View className="bg-white rounded-2xl p-6 items-center border border-gray-100">
              <Text className="text-gray-500 text-sm text-center">
                No se encontraron productos que coincidan con tu búsqueda.
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {filteredProducts.map((item) => (
                <View
                  key={item.id}
                  className="w-[48%] bg-white rounded-2xl p-3 mb-4 border border-gray-100 shadow-sm justify-between"
                >
                  {/* Imagen y Favorito */}
                  <View className="relative bg-[#FAFAFA] rounded-xl p-2 items-center justify-center mb-2 overflow-hidden h-32">
                    <View className="absolute top-2 left-2 bg-black px-1.5 py-0.5 rounded z-10">
                      <Text className="text-[9px] font-bold text-white uppercase tracking-wider">
                        NUEVO
                      </Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => toggleFavorite(item.id)}
                      className="absolute top-2 right-2 p-1 z-10"
                    >
                      <Heart
                        size={16}
                        color={favorites[item.id] ? "#E11D48" : "#EF4444"}
                        fill={favorites[item.id] ? "#E11D48" : "transparent"}
                      />
                    </TouchableOpacity>

                    <Image
                      source={item.image}
                      style={{ width: '100%', height: 110 }}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Detalles */}
                  <View>
                    <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                      {item.brand} • {item.weight}
                    </Text>
                    <Text
                      numberOfLines={2}
                      className="text-xs font-bold text-gray-900 mb-1 leading-tight"
                    >
                      {item.title}
                    </Text>

                    <Text className="text-base font-extrabold text-[#15803D] mb-3">
                      {item.price}
                    </Text>
                  </View>

                  {/* Botón Ver más con la navegación de NewScreen */}
                  <TouchableOpacity
                    onPress={() => handleAdd(item)}
                    className="bg-[#14532D] py-2 rounded-full items-center active:bg-[#0F3D21]"
                  >
                    <Text className="text-white font-bold text-xs">
                      Ver más →
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        /* Pantalla vacía cuando no se busca nada */
        <View className="items-center justify-center py-16">
          <Search size={40} color="#D1D5DB" />
          <Text className="text-gray-400 text-sm mt-3 text-center">
            Ingresa un nombre o marca en el buscador para ver los productos.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}