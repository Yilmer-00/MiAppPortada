import React, { useEffect, useMemo, useState } from "react";
import {
    Alert, Linking, Modal, SafeAreaView, ScrollView, StatusBar, Text,
    TextInput, TouchableOpacity, View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const STORAGE_KEY = "@nutrik_support_tickets";

// Sustituye los nombres por las rutas reales de tu navegador.
// const SUPPORT_ROUTES = {
//     Inicio: "SellerDashboard",
//     Productos: "SellerProducts",
//     Pedidos: "SellerOrders",
//     Finanzas: "SellerFinance",
//     Perfil: "SellerProfile",
//     Ayuda: null,
// };

// Configura únicamente canales oficiales de Nutrik. Vacíos = aviso en pantalla.
const SUPPORT_CONFIG = {
    email: "", // Ej.: soporte@tudominio.com
    whatsappNumber: "", // Ej.: 573001234567, solo dígitos con código de país
    helpCenterUrl: "", // Ej.: https://tudominio.com/ayuda
};

const FAQS = [
    { id: "orders", category: "Pedidos", question: "¿Dónde reviso mis pedidos?", answer: "Abre Pedidos desde el menú de vendedor. El contenido real aparecerá cuando esa pantalla esté conectada a tus datos." },
    { id: "products", category: "Productos", question: "¿Cómo agrego o edito un producto?", answer: "Entra a Productos y utiliza sus opciones para crear o editar. Si la pantalla aún no existe, registra su ruta en la navegación de vendedor." },
    { id: "profile", category: "Cuenta", question: "¿Cómo actualizo los datos de mi tienda?", answer: "Ve a Perfil, edita los campos y pulsa Guardar cambios. En la beta, los datos se almacenan localmente en el dispositivo." },
    { id: "payments", category: "Pagos", question: "¿Nutrik procesa pagos y retiros?", answer: "No en esta beta. Las opciones de pago son demostrativas hasta integrar un backend seguro y un proveedor de pagos." },
    { id: "password", category: "Cuenta", question: "¿Cómo cambio o recupero mi contraseña?", answer: "La recuperación real necesita un sistema de autenticación conectado. No compartas tu contraseña con nadie ni la incluyas en una solicitud de soporte." },
    { id: "security", category: "Seguridad", question: "¿La verificación en dos pasos está activa?", answer: "No todavía. La preferencia visual no activa una segunda verificación real hasta integrarla con el backend." },
];
const CATEGORIES = ["Todos", "Pedidos", "Productos", "Cuenta", "Pagos", "Seguridad"];

function ModalShell({ visible, title, subtitle, onClose, children }) {
    return (
        <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
            <View className="flex-1 justify-center bg-black/40 px-5">
                <View className="max-h-[85%] rounded-3xl bg-white p-5">
                    <View className="mb-4 flex-row items-start justify-between">
                        <View className="mr-3 flex-1">
                            <Text className="text-lg font-bold text-slate-900">{title}</Text>
                            {!!subtitle && <Text className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</Text>}
                        </View>
                        <TouchableOpacity onPress={onClose} className="h-9 w-9 items-center justify-center rounded-full bg-slate-100" accessibilityLabel="Cerrar">
                            <Ionicons name="close" size={20} color="#475569" />
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    );
}

function ActionRow({ icon, title, description, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center rounded-2xl p-3" accessibilityRole="button">
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50">
                <Feather name={icon} size={20} color="#059669" />
            </View>
            <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-slate-800">{title}</Text>
                <Text className="mt-1 text-xs leading-4 text-slate-500">{description}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
        </TouchableOpacity>
    );
}

export default function SellerSupportScreen() {
    const navigation = useNavigation();
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Todos");
    const [expanded, setExpanded] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [priority, setPriority] = useState("Normal");
    const [tickets, setTickets] = useState([]);
    const [saving, setSaving] = useState(false);
    const [showTickets, setShowTickets] = useState(false);

    useEffect(() => {
        let mounted = true;
        AsyncStorage.getItem(STORAGE_KEY).then(raw => {
            if (mounted && raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) setTickets(parsed);
            }
        }).catch(() => Alert.alert("Ayuda", "No se pudo cargar el historial local."));
        return () => { mounted = false; };
    }, []);

    const filteredFaqs = useMemo(() => {
        const q = query.trim().toLowerCase();
        return FAQS.filter(f =>
            (category === "Todos" || f.category === category) &&
            (!q || `${f.question} ${f.answer} ${f.category}`.toLowerCase().includes(q))
        );
    }, [query, category]);

    const openContact = async (type) => {
        let url = "";
        if (type === "email") {
            if (!SUPPORT_CONFIG.email.trim()) {
                Alert.alert("Correo pendiente", "Configura SUPPORT_CONFIG.email con el correo oficial de soporte.");
                return;
            }
            url = `mailto:${SUPPORT_CONFIG.email}?subject=${encodeURIComponent("Soporte Nutrik")}`;
        } else if (type === "whatsapp") {
            const number = SUPPORT_CONFIG.whatsappNumber.replace(/\D/g, "");
            if (!number) {
                Alert.alert("WhatsApp pendiente", "Configura SUPPORT_CONFIG.whatsappNumber con el número oficial.");
                return;
            }
            url = `https://wa.me/${number}?text=${encodeURIComponent("Hola, necesito ayuda con Nutrik como vendedor.")}`;
        } else {
            if (!SUPPORT_CONFIG.helpCenterUrl.trim()) {
                Alert.alert("Centro de ayuda pendiente", "Configura SUPPORT_CONFIG.helpCenterUrl con la URL oficial.");
                return;
            }
            url = SUPPORT_CONFIG.helpCenterUrl.trim();
        }
        try {
            if (type === "email" && !(await Linking.canOpenURL(url))) {
                Alert.alert("Correo no disponible", "No hay una aplicación de correo configurada.");
                return;
            }
            await Linking.openURL(url);
        } catch {
            Alert.alert("No se pudo abrir", "Comprueba la configuración del canal e inténtalo de nuevo.");
        }
    };

    const submitTicket = async () => {
        const cleanSubject = subject.trim();
        const cleanMessage = message.trim();
        if (cleanSubject.length < 4) {
            Alert.alert("Asunto muy corto", "Escribe un asunto de al menos 4 caracteres.");
            return;
        }
        if (cleanMessage.length < 10) {
            Alert.alert("Describe el problema", "Escribe al menos 10 caracteres.");
            return;
        }
        const ticket = {
            id: `NTR-${Date.now().toString().slice(-8)}`,
            subject: cleanSubject,
            message: cleanMessage,
            priority,
            status: "Pendiente local",
            createdAt: new Date().toISOString(),
        };
        setSaving(true);
        try {
            const updated = [ticket, ...tickets];
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            setTickets(updated);
            setSubject("");
            setMessage("");
            setPriority("Normal");
            setModalVisible(false);
            Alert.alert("Solicitud guardada", `Código ${ticket.id}. Se guardó en este dispositivo; aún no se ha enviado al equipo de soporte porque falta conectar una API.`);
        } catch {
            Alert.alert("No se pudo guardar", "Comprueba el almacenamiento e inténtalo de nuevo.");
        } finally {
            setSaving(false);
        }
    };

    const clearTickets = () => Alert.alert("Borrar historial local", "Se eliminarán las solicitudes de este dispositivo.", [
        { text: "Cancelar", style: "cancel" },
        {
            text: "Borrar", style: "destructive", onPress: async () => {
                try { await AsyncStorage.removeItem(STORAGE_KEY); setTickets([]); setShowTickets(false); }
                catch { Alert.alert("Error", "No se pudo borrar el historial."); }
            }
        },
    ]);

    const navigateTo = (label) => {
        if (label === "Ayuda") return;
        const route = SUPPORT_ROUTES[label];
        const registered = navigation.getState()?.routeNames || [];
        if (!route) {
            Alert.alert("Ruta pendiente", `Configura la ruta de "${label}" en SUPPORT_ROUTES.`);
        } else if (!registered.includes(route)) {
            Alert.alert("Ruta no registrada", `La ruta "${route}" no existe en el navegador actual. Cambia SUPPORT_ROUTES por el nombre real.`);
        } else {
            navigation.navigate(route);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
            <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View className="mb-5 flex-row items-center justify-between">
                    <View className="flex-1 pr-3">
                        <Text className="text-2xl font-extrabold text-slate-900">Centro de ayuda</Text>
                        <Text className="mt-1 text-sm leading-5 text-slate-500">Estamos aquí para ayudarte con tu tienda Nutrik.</Text>
                    </View>
                    <View className="h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <MaterialCommunityIcons name="lifebuoy" size={27} color="#047857" />
                    </View>
                </View>

                <View className="mb-6 rounded-3xl bg-emerald-700 p-5">
                    <View className="mb-3 h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                        <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
                    </View>
                    <Text className="text-xl font-extrabold text-white">¿En qué podemos ayudarte?</Text>
                    <Text className="mt-2 text-sm leading-5 text-emerald-50">Busca una respuesta o crea una solicitud. En esta beta se guarda localmente.</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} className="mt-5 flex-row items-center justify-center rounded-2xl bg-white py-3.5">
                        <Feather name="message-square" size={17} color="#047857" />
                        <Text className="ml-2 font-bold text-emerald-800">Crear solicitud</Text>
                    </TouchableOpacity>
                </View>

                <Text className="mb-3 ml-1 text-xs font-bold tracking-wider text-slate-400">CONTACTAR CON SOPORTE</Text>
                <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-2">
                    <ActionRow icon="mail" title="Correo electrónico" description="Abrir un mensaje para soporte" onPress={() => openContact("email")} />
                    <View className="mx-3 h-px bg-slate-100" />
                    <ActionRow icon="message-circle" title="WhatsApp" description="Contactar con el número oficial" onPress={() => openContact("whatsapp")} />
                    <View className="mx-3 h-px bg-slate-100" />
                    <ActionRow icon="book-open" title="Centro de ayuda web" description="Consultar la guía oficial" onPress={() => openContact("web")} />
                </View>

                <View className="mb-3 flex-row items-center justify-between">
                    <Text className="mb-3 ml-1 text-xs font-bold tracking-wider text-slate-400">PREGUNTAS FRECUENTES</Text>
                    <Text className="mb-3 text-xs text-slate-400">{filteredFaqs.length} resultados</Text>
                </View>
                <View className="mb-3 flex-row items-center rounded-2xl border border-slate-200 bg-white px-4">
                    <Feather name="search" size={18} color="#94a3b8" />
                    <TextInput value={query} onChangeText={setQuery} placeholder="Buscar una pregunta..." placeholderTextColor="#94a3b8" className="flex-1 px-3 py-3.5 text-sm text-slate-800" returnKeyType="search" />
                    {!!query && <TouchableOpacity onPress={() => setQuery("")}><Ionicons name="close-circle" size={19} color="#94a3b8" /></TouchableOpacity>}
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4" contentContainerStyle={{ paddingRight: 8 }}>
                    {CATEGORIES.map(item => {
                        const selected = category === item;
                        return <TouchableOpacity key={item} onPress={() => setCategory(item)} className={`mr-2 rounded-full border px-4 py-2 ${selected ? "border-emerald-600 bg-emerald-600" : "border-slate-200 bg-white"}`}>
                            <Text className={`text-xs font-semibold ${selected ? "text-white" : "text-slate-600"}`}>{item}</Text>
                        </TouchableOpacity>;
                    })}
                </ScrollView>

                <View className="mb-6 rounded-3xl border border-slate-100 bg-white p-2">
                    {filteredFaqs.length ? filteredFaqs.map((faq, index) => {
                        const isOpen = expanded === faq.id;
                        return <View key={faq.id}>
                            {index > 0 && <View className="mx-3 h-px bg-slate-100" />}
                            <TouchableOpacity onPress={() => setExpanded(isOpen ? null : faq.id)} className="flex-row items-center px-3 py-4" accessibilityRole="button" accessibilityState={{ expanded: isOpen }}>
                                <View className="mr-3 flex-1">
                                    <Text className="mb-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">{faq.category}</Text>
                                    <Text className="text-sm font-semibold leading-5 text-slate-800">{faq.question}</Text>
                                </View>
                                <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={18} color="#64748b" />
                            </TouchableOpacity>
                            {isOpen && <View className="mx-3 mb-4 rounded-2xl bg-slate-50 p-4"><Text className="text-sm leading-6 text-slate-600">{faq.answer}</Text></View>}
                        </View>;
                    }) : <View className="items-center px-5 py-8">
                        <Feather name="search" size={28} color="#94a3b8" />
                        <Text className="mt-3 text-sm font-bold text-slate-700">No encontramos resultados</Text>
                        <Text className="mt-1 text-center text-xs leading-5 text-slate-500">Prueba otra palabra o cambia la categoría.</Text>
                        <TouchableOpacity onPress={() => { setQuery(""); setCategory("Todos"); }} className="mt-3 rounded-xl bg-emerald-50 px-4 py-2"><Text className="text-xs font-bold text-emerald-700">Limpiar filtros</Text></TouchableOpacity>
                    </View>}
                </View>

                <View className="mb-5 rounded-3xl border border-slate-100 bg-white p-4">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-1 pr-2">
                            <Text className="text-base font-bold text-slate-900">Mis solicitudes</Text>
                            <Text className="mt-1 text-xs leading-5 text-slate-500">Historial guardado en este dispositivo.</Text>
                        </View>
                        <View className="rounded-2xl bg-emerald-50 px-3 py-2"><Text className="text-sm font-extrabold text-emerald-700">{tickets.length}</Text></View>
                    </View>
                    <TouchableOpacity onPress={() => setShowTickets(v => !v)} className="mt-4 flex-row items-center justify-center rounded-2xl border border-slate-200 py-3">
                        <Text className="text-sm font-bold text-slate-700">{showTickets ? "Ocultar historial" : "Ver historial"}</Text>
                        <Ionicons name={showTickets ? "chevron-up" : "chevron-down"} size={17} color="#475569" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                    {showTickets && <View className="mt-3">
                        {!tickets.length ? <Text className="py-4 text-center text-sm text-slate-500">Aún no tienes solicitudes guardadas.</Text> : tickets.map(ticket =>
                            <View key={ticket.id} className="mb-2 rounded-2xl bg-slate-50 p-3">
                                <View className="flex-row items-start justify-between">
                                    <Text className="mr-2 flex-1 text-sm font-bold text-slate-800">{ticket.subject}</Text>
                                    <View className="rounded-full bg-amber-100 px-2 py-1"><Text className="text-[10px] font-bold text-amber-800">{ticket.status}</Text></View>
                                </View>
                                <Text className="mt-2 text-xs leading-5 text-slate-600">{ticket.message}</Text>
                                <Text className="mt-2 text-[10px] text-slate-400">{ticket.id} · Prioridad {ticket.priority} · {new Date(ticket.createdAt).toLocaleString()}</Text>
                            </View>
                        )}
                        {!!tickets.length && <TouchableOpacity onPress={clearTickets} className="mt-2 items-center py-2"><Text className="text-xs font-semibold text-rose-600">Borrar historial local</Text></TouchableOpacity>}
                    </View>}
                </View>

                <View className="items-center pb-2">
                    <MaterialCommunityIcons name="leaf" size={22} color="#059669" />
                    <Text className="mt-1 text-xs font-bold text-slate-600">Nutrik · Ayuda al vendedor</Text>
                    <Text className="mt-1 text-center text-[10px] leading-4 text-slate-400">Versión beta · Las solicitudes aún no se envían a un servidor.</Text>
                </View>
            </ScrollView>

            <ModalShell visible={modalVisible} title="Crear solicitud de soporte" subtitle="Describe el inconveniente. Se guardará localmente; aún no se enviará al equipo." onClose={() => setModalVisible(false)}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Text className="mb-2 text-xs font-semibold text-slate-600">Asunto</Text>
                    <TextInput value={subject} onChangeText={setSubject} placeholder="Ej. No puedo actualizar un producto" maxLength={100} className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
                    <Text className="mb-2 text-xs font-semibold text-slate-600">Prioridad</Text>
                    <View className="mb-4 flex-row">
                        {["Baja", "Normal", "Alta"].map(item => {
                            const selected = priority === item;
                            return <TouchableOpacity key={item} onPress={() => setPriority(item)} className={`mr-2 flex-1 items-center rounded-xl border py-3 ${selected ? "border-emerald-500 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                                <Text className={`text-xs font-bold ${selected ? "text-emerald-700" : "text-slate-600"}`}>{item}</Text>
                            </TouchableOpacity>;
                        })}
                    </View>
                    <Text className="mb-2 text-xs font-semibold text-slate-600">Descripción</Text>
                    <TextInput value={message} onChangeText={setMessage} placeholder="Cuéntanos qué pasó y qué intentabas hacer..." multiline textAlignVertical="top" maxLength={1500} className="mb-2 min-h-32 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800" />
                    <Text className="mb-5 text-right text-[10px] text-slate-400">{message.length}/1500 caracteres</Text>
                    <TouchableOpacity onPress={submitTicket} disabled={saving} className={`mb-2 items-center rounded-2xl py-4 ${saving ? "bg-emerald-300" : "bg-emerald-600"}`}>
                        <Text className="font-bold text-white">{saving ? "Guardando..." : "Guardar solicitud"}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ModalShell>
        </SafeAreaView>
    );
}
