import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system'; // 👈 Importante para gestionar el archivo en el móvil

export default function FacturaDetalle() {
    const route = useRoute();
    const navigation = useNavigation();

    const { id = 'FAC-0001', factura } = route.params || {};
    const facturaId = factura?.numero || id;

    // Función para descargar y guardar la factura en el celular
    const handleDownloadPDF = async () => {
        try {
            const htmlContent = `
        <html>
          <body style="font-family: Helvetica, Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #047857;">Detalle de la Factura: ${facturaId}</h2>
            <p><strong>Cliente:</strong> Juan Pérez</p>
            <p><strong>Fecha:</strong> 22/05/2026</p>
            <p><strong>Estado:</strong> Pagado</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3>Productos comprados</h3>
            <ul>
              <li>Yogur Griego Natural (x1) - $12.000</li>
              <li>Ensalada Fresh (x1) - $15.000</li>
            </ul>
            <h3 style="color: #047857;">Total a Pagar: $27.000</h3>
          </body>
        </html>
      `;

            // 1. Generar el PDF temporalmente
            const { uri } = await Print.printToFileAsync({ html: htmlContent });

            // 2. Definir una ruta permanente y segura en el almacenamiento local del celular
            const fileName = `Factura_${facturaId.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // 3. Copiar el archivo al directorio de documentos del dispositivo
            await FileSystem.copyAsync({
                from: uri,
                to: fileUri
            });

            // 4. Abrir el selector nativo del celular para que el usuario guarde o comparta el PDF
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri, {
                    UTI: '.pdf',
                    mimeType: 'application/pdf',
                    dialogTitle: `Guardar Factura ${facturaId}`
                });
            } else {
                Alert.alert('Aviso', 'La función de compartir no está disponible en este dispositivo.');
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo generar o descargar la factura en el dispositivo.');
            console.error(error);
        }
    };

    return (
        <ScrollView className="flex-1 bg-gray-50 p-4">
            {/* Botón de Volver */}
            <TouchableOpacity
                className="flex-row items-center mb-4 py-1"
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={20} color="#047857" />
                <Text className="text-xs font-semibold text-emerald-700 ml-1">Volver a Facturas</Text>
            </TouchableOpacity>

            {/* Tarjeta principal de detalle */}
            <View className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm mb-4">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-bold text-gray-900">
                        Detalle: <Text className="text-emerald-700">{facturaId}</Text>
                    </Text>

                    {/* Botón de Descargar / Guardar */}
                    <TouchableOpacity
                        className="bg-emerald-50 flex-row items-center px-3 py-1.5 rounded-lg border border-emerald-200"
                        onPress={handleDownloadPDF}
                    >
                        <Ionicons name="download-outline" size={16} color="#047857" />
                        <Text className="text-xs font-bold text-emerald-700 ml-1">Descargar</Text>
                    </TouchableOpacity>
                </View>

                {/* Metadatos (Cliente, Fecha, Estado) */}
                <View className="flex-row justify-between items-center border-b border-gray-100 pb-4 mb-4">
                    <View>
                        <Text className="text-xs text-gray-400 mb-1">Cliente</Text>
                        <Text className="text-xs font-bold text-gray-800">Juan Pérez</Text>
                    </View>
                    <View>
                        <Text className="text-xs text-gray-400 mb-1">Fecha</Text>
                        <Text className="text-xs font-bold text-gray-800">22/05/2026</Text>
                    </View>
                    <View className="items-end">
                        <Text className="text-xs text-gray-400 mb-1">Estado</Text>
                        <View className="bg-green-50 px-2.5 py-1 rounded-md">
                            <Text className="text-xs font-bold text-green-700">Pagado</Text>
                        </View>
                    </View>
                </View>

                {/* Título de productos */}
                <Text className="text-xs font-bold text-gray-900 mb-3">Productos comprados</Text>

                {/* Lista de productos */}
                <View className="mb-4">
                    <View className="flex-row justify-between py-2 border-b border-gray-50">
                        <Text className="text-xs text-gray-700">Yogur Griego Natural (x1)</Text>
                        <Text className="text-xs font-bold text-gray-900">$12.000</Text>
                    </View>
                    <View className="flex-row justify-between py-2 border-b border-gray-50">
                        <Text className="text-xs text-gray-700">Ensalada Fresh (x1)</Text>
                        <Text className="text-xs font-bold text-gray-900">$15.000</Text>
                    </View>
                </View>

                {/* Total a pagar */}
                <View className="border-t border-gray-100 pt-4 flex-row justify-between items-center">
                    <Text className="text-xs font-bold text-gray-900">Total a Pagar:</Text>
                    <Text className="text-base font-extrabold text-emerald-700">$27.000</Text>
                </View>
            </View>
        </ScrollView>
    );
}