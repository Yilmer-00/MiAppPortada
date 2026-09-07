import { View, TextInput } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View className="mx-5 my-5">
      <TextInput
        placeholder="Buscar productos..."
        value={value}
        onChangeText={onChangeText}
        className="h-[45px] rounded-lg border border-[#DDDDDD] bg-white px-4"
      />
    </View>
  );
}