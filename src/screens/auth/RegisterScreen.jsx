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
    Image,
    TouchableOpacity,
    Animated,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Dimensions,
} from 'react-native';

import {
    Ionicons,
    MaterialCommunityIcons,
    Feather,
} from '@expo/vector-icons';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// ============================================================
// DIMENSIONES
// ============================================================

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

// ============================================================
// REGISTER SCREEN
// ============================================================

export default function RegisterScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    // ========================================================
    // ESTADOS DEL FORMULARIO
    // ========================================================

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('saludable');
    const [acceptTerms, setAcceptTerms] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // ========================================================
    // NUEVO: TIPO DE CUENTA
    // ========================================================

    const [accountType, setAccountType] = useState('cliente');

    // ========================================================
    // ANIMACIONES
    // ========================================================

    const logoScale = useRef(new Animated.Value(0.85)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;
    const cardTranslate = useRef(new Animated.Value(25)).current;

    // ========================================================
    // ANIMACIÓN INICIAL
    // ========================================================

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
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 650,
                delay: 120,
                useNativeDriver: true,
            }),
            Animated.spring(cardTranslate, {
                toValue: 0,
                friction: 8,
                tension: 45,
                delay: 100,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    // ========================================================
    // VALIDACIÓN DE CONTRASEÑA
    // ========================================================

    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    const metCount = [
        hasLength,
        hasNumber,
        hasUpperCase,
    ].filter(Boolean).length;

    // ========================================================
    // ANCHO DE BARRA DE SEGURIDAD
    // ========================================================

    const getProgressWidth = () => {
        if (metCount === 1) return '33%';
        if (metCount === 2) return '66%';
        if (metCount >= 3) return '100%';
        return '0%';
    };

    // ========================================================
    // SELECCIONAR TIPO DE CUENTA
    // ========================================================

    const selectAccountType = (type) => {
        setAccountType(type);
    };

    // ========================================================
    // CREAR CUENTA
    // ========================================================

    const handleRegister = () => {
        if (!nombre.trim()) {
            Alert.alert(
                'Falta tu nombre',
                'Por favor ingresa tu nombre completo.'
            );
            return;
        }

        if (!email.trim()) {
            Alert.alert(
                'Falta tu correo',
                'Por favor ingresa un correo electrónico.'
            );
            return;
        }

        if (!hasLength || !hasNumber || !hasUpperCase) {
            Alert.alert(
                'Contraseña débil',
                'Tu contraseña debe tener al menos 8 caracteres, un número y una mayúscula.'
            );
            return;
        }

        if (!acceptTerms) {
            Alert.alert(
                'Términos pendientes',
                'Debes aceptar los términos de servicio para continuar.'
            );
            return;
        }

        console.log('Registro:', {
            nombre,
            email,
            accountType,
            selectedGoal,
        });

        navigation.navigate('MainTabNavigator');
    };

    // ========================================================
    // RENDER
    // ========================================================

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F2FAF4' }}>
            <LinearGradient
                colors={['#F4FBF6', '#E7F7EB', '#F8FCF9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ flex: 1 }}
            >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingTop: insets.top + 10,
                            paddingBottom: insets.bottom + 30,
                            paddingHorizontal: isSmallDevice ? 17 : 22,
                        }}
                    >
                        {/* CABECERA */}
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'flex-end',
                                marginBottom: 10,
                            }}
                        >

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        'ProfileScreen'
                                    )
                                }
                                activeOpacity={0.75}
                                style={{
                                    width: 44,
                                    height: 44,

                                    borderRadius: 22,

                                    backgroundColor: '#FFFFFF',

                                    alignItems: 'center',
                                    justifyContent: 'center',

                                    borderWidth: 1,
                                    borderColor: '#E5EEE7',

                                    elevation: 3,

                                    shadowColor: '#14532D',
                                    shadowOpacity: 0.08,
                                    shadowRadius: 8,
                                    shadowOffset: {
                                        width: 0,
                                        height: 3,
                                    },
                                }}
                            >

                                <Feather
                                    name="user"
                                    size={19}
                                    color="#14532D"
                                />

                            </TouchableOpacity>

                        </View>

                        {/* LOGO */}
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
                                    source={require('../../../assets/nutrick.png')}
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
                                Crea tu cuenta
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
                                Únete a Nutrik y comienza tu experiencia saludable.
                            </Text>
                        </Animated.View>

                        {/* TARJETA PRINCIPAL */}
                        <Animated.View
                            style={{
                                opacity: cardOpacity,
                                transform: [{ translateY: cardTranslate }],
                            }}
                        >
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
                                {/* TABS */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#F3F6F4',
                                        borderRadius: 16,
                                        padding: 4,
                                        marginBottom: 20,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Login')}
                                        activeOpacity={0.7}
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: 11,
                                            borderRadius: 12,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '700',
                                                color: '#89958E',
                                            }}
                                        >
                                            Iniciar sesión
                                        </Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 12,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingVertical: 11,
                                            elevation: 2,
                                        }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: 3,
                                                    backgroundColor: '#16A34A',
                                                    marginRight: 6,
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: '800',
                                                    color: '#17251B',
                                                }}
                                            >
                                                Registrarse
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* TIPO DE CUENTA */}
                                <View style={{ marginBottom: 21 }}>
                                    <View style={{ marginBottom: 10 }}>
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '900',
                                                color: '#17251B',
                                                marginBottom: 4,
                                            }}
                                        >
                                            ¿Cómo quieres registrarte?
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                color: '#89958E',
                                                lineHeight: 15,
                                            }}
                                        >
                                            Selecciona el tipo de cuenta que deseas utilizar.
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', gap: 10 }}>
                                        {/* CLIENTE */}
                                        <TouchableOpacity
                                            onPress={() => selectAccountType('cliente')}
                                            activeOpacity={0.85}
                                            style={{
                                                flex: 1,
                                                minHeight: 94,
                                                padding: 12,
                                                borderRadius: 18,
                                                backgroundColor: accountType === 'cliente' ? '#ECFDF3' : '#F8FAF9',
                                                borderWidth: 1.5,
                                                borderColor: accountType === 'cliente' ? '#16A34A' : '#E4ECE6',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: 11,
                                                        backgroundColor: accountType === 'cliente' ? '#DCFCE7' : '#EAF1EC',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <Ionicons
                                                        name="person-outline"
                                                        size={17}
                                                        color={accountType === 'cliente' ? '#15803D' : '#718078'}
                                                    />
                                                </View>
                                                {accountType === 'cliente' && (
                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            backgroundColor: '#16A34A',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                                                    </View>
                                                )}
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: '900',
                                                    color: '#17251B',
                                                    marginBottom: 3,
                                                }}
                                            >
                                                Cliente
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 9,
                                                    color: '#7A8780',
                                                    lineHeight: 13,
                                                }}
                                            >
                                                Compra productos y gestiona tus metas.
                                            </Text>
                                        </TouchableOpacity>

                                        {/* VENDEDOR */}
                                        <TouchableOpacity
                                            onPress={() => selectAccountType('vendedor')}
                                            activeOpacity={0.85}
                                            style={{
                                                flex: 1,
                                                minHeight: 94,
                                                padding: 12,
                                                borderRadius: 18,
                                                backgroundColor: accountType === 'vendedor' ? '#ECFDF3' : '#F8FAF9',
                                                borderWidth: 1.5,
                                                borderColor: accountType === 'vendedor' ? '#16A34A' : '#E4ECE6',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 34,
                                                        height: 34,
                                                        borderRadius: 11,
                                                        backgroundColor: accountType === 'vendedor' ? '#DCFCE7' : '#EAF1EC',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="storefront-outline"
                                                        size={18}
                                                        color={accountType === 'vendedor' ? '#15803D' : '#718078'}
                                                    />
                                                </View>
                                                {accountType === 'vendedor' && (
                                                    <View
                                                        style={{
                                                            width: 20,
                                                            height: 20,
                                                            borderRadius: 10,
                                                            backgroundColor: '#16A34A',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                                                    </View>
                                                )}
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: '900',
                                                    color: '#17251B',
                                                    marginBottom: 3,
                                                }}
                                            >
                                                Vendedor
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 9,
                                                    color: '#7A8780',
                                                    lineHeight: 13,
                                                }}
                                            >
                                                Gestiona productos, ventas y clientes.
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* NOMBRE */}
                                <View style={{ marginBottom: 13 }}>
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            fontWeight: '800',
                                            color: '#34443A',
                                            marginBottom: 7,
                                            marginLeft: 3,
                                        }}
                                    >
                                        Nombre completo
                                    </Text>
                                    <View
                                        style={{
                                            minHeight: 56,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#F8FAF9',
                                            borderRadius: 16,
                                            paddingHorizontal: 13,
                                            borderWidth: 1,
                                            borderColor: '#E4ECE6',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 11,
                                                backgroundColor: '#E6F7EA',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Feather name="user" size={16} color="#15803D" />
                                        </View>
                                        <TextInput
                                            value={nombre}
                                            onChangeText={setNombre}
                                            placeholder="Ej. Yilmer Melenge"
                                            placeholderTextColor="#A1ADA5"
                                            style={{
                                                flex: 1,
                                                color: '#17251B',
                                                fontSize: 13,
                                                fontWeight: '600',
                                                paddingVertical: 0,
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* EMAIL */}
                                <View style={{ marginBottom: 13 }}>
                                    <Text
                                        style={{
                                            fontSize: 11,
                                            fontWeight: '800',
                                            color: '#34443A',
                                            marginBottom: 7,
                                            marginLeft: 3,
                                        }}
                                    >
                                        Correo electrónico
                                    </Text>
                                    <View
                                        style={{
                                            minHeight: 56,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#F8FAF9',
                                            borderRadius: 16,
                                            paddingHorizontal: 13,
                                            borderWidth: 1,
                                            borderColor: '#E4ECE6',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 11,
                                                backgroundColor: '#E6F7EA',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Feather name="mail" size={16} color="#15803D" />
                                        </View>
                                        <TextInput
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            placeholder="tu@email.com"
                                            placeholderTextColor="#A1ADA5"
                                            style={{
                                                flex: 1,
                                                color: '#17251B',
                                                fontSize: 13,
                                                fontWeight: '600',
                                                paddingVertical: 0,
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* CONTRASEÑA */}
                                <View style={{ marginBottom: 19 }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 7,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                fontWeight: '800',
                                                color: '#34443A',
                                                marginLeft: 3,
                                            }}
                                        >
                                            Contraseña
                                        </Text>
                                        <Text style={{ fontSize: 9, color: '#8A958E' }}>
                                            {metCount === 3 ? 'Segura' : 'Recomendamos 8+ caracteres'}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            minHeight: 56,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: '#F8FAF9',
                                            borderRadius: 16,
                                            paddingHorizontal: 13,
                                            borderWidth: 1,
                                            borderColor: '#E4ECE6',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: 35,
                                                height: 35,
                                                borderRadius: 11,
                                                backgroundColor: '#E6F7EA',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: 10,
                                            }}
                                        >
                                            <Feather name="lock" size={16} color="#15803D" />
                                        </View>
                                        <TextInput
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                            placeholder="••••••••"
                                            placeholderTextColor="#A1ADA5"
                                            style={{
                                                flex: 1,
                                                color: '#17251B',
                                                fontSize: 13,
                                                fontWeight: '600',
                                                paddingVertical: 0,
                                            }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => setShowPassword(!showPassword)}
                                            activeOpacity={0.7}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Feather
                                                name={showPassword ? 'eye' : 'eye-off'}
                                                size={18}
                                                color="#7B8880"
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {/* BARRA DE PROGRESO */}
                                    <View
                                        style={{
                                            height: 4,
                                            backgroundColor: '#E9EFEB',
                                            borderRadius: 4,
                                            marginTop: 9,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: getProgressWidth(),
                                                height: '100%',
                                                backgroundColor: metCount === 3 ? '#16A34A' : '#86EFAC',
                                                borderRadius: 4,
                                            }}
                                        />
                                    </View>
                                </View>

                                {/* TÉRMINOS */}
                                <TouchableOpacity
                                    onPress={() => setAcceptTerms(!acceptTerms)}
                                    activeOpacity={0.7}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        marginBottom: 19,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 19,
                                            height: 19,
                                            borderRadius: 5,
                                            backgroundColor: acceptTerms ? '#16A34A' : '#FFFFFF',
                                            borderWidth: acceptTerms ? 0 : 1,
                                            borderColor: '#D1D5DB',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: 8,
                                            marginTop: 1,
                                        }}
                                    >
                                        {acceptTerms && (
                                            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                                        )}
                                    </View>
                                    <Text style={{ flex: 1, fontSize: 10, color: '#718078', lineHeight: 15 }}>
                                        Acepto los{' '}
                                        <Text style={{ fontWeight: '800', color: '#16A34A' }}>
                                            Términos de Servicio
                                        </Text>{' '}
                                        y la{' '}
                                        <Text style={{ fontWeight: '800', color: '#16A34A' }}>
                                            Política de Privacidad
                                        </Text>{' '}
                                        de Nutrik.
                                    </Text>
                                </TouchableOpacity>

                                {/* BOTÓN CREAR CUENTA */}
                                <TouchableOpacity
                                    onPress={handleRegister}
                                    activeOpacity={0.85}
                                    style={{
                                        minHeight: 57,
                                        borderRadius: 16,
                                        backgroundColor: '#16A34A',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 19,
                                        elevation: 5,
                                        shadowColor: '#15803D',
                                        shadowOpacity: 0.24,
                                        shadowRadius: 10,
                                        shadowOffset: { width: 0, height: 5 },
                                    }}
                                >
                                    <Ionicons
                                        name="rocket-outline"
                                        size={18}
                                        color="#FFFFFF"
                                        style={{ marginRight: 8 }}
                                    />
                                    <Text
                                        style={{
                                            color: '#FFFFFF',
                                            fontSize: 14,
                                            fontWeight: '900',
                                            letterSpacing: 0.2,
                                        }}
                                    >
                                        Crear cuenta
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </SafeAreaView>
    );
}