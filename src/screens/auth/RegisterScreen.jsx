import React, {
    useState,
    useEffect,
    useRef,
} from 'react';

import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    Animated,
    SafeAreaView,
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
// REGISTER ROLE SCREEN
// ============================================================

export default function RegisterRoleScreen({ navigation }) {
    const insets = useSafeAreaInsets();

    // ========================================================
    // ESTADO DEL TIPO DE CUENTA
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
    // MANEJO DE RUTAS SEGÚN EL ROL
    // ========================================================

    const handleNext = () => {
        if (accountType === 'cliente') {
            navigation.navigate('RegisterCliente'); // Reemplaza con el nombre de tu vista para cliente
        } else {
            navigation.navigate('RegisterVendedor'); // Reemplaza con el nombre de tu vista para vendedor
        }
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
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
                            onPress={() => navigation.navigate('ProfileScreen')}
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
                                shadowOffset: { width: 0, height: 3 },
                            }}
                        >
                            <Feather name="user" size={19} color="#14532D" />
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
                            Elige tu rol
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
                            Selecciona cómo deseas participar en Nutrick.
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
                            <View style={{ marginBottom: 25 }}>
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
                                        onPress={() => setAccountType('cliente')}
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
                                        onPress={() => setAccountType('vendedor')}
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

                            {/* BOTÓN SIGUIENTE CON NAVEGACIÓN CONDICIONAL */}
                            <TouchableOpacity
                                onPress={handleNext}
                                activeOpacity={0.85}
                                style={{
                                    minHeight: 57,
                                    borderRadius: 16,
                                    backgroundColor: '#16A34A',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: 5,
                                    elevation: 5,
                                    shadowColor: '#15803D',
                                    shadowOpacity: 0.24,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 5 },
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 14,
                                        fontWeight: '900',
                                        letterSpacing: 0.2,
                                        marginRight: 8,
                                    }}
                                >
                                    Siguiente
                                </Text>
                                <Ionicons name="arrow-forward-outline" size={18} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}