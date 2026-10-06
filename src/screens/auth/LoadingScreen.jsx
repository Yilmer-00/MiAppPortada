import React, {
  useState,
  useEffect,
  useContext,
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

import { AuthContext } from '../../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


// ============================================================
// DIMENSIONES
// ============================================================

const { width } = Dimensions.get('window');

const isSmallDevice = width < 380;


// ============================================================
// LOGIN SCREEN
// ============================================================

export default function LoginScreen({ navigation }) {

  const { login } = useContext(AuthContext);

  const insets = useSafeAreaInsets();


  // ==========================================================
  // ESTADOS
  // ==========================================================

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('123456');

  const [rememberMe, setRememberMe] = useState(true);

  const [showPassword, setShowPassword] = useState(false);


  // ==========================================================
  // ANIMACIONES
  // ==========================================================

  const logoScale = useRef(
    new Animated.Value(0.85)
  ).current;

  const logoOpacity = useRef(
    new Animated.Value(0)
  ).current;


  // ==========================================================
  // ANIMACIÓN INICIAL
  // ==========================================================

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
        duration: 700,
        useNativeDriver: true,
      }),

    ]).start();

  }, []);


  // ==========================================================
  // INICIAR SESIÓN
  // ==========================================================

  const handleLogin = () => {

    // Validación básica
    if (!email.trim() || !password.trim()) {

      Alert.alert(
        'Campos incompletos',
        'Por favor ingresa tu correo y contraseña.'
      );

      return;
    }


    // Usamos exactamente tu AuthContext
    const resultado = login(
      email.trim(),
      password
    );


    // Si las credenciales no son correctas
    if (!resultado.success) {

      Alert.alert(
        'No se pudo iniciar sesión',
        resultado.message
      );

      return;
    }

    /*
      IMPORTANTE:

      No agregamos navigation.navigate() aquí.

      Tu AuthContext / navegación de autenticación
      se encarga de determinar el rol:

      cliente
      vendedor

      Así evitamos interferir con tu sistema actual.
    */
  };


  // ==========================================================
  // CAMBIAR RECORDAR SESIÓN
  // ==========================================================

  const toggleRemember = () => {
    setRememberMe(!rememberMe);
  };


  // ==========================================================
  // MOSTRAR / OCULTAR PASSWORD
  // ==========================================================

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F2FAF4',
      }}
    >

      <LinearGradient
        colors={[
          '#F4FBF6',
          '#EAF7ED',
          '#F7FBF8',
        ]}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={{
          flex: 1,
        }}
      >

        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior={
            Platform.OS === 'ios'
              ? 'padding'
              : undefined
          }
        >

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,

              paddingTop:
                insets.top + 12,

              paddingBottom:
                insets.bottom + 25,

              paddingHorizontal:
                isSmallDevice ? 18 : 22,

              justifyContent: 'center',
            }}
          >


            {/* ==================================================
                CABECERA
            ================================================== */}

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


            {/* ==================================================
                LOGO Y BIENVENIDA
            ================================================== */}

            <Animated.View
              style={{
                alignItems: 'center',

                opacity: logoOpacity,

                transform: [
                  {
                    scale: logoScale,
                  },
                ],

                marginBottom: 20,
              }}
            >

              {/* LOGO */}

              <View
                style={{
                  width: isSmallDevice
                    ? 94
                    : 108,

                  height: isSmallDevice
                    ? 94
                    : 108,

                  backgroundColor: '#FFFFFF',

                  borderRadius: 30,

                  alignItems: 'center',
                  justifyContent: 'center',

                  padding: 9,

                  elevation: 7,

                  shadowColor: '#14532D',
                  shadowOpacity: 0.10,
                  shadowRadius: 16,
                  shadowOffset: {
                    width: 0,
                    height: 7,
                  },

                  borderWidth: 1,
                  borderColor: '#E9F1EB',

                  marginBottom: 13,
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


              {/* BADGE */}

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',

                  backgroundColor: '#DCFCE7',

                  paddingHorizontal: 12,

                  paddingVertical: 6,

                  borderRadius: 20,

                  marginBottom: 10,
                }}
              >

                <View
                  style={{
                    width: 7,
                    height: 7,

                    borderRadius: 4,

                    backgroundColor: '#22C55E',

                    marginRight: 7,
                  }}
                />

                <Text
                  style={{
                    fontSize: 10,

                    fontWeight: '800',

                    color: '#166534',

                    letterSpacing: 0.8,
                  }}
                >
                  NUTRICIÓN INTELIGENTE
                </Text>

              </View>


              {/* TÍTULO */}

              <Text
                style={{
                  fontSize: isSmallDevice
                    ? 25
                    : 28,

                  fontWeight: '900',

                  color: '#12351E',

                  textAlign: 'center',

                  marginBottom: 6,
                }}
              >
                ¡Hola de nuevo!
              </Text>


              {/* SUBTÍTULO */}

              <Text
                style={{
                  fontSize: 12,

                  lineHeight: 18,

                  color: '#718078',

                  textAlign: 'center',

                  maxWidth: 310,
                }}
              >
                Accede a tu nutrición personalizada,
                metas saludables y mucho más.
              </Text>

            </Animated.View>


            {/* ==================================================
                TARJETA PRINCIPAL
            ================================================== */}

            <View
              style={{
                width: '100%',

                maxWidth: 500,

                alignSelf: 'center',

                backgroundColor: '#FFFFFF',

                borderRadius: 28,

                paddingHorizontal:
                  isSmallDevice ? 17 : 21,

                paddingVertical: 20,

                borderWidth: 1,

                borderColor: '#E8F0EA',

                elevation: 8,

                shadowColor: '#14532D',
                shadowOpacity: 0.08,
                shadowRadius: 20,
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
              }}
            >


              {/* ==================================================
                  TABS
              ================================================== */}

              <View
                style={{
                  flexDirection: 'row',

                  backgroundColor: '#F3F6F4',

                  borderRadius: 16,

                  padding: 4,

                  marginBottom: 20,
                }}
              >

                {/* LOGIN */}

                <View
                  style={{
                    flex: 1,

                    backgroundColor: '#FFFFFF',

                    borderRadius: 12,

                    alignItems: 'center',
                    justifyContent: 'center',

                    paddingVertical: 11,

                    elevation: 2,

                    shadowColor: '#000',
                    shadowOpacity: 0.04,
                    shadowRadius: 5,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                  }}
                >

                  <Text
                    style={{
                      fontSize: 12,

                      fontWeight: '800',

                      color: '#17251B',
                    }}
                  >
                    Iniciar sesión
                  </Text>

                </View>


                {/* REGISTER */}

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      'Register'
                    )
                  }
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

                      color: '#8A958E',
                    }}
                  >
                    Registrarse
                  </Text>

                </TouchableOpacity>

              </View>


              {/* ==================================================
                  EMAIL
              ================================================== */}

              <View
                style={{
                  marginBottom: 14,
                }}
              >

                <Text
                  style={{
                    fontSize: 11,

                    fontWeight: '700',

                    color: '#34443A',

                    marginBottom: 7,

                    marginLeft: 3,
                  }}
                >
                  Correo electrónico
                </Text>


                <View
                  style={{
                    minHeight: 57,

                    flexDirection: 'row',

                    alignItems: 'center',

                    backgroundColor: '#F8FAF9',

                    borderRadius: 16,

                    paddingHorizontal: 13,

                    borderWidth: 1,

                    borderColor: '#E4ECE6',
                  }}
                >

                  {/* ICONO */}

                  <View
                    style={{
                      width: 36,
                      height: 36,

                      borderRadius: 11,

                      backgroundColor: '#E6F7EA',

                      alignItems: 'center',
                      justifyContent: 'center',

                      marginRight: 10,
                    }}
                  >

                    <Feather
                      name="mail"
                      size={17}
                      color="#15803D"
                    />

                  </View>


                  {/* INPUT */}

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


                  {/* CHECK */}

                  {email.length > 5 && (

                    <View
                      style={{
                        width: 22,
                        height: 22,

                        borderRadius: 11,

                        backgroundColor: '#DCFCE7',

                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >

                      <Ionicons
                        name="checkmark"
                        size={13}
                        color="#16A34A"
                      />

                    </View>

                  )}

                </View>

              </View>


              {/* ==================================================
                  CONTRASEÑA
              ================================================== */}

              <View
                style={{
                  marginBottom: 14,
                }}
              >

                <Text
                  style={{
                    fontSize: 11,

                    fontWeight: '700',

                    color: '#34443A',

                    marginBottom: 7,

                    marginLeft: 3,
                  }}
                >
                  Contraseña
                </Text>


                <View
                  style={{
                    minHeight: 57,

                    flexDirection: 'row',

                    alignItems: 'center',

                    backgroundColor: '#F8FAF9',

                    borderRadius: 16,

                    paddingHorizontal: 13,

                    borderWidth: 1,

                    borderColor: '#E4ECE6',
                  }}
                >

                  {/* ICONO */}

                  <View
                    style={{
                      width: 36,
                      height: 36,

                      borderRadius: 11,

                      backgroundColor: '#E6F7EA',

                      alignItems: 'center',
                      justifyContent: 'center',

                      marginRight: 10,
                    }}
                  >

                    <Feather
                      name="lock"
                      size={17}
                      color="#15803D"
                    />

                  </View>


                  {/* PASSWORD */}

                  <TextInput
                    value={password}

                    onChangeText={setPassword}

                    secureTextEntry={
                      !showPassword
                    }

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


                  {/* EYE */}

                  <TouchableOpacity
                    onPress={togglePassword}
                    activeOpacity={0.7}
                    style={{
                      width: 38,
                      height: 38,

                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >

                    <Feather
                      name={
                        showPassword
                          ? 'eye'
                          : 'eye-off'
                      }
                      size={18}
                      color="#7B8880"
                    />

                  </TouchableOpacity>

                </View>

              </View>


              {/* ==================================================
                  OPCIONES
              ================================================== */}

              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',

                  alignItems: 'center',

                  marginBottom: 20,

                  paddingHorizontal: 2,
                }}
              >

                {/* RECORDAR */}

                <TouchableOpacity
                  onPress={toggleRemember}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',

                    alignItems: 'center',
                  }}
                >

                  <View
                    style={{
                      width: 19,
                      height: 19,

                      borderRadius: 5,

                      alignItems: 'center',
                      justifyContent: 'center',

                      backgroundColor:
                        rememberMe
                          ? '#16A34A'
                          : '#FFFFFF',

                      borderWidth:
                        rememberMe
                          ? 0
                          : 1,

                      borderColor:
                        '#D1D5DB',

                      marginRight: 7,
                    }}
                  >

                    {rememberMe && (

                      <Ionicons
                        name="checkmark"
                        size={12}
                        color="#FFFFFF"
                      />

                    )}

                  </View>


                  <Text
                    style={{
                      fontSize: 11,

                      fontWeight: '600',

                      color: '#536158',
                    }}
                  >
                    Recordar sesión
                  </Text>

                </TouchableOpacity>


                {/* FORGOT PASSWORD */}

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      'ForgotPasswordScreen'
                    )
                  }
                  activeOpacity={0.7}
                >

                  <Text
                    style={{
                      fontSize: 11,

                      fontWeight: '800',

                      color: '#16A34A',
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>

                </TouchableOpacity>

              </View>


              {/* ==================================================
                  BOTÓN LOGIN
              ================================================== */}

              <TouchableOpacity
                onPress={handleLogin}
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

                  shadowOpacity: 0.22,

                  shadowRadius: 10,

                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                }}
              >

                <Text
                  style={{
                    fontSize: 14,

                    fontWeight: '900',

                    color: '#FFFFFF',

                    marginRight: 9,
                  }}
                >
                  Iniciar sesión
                </Text>


                <View
                  style={{
                    width: 27,
                    height: 27,

                    borderRadius: 14,

                    backgroundColor:
                      'rgba(255,255,255,0.18)',

                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >

                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color="#FFFFFF"
                  />

                </View>

              </TouchableOpacity>


              {/* ==================================================
                  SEPARADOR
              ================================================== */}

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',

                  marginBottom: 16,
                }}
              >

                <View
                  style={{
                    flex: 1,

                    height: 1,

                    backgroundColor: '#E7ECE8',
                  }}
                />

                <Text
                  style={{
                    fontSize: 9,

                    fontWeight: '800',

                    color: '#9AA69E',

                    letterSpacing: 0.8,

                    marginHorizontal: 11,
                  }}
                >
                  O CONTINÚA CON
                </Text>

                <View
                  style={{
                    flex: 1,

                    height: 1,

                    backgroundColor: '#E7ECE8',
                  }}
                />

              </View>


              {/* ==================================================
                  LOGIN SOCIAL
              ================================================== */}

              <View
                style={{
                  flexDirection: 'row',

                  gap: 10,

                  marginBottom: 3,
                }}
              >

                {/* APPLE */}

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Apple',
                      'Inicio con Apple próximamente.'
                    )
                  }
                  activeOpacity={0.7}
                  style={{
                    flex: 1,

                    height: 48,

                    borderRadius: 14,

                    backgroundColor: '#F8FAF9',

                    alignItems: 'center',
                    justifyContent: 'center',

                    borderWidth: 1,

                    borderColor: '#E5ECE7',
                  }}
                >

                  <Ionicons
                    name="logo-apple"
                    size={20}
                    color="#111827"
                  />

                </TouchableOpacity>


                {/* GOOGLE */}

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Google',
                      'Inicio con Google próximamente.'
                    )
                  }
                  activeOpacity={0.7}
                  style={{
                    flex: 1,

                    height: 48,

                    borderRadius: 14,

                    backgroundColor: '#F8FAF9',

                    alignItems: 'center',
                    justifyContent: 'center',

                    borderWidth: 1,

                    borderColor: '#E5ECE7',
                  }}
                >

                  <Ionicons
                    name="logo-google"
                    size={20}
                    color="#EA4335"
                  />

                </TouchableOpacity>


                {/* PASSKEY */}

                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      'Passkey',
                      'Inicio con Passkey próximamente.'
                    )
                  }
                  activeOpacity={0.7}
                  style={{
                    flex: 1,

                    height: 48,

                    borderRadius: 14,

                    backgroundColor: '#F8FAF9',

                    alignItems: 'center',
                    justifyContent: 'center',

                    borderWidth: 1,

                    borderColor: '#E5ECE7',
                  }}
                >

                  <MaterialCommunityIcons
                    name="key-variant"
                    size={20}
                    color="#16A34A"
                  />

                </TouchableOpacity>

              </View>

            </View>


            {/* ==================================================
                TARJETA DE RACHA
            ================================================== */}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  'StreakScreen'
                )
              }
              activeOpacity={0.8}
              style={{
                width: '100%',

                maxWidth: 500,

                alignSelf: 'center',

                marginTop: 13,

                padding: 12,

                borderRadius: 18,

                backgroundColor: '#F8FCF9',

                borderWidth: 1,

                borderColor: '#DCEFE1',

                flexDirection: 'row',

                alignItems: 'center',
              }}
            >

              {/* ICONO */}

              <View
                style={{
                  width: 40,
                  height: 40,

                  borderRadius: 12,

                  backgroundColor: '#DCFCE7',

                  alignItems: 'center',
                  justifyContent: 'center',

                  marginRight: 10,
                }}
              >

                <Ionicons
                  name="flash"
                  size={19}
                  color="#16A34A"
                />

              </View>


              {/* TEXTO */}

              <View
                style={{
                  flex: 1,

                  marginRight: 8,
                }}
              >

                <Text
                  style={{
                    fontSize: 11,

                    fontWeight: '800',

                    color: '#1F3326',
                  }}
                >
                  Tu racha: 14 días 🔥
                </Text>


                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 9,

                    color: '#87948C',

                    marginTop: 3,
                  }}
                >
                  Sigue cuidando tus hábitos saludables.
                </Text>

              </View>


              {/* XP */}

              <View
                style={{
                  backgroundColor: '#DCFCE7',

                  paddingHorizontal: 9,

                  paddingVertical: 5,

                  borderRadius: 20,
                }}
              >

                <Text
                  style={{
                    fontSize: 9,

                    fontWeight: '900',

                    color: '#15803D',
                  }}
                >
                  +50 XP
                </Text>

              </View>

            </TouchableOpacity>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <View
              style={{
                alignItems: 'center',

                marginTop: 14,

                marginBottom: 2,
              }}
            >

              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}
              >

                <Feather
                  name="shield"
                  size={11}
                  color="#9AA69E"
                  style={{
                    marginRight: 5,
                  }}
                />

                <Text
                  style={{
                    fontSize: 9,

                    color: '#9AA69E',

                    fontWeight: '500',
                  }}
                >
                  Conexión segura y protegida
                </Text>

              </View>


              <Text
                style={{
                  fontSize: 8,

                  color: '#A8B2AC',

                  marginTop: 4,
                }}
              >
                Nutrik Health & Fitness Ecosystem © 2025
              </Text>

            </View>

          </ScrollView>

        </KeyboardAvoidingView>

      </LinearGradient>

    </SafeAreaView>
  );
}