import React, {
    useState,
    useEffect,
    useRef,
} from 'react';

import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Animated,
    Dimensions,
} from 'react-native';

import {
    Feather,
    MaterialCommunityIcons,
    Ionicons,
} from '@expo/vector-icons';

// ============================================================
// DIMENSIONES
// ============================================================

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

const RegisterVendedor = ({ navigation }) => {
    const [form, setForm] = useState({
        nombreNegocio: '',
        nit: '',
        email: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        tipoProductos: '',
        descripcion: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    // ========================================================
    // ANIMACIONES PARA EL LOGO
    // ========================================================

    const logoScale = useRef(new Animated.Value(0.85)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(logoScale, {
                toValue: 1,
                friction: 7,
                tension: 45,
                useNativeDriver: true,
            }),
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 650,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const cambiar = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const enviar = () => {
        if (!form.nombreNegocio || !form.email || !form.telefono || !form.password) {
            setError('Completa los campos obligatorios de tu tienda.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError('Ingresa un correo electrónico válido.');
            return;
        }
        if (form.password.length < 8) {
            setError('La contraseña debe tener mínimo 8 caracteres.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setError('');
        setExito(true);
        setTimeout(() => {
            navigation.replace('VendedorDashboard');
        }, 1200);
    };

    const categorias = [
        { label: 'Suplementos en polvo', value: 'suplementos' },
        { label: 'Snacks saludables', value: 'snacks' },
        { label: 'Congelados', value: 'congelados' },
        { label: 'Frutas y verduras', value: 'frutas' },
        { label: 'Lácteos y huevos', value: 'lacteos' },
        { label: 'Cereales y granos', value: 'granos' },
        { label: 'Vitaminas y bienestar', value: 'vitaminas' },
        { label: 'Variedad de productos', value: 'variedad' },
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 bg-[#F2FAF4]"
            contentContainerStyle={{
                paddingTop: 20,
                paddingBottom: 40,
                paddingHorizontal: isSmallDevice ? 17 : 22,
            }}
        >
            {/* LOGO Y CABECERA */}
            <Animated.View
                style={{
                    alignItems: 'center',
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }],
                    marginBottom: 18,
                }}
            >
                <View
                    style={{
                        width: isSmallDevice ? 88 : 100,
                        height: isSmallDevice ? 88 : 100,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 28,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 8,
                        borderWidth: 1,
                        borderColor: '#E4EDE6',
                        elevation: 7,
                        shadowColor: '#14532D',
                        shadowOpacity: 0.10,
                        shadowRadius: 15,
                        shadowOffset: { width: 0, height: 6 },
                        marginBottom: 11,
                    }}
                >
                    <Image
                        source={require('../../../../assets/nutrick.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                <Text
                    style={{
                        fontSize: 23,
                        fontWeight: '900',
                        color: '#12351E',
                        textAlign: 'center',
                        marginBottom: 5,
                    }}
                >
                    Registra tu tienda
                </Text>

                <Text
                    style={{
                        fontSize: 12,
                        color: '#718078',
                        textAlign: 'center',
                        lineHeight: 18,
                        maxWidth: 310,
                    }}
                >
                    Forma parte de Nutrik y vende a miles de clientes 🏪
                </Text>
            </Animated.View>

            {/* TARJETA DEL FORMULARIO */}
            <View
                style={{
                    width: '100%',
                    maxWidth: 520,
                    alignSelf: 'center',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 28,
                    paddingHorizontal: isSmallDevice ? 17 : 21,
                    paddingVertical: 20,
                    borderWidth: 1,
                    borderColor: '#E6EFE8',
                    elevation: 8,
                    shadowColor: '#14532D',
                    shadowOpacity: 0.08,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 8 },
                }}
            >
                <Text className="text-lg font-extrabold text-[#17251B] mb-4">Datos de tu negocio</Text>

                {error ? (
                    <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
                        <Text className="text-red-600 text-xs font-bold text-center">{error}</Text>
                    </View>
                ) : null}

                {exito ? (
                    <View className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4">
                        <Text className="text-emerald-700 text-xs font-bold text-center">
                            ¡Tienda creada! Redirigiendo a tu panel...
                        </Text>
                    </View>
                ) : null}

                {/* NOMBRE NEGOCIO */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Nombre del negocio / tienda *</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Ej: Tienda Nutrik S.A.S"
                        placeholderTextColor="#A1ADA5"
                        value={form.nombreNegocio}
                        onChangeText={(text) => cambiar('nombreNegocio', text)}
                    />
                </View>

                {/* NIT */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">NIT o documento empresarial</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Ej: 901234567-8"
                        placeholderTextColor="#A1ADA5"
                        value={form.nit}
                        onChangeText={(text) => cambiar('nit', text)}
                    />
                </View>

                {/* EMAIL */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Correo del negocio *</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="ventas@tutienda.com"
                        placeholderTextColor="#A1ADA5"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={form.email}
                        onChangeText={(text) => cambiar('email', text)}
                    />
                </View>

                {/* TELEFONO */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Teléfono de contacto *</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="300 123 4567"
                        placeholderTextColor="#A1ADA5"
                        keyboardType="phone-pad"
                        value={form.telefono}
                        onChangeText={(text) => cambiar('telefono', text)}
                    />
                </View>

                {/* DIRECCION */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Dirección</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Calle 10 # 5-12"
                        placeholderTextColor="#A1ADA5"
                        value={form.direccion}
                        onChangeText={(text) => cambiar('direccion', text)}
                    />
                </View>

                {/* CIUDAD */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Ciudad</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Bogotá"
                        placeholderTextColor="#A1ADA5"
                        value={form.ciudad}
                        onChangeText={(text) => cambiar('ciudad', text)}
                    />
                </View>

                {/* TIPO DE PRODUCTOS */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">Tipo de productos que vendes *</Text>
                    <View className="flex-row flex gap-2">
                        {categorias.map((cat) => {
                            const isSelected = form.tipoProductos === cat.value;
                            return (
                                <TouchableOpacity
                                    key={cat.value}
                                    onPress={() => cambiar('tipoProductos', cat.value)}
                                    className={`px-3 py-2 rounded-xl border ${isSelected
                                            ? 'bg-[#16A34A] border-[#16A34A]'
                                            : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                        }`}
                                >
                                    <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                        {cat.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* DESCRIPCION */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Descripción del negocio</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3 text-sm text-[#17251B] h-20 text-top"
                        placeholder="Cuéntanos qué hace especial a tu tienda..."
                        placeholderTextColor="#A1ADA5"
                        multiline
                        numberOfLines={3}
                        value={form.descripcion}
                        onChangeText={(text) => cambiar('descripcion', text)}
                    />
                </View>

                {/* PASSWORD */}
                <View className="mb-4">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Contraseña del negocio * (mín. 8 caracteres)</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Crea una contraseña segura"
                        placeholderTextColor="#A1ADA5"
                        secureTextEntry
                        maxLength={32}
                        value={form.password}
                        onChangeText={(text) => cambiar('password', text)}
                    />
                </View>

                {/* CONFIRM PASSWORD */}
                <View className="mb-6">
                    <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Confirmar contraseña *</Text>
                    <TextInput
                        className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                        placeholder="Repite tu contraseña"
                        placeholderTextColor="#A1ADA5"
                        secureTextEntry
                        maxLength={32}
                        value={form.confirmPassword}
                        onChangeText={(text) => cambiar('confirmPassword', text)}
                    />
                </View>

                {/* SUBMIT BUTTON */}
                <TouchableOpacity
                    onPress={enviar}
                    className="bg-[#16A34A] py-4 rounded-2xl items-center justify-center shadow-lg shadow-emerald-700/30 mb-4"
                >
                    <Text className="text-white font-black text-sm tracking-wide">Registrar mi tienda 🚀</Text>
                </TouchableOpacity>

                {/* LINK LOGIN */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('VendedorLogin')}
                    className="items-center mt-2"
                >
                    <Text className="text-xs text-[#718078]">
                        ¿Ya tienes tienda registrada? <Text className="text-[#16A34A] font-bold">Inicia sesión aquí</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default RegisterVendedor;