import{ useEffect, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const STORAGE_KEY = "@nutrik_seller_profile";

// Cambia estos nombres por los nombres EXACTOS registrados en tu navegador.
// Si una pantalla aún no existe, déjala como null para mostrar un aviso.
const SELLER_ROUTES = {
    Inicio: "SellerDashboard",
    Productos: "SellerProducts",
    Pedidos: "SellerOrders",
    Finanzas: "SellerFinance",
    Perfil: null, // La pantalla actual
};

const CATEGORIES = [
    "Nutrición y Bienestar",
    "Alimentos saludables",
    "Suplementos y vitaminas",
    "Proteínas",
    "Productos orgánicos",
    "Otros",
];

const INITIAL_PROFILE = {
    storeName: "Nutrik Store Pro",
    email: "ventas@nutrikstore.com",
    phone: "3001234567",
    taxId: "900.123.456-1",
    category: "Nutrición y Bienestar",
    twoStepAuth: true,
    photoUri: null,
    paymentMethod: "Cuenta bancaria",
    accountLastDigits: "4589",
};

function Field({ label, icon, children }) {
    return (
        <View className="mb-4">
            <View className="mb-2 flex-row items-center">
                <Feather name={icon} size={15} color="#059669" />
                <Text className="ml-2 text-xs font-semibold text-slate-600">{label}</Text>
            </View>
            {children}
        </View>
    );
}

function ModalShell({ visible, title, subtitle, onClose, children }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                className="flex-1 justify-center bg-black/40 px-5"
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View className="rounded-3xl bg-white p-5">
                    <View className="mb-4 flex-row items-start justify-between">
                        <View className="mr-4 flex-1">
                            <Text className="text-lg font-bold text-slate-900">{title}</Text>
                            {!!subtitle && (
                                <Text className="mt-1 text-sm text-slate-500">{subtitle}</Text>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            accessibilityRole="button"
                            accessibilityLabel="Cerrar ventana"
                            className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                        >
                            <Ionicons name="close" size={20} color="#475569" />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default function SellerProfileScreen() {
    const navigation = useNavigation();

    const [profile, setProfile] = useState(INITIAL_PROFILE);
    const [draft, setDraft] = useState(INITIAL_PROFILE);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    const [activeModal, setActiveModal] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cuenta bancaria");
    const [accountDigits, setAccountDigits] = useState("4589");

    useEffect(() => {
        let mounted = true;

        async function loadProfile() {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved && mounted) {
                    const parsed = JSON.parse(saved);
                    const restored = { ...INITIAL_PROFILE, ...parsed };
                    setProfile(restored);
                    setDraft(restored);
                    setPaymentMethod(restored.paymentMethod || "Cuenta bancaria");
                    setAccountDigits(restored.accountLastDigits || "");
                }
            } catch {
                Alert.alert("Perfil", "No fue posible recuperar los datos guardados.");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        loadProfile();
        return () => {
            mounted = false;
        };
    }, []);

    const updateDraft = (key, value) => {
        setDraft((current) => ({ ...current, [key]: value }));
        setDirty(true);
    };

    const saveProfile = async () => {
        const cleanEmail = draft.email.trim();
        const cleanStore = draft.storeName.trim();
        const cleanPhone = draft.phone.replace(/\D/g, "");

        if (!cleanStore) {
            Alert.alert("Falta el nombre", "Escribe el nombre de tu tienda.");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            Alert.alert("Correo inválido", "Revisa el correo comercial e inténtalo de nuevo.");
            return;
        }
        if (cleanPhone.length < 7 || cleanPhone.length > 15) {
            Alert.alert("Teléfono inválido", "Escribe un número de teléfono válido.");
            return;
        }

        const normalized = {
            ...draft,
            storeName: cleanStore,
            email: cleanEmail,
            phone: cleanPhone,
            taxId: draft.taxId.trim(),
        };

        setSaving(true);
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
            setProfile(normalized);
            setDraft(normalized);
            setDirty(false);
            Alert.alert("Cambios guardados", "Tu perfil se guardó en este dispositivo.");
        } catch {
            Alert.alert(
                "No se pudo guardar",
                "Comprueba que el almacenamiento esté instalado y vuelve a intentarlo."
            );
        } finally {
            setSaving(false);
        }
    };

    const choosePhoto = async () => {
        try {
            const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permission.granted) {
                Alert.alert(
                    "Permiso necesario",
                    "Permite el acceso a tus fotos para elegir una imagen de perfil."
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
                updateDraft("photoUri", result.assets[0].uri);
            }
        } catch {
            Alert.alert("Imagen", "No fue posible abrir la galería.");
        }
    };

    const savePayment = () => {
        updateDraft("paymentMethod", paymentMethod);
        updateDraft("accountLastDigits", accountDigits.replace(/\D/g, "").slice(-4));
        setActiveModal(null);
        Alert.alert(
            "Método actualizado",
            "La información se aplicará al perfil cuando pulses Guardar cambios."
        );
    };

    const handlePasswordChange = () => {
        if (newPassword.length < 8) {
            Alert.alert("Contraseña débil", "Usa al menos 8 caracteres.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("No coincide", "Las contraseñas ingresadas no son iguales.");
            return;
        }

        // Beta frontend: no cambia una contraseña real. Eso requiere una API segura.
        setNewPassword("");
        setConfirmPassword("");
        setActiveModal(null);
        Alert.alert(
            "Validación completada",
            "La interfaz está lista. Para cambiar la contraseña real se necesita conectar la API de autenticación."
        );
    };

    const navigateTo = (label) => {
        if (label === "Perfil") return;

        const routeName = SELLER_ROUTES[label];
        const routeNames = navigation.getState()?.routeNames || [];

        if (!routeName) {
            Alert.alert("Ruta pendiente", `Configura la ruta de "${label}" en SELLER_ROUTES.`);
            return;
        }
        if (!routeNames.includes(routeName)) {
            Alert.alert(
                "Ruta no registrada",
                `La ruta "${routeName}" no existe en el navegador actual. Cambia SELLER_ROUTES por el nombre real.`
            );
            return;
        }
        navigation.navigate(routeName);
    };

    const confirmDeactivate = () => {
        setActiveModal(null);
        Alert.alert(
            "Desactivar cuenta",
            "Esta acción todavía no desactiva una cuenta real. En la versión beta puedes dejar preparado el flujo, pero la desactivación debe realizarse desde la API.",
            [{ text: "Entendido" }, { text: "Cancelar", style: "cancel" }]
        );
    };

    const completion = [
        !!draft.storeName.trim(),
        !!draft.email.trim(),
        !!draft.phone.trim(),
        !!draft.taxId.trim(),
        !!draft.category.trim(),
    ].filter(Boolean).length * 20;

    const inputClass =
        "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800";

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-slate-50">
                <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
                <MaterialCommunityIcons name="storefront-outline" size={38} color="#059669" />
                <Text className="mt-3 text-sm text-slate-500">Cargando perfil...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

            <ScrollView
                className="flex-1"
                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View className="mb-5 flex-row items-center justify-between">
                    <View>
                        <Text className="text-2xl font-extrabold text-slate-900">Mi perfil</Text>
                        <Text className="mt-1 text-sm text-slate-500">Administra tu tienda Nutrik</Text>
                    </View>
                    <View className="rounded-2xl bg-emerald-100 p-3">
                        <MaterialCommunityIcons name="storefront-outline" size={25} color="#047857" />
                    </View>
                </View>

                <View className="mb-6 items-center rounded-3xl border border-slate-100 bg-white px-5 py-6">
                    <View className="relative">
                        <View className="h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100">
                            {draft.photoUri ? (
                                <Image source={{ uri: draft.photoUri }} className="h-full w-full" />
                            ) : (
                                <MaterialCommunityIcons name="storefront" size={48} color="#059669" />
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={choosePhoto}
                            className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-emerald-600 p-2.5"
                            accessibilityRole="button"
                            accessibilityLabel="Cambiar foto de perfil"
                        >
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text className="mt-3 text-lg font-bold text-slate-900">Perfil de vendedor</Text>
                    <View className="mt-1 flex-row items-center">
                        <Ionicons name="checkmark-circle" size={15} color="#059669" />
                        <Text className="ml-1 text-xs font-medium text-emerald-700">Cuenta de vendedor beta</Text>
                    </View>
                    <View className="mt-5 w-full">
                        <View className="mb-2 flex-row items-center justify-between">
                            <Text className="text-xs font-semibold text-slate-500">Perfil completado</Text>
                            <Text className="text-xs font-bold text-emerald-700">{completion}%</Text>
                        </View>
                        <View className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <View className="h-full rounded-full bg-emerald-500" style={{ width: `${completion}%` }} />
                        </View>
                    </View>
                </View>

                <Text className="mb-3 ml-1 text-xs font-bold tracking-wider text-slate-400">
                    DATOS DEL NEGOCIO
                </Text>
                <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-4">
                    <Field label="Nombre comercial / tienda" icon="shopping-bag">
                        <TextInput
                            className={inputClass}
                            value={draft.storeName}
                            onChangeText={(value) => updateDraft("storeName", value)}
                            placeholder="Nombre de tu tienda"
                            maxLength={80}
                            returnKeyType="next"
                        />
                    </Field>

                    <Field label="Correo electrónico comercial" icon="mail">
                        <TextInput
                            className={inputClass}
                            value={draft.email}
                            onChangeText={(value) => updateDraft("email", value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={120}
                            placeholder="ventas@mitienda.com"
                        />
                    </Field>

                    <Field label="Teléfono / WhatsApp de ventas" icon="phone">
                        <View className="flex-row">
                            <View className="mr-2 flex-row items-center rounded-2xl border border-slate-200 bg-slate-50 px-3">
                                <Text className="text-sm">🇨🇴</Text>
                                <Text className="ml-1 text-xs font-bold text-slate-700">+57</Text>
                            </View>
                            <TextInput
                                className={`${inputClass} flex-1`}
                                value={draft.phone}
                                onChangeText={(value) => updateDraft("phone", value)}
                                keyboardType="phone-pad"
                                maxLength={15}
                                placeholder="3001234567"
                            />
                        </View>
                    </Field>

                    <View className="mb-4 flex-row">
                        <View className="mr-3 flex-1">
                            <Field label="NIT / documento" icon="file-text">
                                <TextInput
                                    className={inputClass}
                                    value={draft.taxId}
                                    onChangeText={(value) => updateDraft("taxId", value)}
                                    maxLength={30}
                                    placeholder="NIT o documento"
                                />
                            </Field>
                        </View>
                        <View className="flex-1">
                            <Field label="Categoría" icon="grid">
                                <TouchableOpacity
                                    onPress={() => setActiveModal("category")}
                                    className="min-h-12 flex-row items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3"
                                    accessibilityRole="button"
                                >
                                    <Text className="mr-1 flex-1 text-xs text-slate-800" numberOfLines={2}>
                                        {draft.category}
                                    </Text>
                                    <Ionicons name="chevron-down" size={16} color="#64748b" />
                                </TouchableOpacity>
                            </Field>
                        </View>
                    </View>
                </View>

                <Text className="mb-3 ml-1 text-xs font-bold tracking-wider text-slate-400">
                    SEGURIDAD Y ACCESO
                </Text>
                <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-4">
                    <TouchableOpacity
                        onPress={() => setActiveModal("password")}
                        className="flex-row items-center justify-between py-2"
                        accessibilityRole="button"
                    >
                        <View className="flex-1 flex-row items-center">
                            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                                <Feather name="lock" size={19} color="#059669" />
                            </View>
                            <View className="ml-3 flex-1">
                                <Text className="text-sm font-bold text-slate-800">Contraseña</Text>
                                <Text className="mt-1 text-xs text-slate-400">Gestiona el acceso a tu cuenta</Text>
                            </View>
                        </View>
                        <Text className="text-xs font-bold text-emerald-700">Modificar</Text>
                    </TouchableOpacity>

                    <View className="my-4 h-px bg-slate-100" />

                    <View className="flex-row items-center">
                        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                            <MaterialCommunityIcons name="shield-check-outline" size={21} color="#059669" />
                        </View>
                        <View className="ml-3 flex-1">
                            <Text className="text-sm font-bold text-slate-800">Verificación en dos pasos</Text>
                            <Text className="mt-1 text-xs text-slate-400">Preferencia local de la versión beta</Text>
                        </View>
                        <Switch
                            value={draft.twoStepAuth}
                            onValueChange={(value) => updateDraft("twoStepAuth", value)}
                            trackColor={{ false: "#cbd5e1", true: "#34d399" }}
                            thumbColor="#ffffff"
                        />
                    </View>
                </View>

                <Text className="mb-3 ml-1 text-xs font-bold tracking-wider text-slate-400">
                    CONFIGURACIÓN DE VENDEDOR
                </Text>
                <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-2">
                    <TouchableOpacity
                        onPress={() => {
                            setPaymentMethod(draft.paymentMethod || "Cuenta bancaria");
                            setAccountDigits(draft.accountLastDigits || "");
                            setActiveModal("payment");
                        }}
                        className="flex-row items-center p-3"
                        accessibilityRole="button"
                    >
                        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                            <Ionicons name="card-outline" size={21} color="#059669" />
                        </View>
                        <View className="ml-3 flex-1">
                            <Text className="text-sm font-bold text-slate-800">Métodos de pago y retiros</Text>
                            <Text className="mt-1 text-xs text-slate-400">
                                {draft.paymentMethod || "Sin método"} •••• {draft.accountLastDigits || "----"}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={saveProfile}
                    disabled={saving || !dirty}
                    className={`mb-3 flex-row items-center justify-center rounded-2xl py-4 ${saving || !dirty ? "bg-emerald-300" : "bg-emerald-600"
                        }`}
                    accessibilityRole="button"
                >
                    <Feather name="save" size={17} color="#fff" />
                    <Text className="ml-2 text-base font-bold text-white">
                        {saving ? "Guardando..." : dirty ? "Guardar cambios" : "Cambios guardados"}
                    </Text>
                </TouchableOpacity>

                {dirty && (
                    <TouchableOpacity
                        onPress={() => {
                            setDraft(profile);
                            setPaymentMethod(profile.paymentMethod || "Cuenta bancaria");
                            setAccountDigits(profile.accountLastDigits || "");
                            setDirty(false);
                        }}
                        className="mb-4 items-center py-2"
                    >
                        <Text className="text-sm font-semibold text-slate-500">Descartar cambios</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            "Desactivar cuenta",
                            "¿Quieres continuar? En esta versión beta no se eliminarán datos ni se desactivará una cuenta real.",
                            [
                                { text: "Cancelar", style: "cancel" },
                                { text: "Continuar", style: "destructive", onPress: confirmDeactivate },
                            ]
                        )
                    }
                    className="mb-5 items-center rounded-2xl border border-rose-100 bg-rose-50 py-4"
                >
                    <Text className="text-sm font-semibold text-rose-600">Desactivar o eliminar cuenta</Text>
                </TouchableOpacity>
            </ScrollView>



            <ModalShell
                visible={activeModal === "category"}
                title="Categoría de la tienda"
                subtitle="Selecciona la categoría que mejor describe tu negocio."
                onClose={() => setActiveModal(null)}
            >
                {CATEGORIES.map((item) => {
                    const selected = draft.category === item;
                    return (
                        <TouchableOpacity
                            key={item}
                            onPress={() => {
                                updateDraft("category", item);
                                setActiveModal(null);
                            }}
                            className={`mb-2 flex-row items-center justify-between rounded-2xl border p-4 ${selected ? "border-emerald-300 bg-emerald-50" : "border-slate-100 bg-white"
                                }`}
                        >
                            <Text className={`text-sm ${selected ? "font-bold text-emerald-800" : "text-slate-700"}`}>
                                {item}
                            </Text>
                            {selected && <Ionicons name="checkmark-circle" size={19} color="#059669" />}
                        </TouchableOpacity>
                    );
                })}
            </ModalShell>

            <ModalShell
                visible={activeModal === "password"}
                title="Modificar contraseña"
                subtitle="La validación es de demostración hasta conectar la API de autenticación."
                onClose={() => {
                    setActiveModal(null);
                    setNewPassword("");
                    setConfirmPassword("");
                }}
            >
                <Text className="mb-2 text-xs font-semibold text-slate-600">Nueva contraseña</Text>
                <TextInput
                    className={`${inputClass} mb-4`}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder="Mínimo 8 caracteres"
                    autoCapitalize="none"
                />
                <Text className="mb-2 text-xs font-semibold text-slate-600">Confirmar contraseña</Text>
                <TextInput
                    className={`${inputClass} mb-5`}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholder="Repite la contraseña"
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={handlePasswordChange} className="items-center rounded-2xl bg-emerald-600 py-4">
                    <Text className="font-bold text-white">Validar contraseña</Text>
                </TouchableOpacity>
            </ModalShell>

            <ModalShell
                visible={activeModal === "payment"}
                title="Métodos de pago y retiros"
                subtitle="Datos de demostración. No ingreses información bancaria real en esta beta."
                onClose={() => setActiveModal(null)}
            >
                <Text className="mb-2 text-xs font-semibold text-slate-600">Tipo de método</Text>
                {["Cuenta bancaria", "Billetera digital", "Pendiente de configurar"].map((method) => (
                    <TouchableOpacity
                        key={method}
                        onPress={() => setPaymentMethod(method)}
                        className={`mb-2 flex-row items-center justify-between rounded-2xl border p-3 ${paymentMethod === method ? "border-emerald-300 bg-emerald-50" : "border-slate-200"
                            }`}
                    >
                        <Text className="text-sm text-slate-700">{method}</Text>
                        {paymentMethod === method && <Ionicons name="checkmark-circle" size={18} color="#059669" />}
                    </TouchableOpacity>
                ))}
                <Text className="mb-2 mt-3 text-xs font-semibold text-slate-600">
                    Últimos 4 dígitos (dato ficticio)
                </Text>
                <TextInput
                    className={`${inputClass} mb-5`}
                    value={accountDigits}
                    onChangeText={(value) => setAccountDigits(value.replace(/\D/g, "").slice(0, 4))}
                    keyboardType="number-pad"
                    maxLength={4}
                    placeholder="4589"
                />
                <TouchableOpacity
                    onPress={savePayment}
                    className="items-center rounded-2xl bg-emerald-600 py-4"
                >
                    <Text className="font-bold text-white">Aplicar método</Text>
                </TouchableOpacity>
            </ModalShell>
        </SafeAreaView>
    );
}

