
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Switch,
    TouchableOpacity,
    ScrollView,
    Animated,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Configuración inicial de la tienda
const INITIAL_VALUES = {
    storeName: 'Nutrik – Alimenta tu bienestar',
    nit: '900.123.456-7',
    address: 'Cra 15 #93-47, Bogotá',
    prefix: 'FAC-',
    nextNum: '0006',
    cash: true,
    transfer: true,
    card: false,
};

// Botón con animación de escala al presionarlo
function AnimatedButton({
    title,
    icon,
    onPress,
    variant = 'primary',
    disabled = false,
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const isPrimary = variant === 'primary';

    const animateScale = (value) => {
        Animated.spring(scale, {
            toValue: value,
            useNativeDriver: true,
            speed: 30,
            bounciness: 4,
        }).start();
    };

    return (
        <Animated.View
            className="flex-1"
            style={{ transform: [{ scale }] }}
        >
            <TouchableOpacity
                activeOpacity={0.85}
                disabled={disabled}
                onPressIn={() => animateScale(0.96)}
                onPressOut={() => animateScale(1)}
                onPress={onPress}
                className={`min-h-[54px] flex-row items-center justify-center rounded-2xl px-3 ${isPrimary
                    ? 'bg-emerald-600'
                    : 'border border-slate-200 bg-white'
                    } ${disabled ? 'opacity-50' : ''}`}
                style={
                    isPrimary
                        ? {
                            elevation: 4,
                            shadowColor: '#059669',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.18,
                            shadowRadius: 8,
                        }
                        : {}
                }
            >
                <Ionicons
                    name={icon}
                    size={19}
                    color={isPrimary ? '#FFFFFF' : '#475569'}
                />
                <Text
                    className={`ml-2 text-sm font-bold ${isPrimary ? 'text-white' : 'text-slate-700'
                        }`}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

// Campo reutilizable
function FormField({
    label,
    value,
    onChangeText,
    placeholder,
    icon,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    maxLength,
}) {
    return (
        <View className="mb-5">
            <Text className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-600">
                {label}
            </Text>

            <View className="flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 focus:border-emerald-500">
                <Ionicons name={icon} size={19} color="#64748B" />

                <TextInput
                    className="min-h-[52px] flex-1 px-3 text-base text-slate-900"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94A3B8"
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    maxLength={maxLength}
                    accessibilityLabel={label}
                    returnKeyType="next"
                />
            </View>
        </View>
    );
}

// Fila para configurar métodos de pago
function PaymentOption({
    title,
    description,
    icon,
    value,
    onValueChange,
    last = false,
}) {
    return (
        <View
            className={`flex-row items-center py-4 ${last ? '' : 'border-b border-slate-100'
                }`}
        >
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                <Ionicons name={icon} size={21} color="#059669" />
            </View>

            <View className="flex-1 pr-2">
                <Text className="text-sm font-bold text-slate-800">
                    {title}
                </Text>
                <Text className="mt-1 text-xs leading-5 text-slate-500">
                    {description}
                </Text>
            </View>

            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: '#CBD5E1',
                    true: '#6EE7B7',
                }}
                thumbColor={value ? '#059669' : '#F8FAFC'}
                accessibilityLabel={title}
            />
        </View>
    );
}

export default function EditarTiendaScreen({ onSave }) {
    const navigation = useNavigation();

    const [form, setForm] = useState({ ...INITIAL_VALUES });
    const [saving, setSaving] = useState(false);

    // Animación de entrada
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(24)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 550,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                speed: 16,
                bounciness: 3,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    // Actualizar un campo sin perder los demás
    const updateField = (key, value) => {
        setForm((previous) => ({
            ...previous,
            [key]: value,
        }));
    };

    // Cancelar y restaurar los valores iniciales

    const handleCancel = () => {
        Alert.alert(
            'Cancelar cambios',
            '¿Deseas descartar los cambios realizados?',
            [
                {
                    text: 'Seguir editando',
                    style: 'cancel',
                },
                {
                    text: 'Descartar',
                    style: 'destructive',
                    onPress: () => {
                        setForm({ ...INITIAL_VALUES });

                        navigation.navigate('Soporte');
                    },
                },
            ],
        );
    };


    // Validar y guardar
    const handleSave = async () => {
        if (saving) return;

        if (
            !form.storeName.trim() ||
            !form.nit.trim() ||
            !form.address.trim()
        ) {
            Alert.alert(
                'Campos obligatorios',
                'Completa el nombre de la tienda, el NIT y la dirección.',
            );
            return;
        }

        if (!form.prefix.trim()) {
            Alert.alert(
                'Prefijo requerido',
                'Escribe el prefijo de tus facturas.',
            );
            return;
        }

        if (!/^\d+$/.test(form.nextNum.trim())) {
            Alert.alert(
                'Número inválido',
                'El siguiente número de factura debe contener solo dígitos.',
            );
            return;
        }

        if (!form.cash && !form.transfer && !form.card) {
            Alert.alert(
                'Método de pago',
                'Activa al menos un método de pago para tu tienda.',
            );
            return;
        }

        try {
            setSaving(true);

            const data = {
                ...form,
                storeName: form.storeName.trim(),
                nit: form.nit.trim(),
                address: form.address.trim(),
                prefix: form.prefix.trim().toUpperCase(),
                nextNum: form.nextNum.trim(),
            };

            // El componente padre debe proporcionar onSave.
            if (typeof onSave !== 'function') {
                Alert.alert(
                    'Falta configurar el guardado',
                    'Conecta la función onSave desde el componente padre para guardar la configuración.',
                );
                return;
            }

            await onSave(data);

            Alert.alert(
                '¡Configuración guardada!',
                'Los cambios se enviaron correctamente.',
            );
        } catch (error) {
            Alert.alert(
                'No se pudo guardar',
                'Ocurrió un error al guardar. Inténtalo nuevamente.',
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-slate-50"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                className="flex-1"
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 20,
                    paddingBottom: 40,
                }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    }}
                >
                    {/* Encabezado */}
                    <View className="mb-6">
                        <View className="mb-3 h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                            <Ionicons
                                name="storefront-outline"
                                size={29}
                                color="#047857"
                            />
                        </View>

                        <Text className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Configura tu tienda
                        </Text>

                        <Text className="mt-2 text-sm leading-6 text-slate-500">
                            Administra los datos de tu negocio y las opciones
                            de facturación de Nutrik.
                        </Text>
                    </View>

                    {/* Tarjeta de datos generales */}
                    <View className="mb-5 rounded-3xl border border-slate-100 bg-white p-5">
                        <View className="mb-5 flex-row items-center">
                            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <Ionicons
                                    name="business-outline"
                                    size={21}
                                    color="#059669"
                                />
                            </View>

                            <View className="flex-1">
                                <Text className="text-lg font-extrabold text-slate-900">
                                    Datos de la tienda
                                </Text>
                                <Text className="mt-1 text-xs text-slate-500">
                                    Información de tu negocio
                                </Text>
                            </View>
                        </View>

                        <FormField
                            label="Nombre de la tienda"
                            value={form.storeName}
                            onChangeText={(value) => updateField('storeName', value)}
                            placeholder="Nombre de tu negocio"
                            icon="storefront-outline"
                        />

                        <FormField
                            label="NIT"
                            value={form.nit}
                            onChangeText={(value) => updateField('nit', value)}
                            placeholder="Ej. 900.123.456-7"
                            icon="document-text-outline"
                            keyboardType="default"
                            autoCapitalize="characters"
                        />

                        <FormField
                            label="Dirección"
                            value={form.address}
                            onChangeText={(value) => updateField('address', value)}
                            placeholder="Dirección de tu tienda"
                            icon="location-outline"
                        />

                        {/* Moneda e IVA */}
                        <View className="flex-row">
                            <View className="mr-3 flex-1 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                                <Ionicons
                                    name="cash-outline"
                                    size={20}
                                    color="#047857"
                                />
                                <Text className="mt-3 text-xs font-medium text-slate-500">
                                    Moneda
                                </Text>
                                <Text className="mt-1 text-base font-extrabold text-emerald-800">
                                    COP ($)
                                </Text>
                            </View>

                            <View className="flex-1 rounded-2xl border border-emerald-100 bg-emerald-50 p-3">
                                <Ionicons
                                    name="receipt-outline"
                                    size={20}
                                    color="#047857"
                                />
                                <Text className="mt-3 text-xs font-medium text-slate-500">
                                    IVA por defecto
                                </Text>
                                <Text className="mt-1 text-base font-extrabold text-emerald-800">
                                    19 %
                                </Text>
                            </View>
                        </View>

                        <Text className="mt-3 text-xs leading-5 text-slate-400">
                            La moneda y el IVA son valores informativos en esta
                            versión. No se pueden modificar desde este formulario.
                        </Text>
                    </View>

                    {/* Tarjeta de facturación */}
                    <View className="mb-5 rounded-3xl border border-slate-100 bg-white p-5">
                        <View className="mb-5 flex-row items-center">
                            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <Ionicons
                                    name="receipt-outline"
                                    size={21}
                                    color="#059669"
                                />
                            </View>

                            <View className="flex-1">
                                <Text className="text-lg font-extrabold text-slate-900">
                                    Facturación
                                </Text>
                                <Text className="mt-1 text-xs text-slate-500">
                                    Personaliza la numeración
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row">
                            <View className="mr-3 flex-1">
                                <FormField
                                    label="Prefijo"
                                    value={form.prefix}
                                    onChangeText={(value) => updateField('prefix', value)}
                                    placeholder="FAC-"
                                    icon="pricetag-outline"
                                    autoCapitalize="characters"
                                    maxLength={10}
                                />
                            </View>

                            <View className="flex-1">
                                <FormField
                                    label="Siguiente número"
                                    value={form.nextNum}
                                    onChangeText={(value) => updateField('nextNum', value)}
                                    placeholder="0006"
                                    icon="list-outline"
                                    keyboardType="numeric"
                                    maxLength={12}
                                />
                            </View>
                        </View>

                        <View className="rounded-2xl bg-slate-50 p-4">
                            <Text className="text-xs font-semibold text-slate-500">
                                VISTA PREVIA DE FACTURA
                            </Text>
                            <Text className="mt-2 text-xl font-extrabold text-emerald-700">
                                {form.prefix.trim().toUpperCase() || 'FAC-'}
                                {form.nextNum.trim() || '0000'}
                            </Text>
                        </View>
                    </View>

                    {/* Métodos de pago */}
                    <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-5">
                        <View className="mb-2 flex-row items-center">
                            <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                                <Ionicons
                                    name="wallet-outline"
                                    size={21}
                                    color="#059669"
                                />
                            </View>

                            <View className="flex-1">
                                <Text className="text-lg font-extrabold text-slate-900">
                                    Métodos de pago
                                </Text>
                                <Text className="mt-1 text-xs text-slate-500">
                                    Selecciona cómo pueden pagarte
                                </Text>
                            </View>
                        </View>

                        <PaymentOption
                            title="Efectivo"
                            description="Pago contra entrega o en tienda"
                            icon="cash-outline"
                            value={form.cash}
                            onValueChange={(value) => updateField('cash', value)}
                        />

                        <PaymentOption
                            title="Transferencia bancaria"
                            description="Nequi, Daviplata o cuenta bancaria"
                            icon="phone-portrait-outline"
                            value={form.transfer}
                            onValueChange={(value) => updateField('transfer', value)}
                        />

                        <PaymentOption
                            title="Tarjeta débito o crédito"
                            description="Requiere una pasarela de pagos integrada"
                            icon="card-outline"
                            value={form.card}
                            onValueChange={(value) => updateField('card', value)}
                            last
                        />

                        <View className="mt-3 flex-row items-start rounded-2xl bg-amber-50 p-3">
                            <Ionicons
                                name="information-circle-outline"
                                size={19}
                                color="#B45309"
                            />
                            <Text className="ml-2 flex-1 text-xs leading-5 text-amber-800">
                                Activar un método aquí configura la preferencia
                                visual; no integra por sí solo una pasarela de pago.
                            </Text>
                        </View>
                    </View>

                    {/* Acciones */}
                    <View className="flex-row gap-3">
                        <AnimatedButton
                            title="Cancelar"
                            icon="close-circle-outline"
                            variant="secondary"
                            onPress={handleCancel}
                            disabled={saving}
                        />

                        <AnimatedButton
                            title={saving ? 'Guardando...' : 'Guardar cambios'}
                            icon={saving ? 'time-outline' : 'checkmark-circle-outline'}
                            variant="primary"
                            onPress={handleSave}
                            disabled={saving}
                        />
                    </View>

                    <View className="mt-5 flex-row items-center justify-center">
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={16}
                            color="#94A3B8"
                        />
                        <Text className="ml-2 text-xs text-slate-400">
                            Revisa los datos antes de guardar
                        </Text>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
