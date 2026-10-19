import React, { useState, useEffect, useRef } from 'react';
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
import { useAuth } from '../../../context/AuthContext'; // Ajusta la ruta según tu proyecto

// ============================================================
// DIMENSIONES
// ============================================================

const { width } = Dimensions.get('window');
const isSmallDevice = width < 380;

const RegisterClient = ({ navigation }) => {
    const { register } = useAuth();
    const scrollRef = useRef(null);

    const [paso, setPaso] = useState(1);
    const [error, setError] = useState('');
    const [exito, setExito] = useState(false);

    const [form, setForm] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        telefono: '',
        fechaNacimiento: '',
        genero: '',

        estatura: '',
        peso: '',
        actividad: '',
        objetivo: '',
        frecuencia: '',
        nivel: '',
        horario: '',

        alergia: '',
        otroAlergia: '',
        dieta: '',
        otroDieta: '',
        restricciones: '',
        password: '',
        confirmPassword: '',
    });

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

    const manejarEstatura = (text) => {
        let valor = text.replace(/[^\d]/g, '');
        if (valor.length > 1) valor = valor.charAt(0) + '.' + valor.slice(1, 3);
        setForm({ ...form, estatura: valor });
    };

    const manejarPeso = (text) => {
        let valor = text.replace(/[^\d]/g, '');
        if (valor.length > 0) valor = valor + ' kg';
        setForm({ ...form, peso: valor });
    };

    const validarPaso = () => {
        if (paso === 1) {
            if (!form.primerNombre || !form.primerApellido || !form.email || !form.telefono || !form.genero)
                return 'Completa los campos obligatorios de tus datos personales.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                return 'Ingresa un correo electrónico válido.';
        }
        if (paso === 2) {
            if (!form.estatura || !form.peso || !form.actividad || !form.objetivo)
                return 'Completa tu peso, estatura, actividad y objetivo.';
        }
        if (paso === 3) {
            if (!form.password || form.password.length < 8)
                return 'La contraseña debe tener mínimo 8 caracteres.';
            if (form.password !== form.confirmPassword)
                return 'Las contraseñas no coinciden.';
        }
        return '';
    };

    const siguiente = () => {
        const msg = validarPaso();
        if (msg) {
            setError(msg);
            return;
        }
        setError('');
        setPaso((p) => p + 1);
        requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ y: 0, animated: true });
        });
    };

    const anterior = () => {
        setError('');
        setPaso((p) => p - 1);
        requestAnimationFrame(() => {
            scrollRef.current?.scrollTo({ y: 0, animated: true });
        });
    };

    const enviar = () => {
        const msg = validarPaso();
        if (msg) {
            setError(msg);
            return;
        }
        const nombreCompleto = [form.primerNombre, form.segundoNombre, form.primerApellido, form.segundoApellido]
            .filter(Boolean).join(' ').trim();

        const res = register('cliente', {
            ...form,
            nombreCompleto,
            alergia: form.alergia === 'otro' ? form.otroAlergia : form.alergia,
            dieta: form.dieta === 'otro' ? form.otroDieta : form.dieta,
            password: form.password,
        });

        if (!res.ok) {
            setError(res.error);
            return;
        }
        setExito(true);
        setTimeout(() => {
            navigation.replace('Perfil'); // Ajusta con la ruta de tu perfil en React Navigation
        }, 1200);
    };

    const listaPasos = ['Datos personales', 'Cuerpo y actividad', 'Tu alimentación'];

    return (
        <ScrollView
            ref={scrollRef}
            style={{ flex: 1, minHeight: 0, width: '100%' }}
            className="bg-[#F2FAF4]"
            contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 20,
                paddingBottom: 48,
                paddingHorizontal: isSmallDevice ? 17 : 22,
                width: '100%',
            }}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
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
                    Únete a Nutrik
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
                    Tu plan comienza aquí 🌱
                </Text>
            </Animated.View>

            {/* TARJETA CONTENEDOR */}
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
                <Text className="text-lg font-extrabold text-[#17251B] mb-5 text-center">Crea tu Perfil de Cliente</Text>

                {/* INDICADOR DE PASOS */}
                <View className="flex-row justify-between mb-6">
                    {listaPasos.map((label, i) => {
                        const num = i + 1;
                        const isActivo = paso === num;
                        const isCompletado = paso > num;
                        return (
                            <View key={label} className="items-center flex-1 px-1">
                                <View
                                    className={`w-8 h-8 rounded-full items-center justify-center mb-1 ${isCompletado ? 'bg-[#16A34A]' : isActivo ? 'bg-[#16A34A]' : 'bg-gray-200'
                                        }`}
                                >
                                    <Text className="text-white font-bold text-xs">
                                        {isCompletado ? '✓' : num}
                                    </Text>
                                </View>
                                <Text className="text-[10px] text-center text-[#718078]" numberOfLines={1}>
                                    {label}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {error ? (
                    <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
                        <Text className="text-red-600 text-xs font-bold text-center">{error}</Text>
                    </View>
                ) : null}

                {exito ? (
                    <View className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl mb-4">
                        <Text className="text-emerald-700 text-xs font-bold text-center">
                            ¡Cuenta creada! Redirigiendo a tu perfil...
                        </Text>
                    </View>
                ) : null}

                {/* ================= PASO 1 ================= */}
                {paso === 1 && (
                    <>
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Nombres *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Primer Nombre"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.primerNombre}
                                    onChangeText={(text) => cambiar('primerNombre', text)}
                                />
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Segundo Nombre"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.segundoNombre}
                                    onChangeText={(text) => cambiar('segundoNombre', text)}
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Apellidos *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Primer Apellido"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.primerApellido}
                                    onChangeText={(text) => cambiar('primerApellido', text)}
                                />
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Segundo Apellido"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.segundoApellido}
                                    onChangeText={(text) => cambiar('segundoApellido', text)}
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Correo electrónico *</Text>
                            <TextInput
                                className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                placeholder="ejemplo@correo.com"
                                placeholderTextColor="#A1ADA5"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={form.email}
                                onChangeText={(text) => cambiar('email', text)}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Teléfono *</Text>
                            <TextInput
                                className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                placeholder="300 123 4567"
                                placeholderTextColor="#A1ADA5"
                                keyboardType="phone-pad"
                                value={form.telefono}
                                onChangeText={(text) => cambiar('telefono', text)}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Fecha de nacimiento</Text>
                            <TextInput
                                className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                placeholder="AAAA-MM-DD"
                                placeholderTextColor="#A1ADA5"
                                value={form.fechaNacimiento}
                                onChangeText={(text) => cambiar('fechaNacimiento', text)}
                            />
                        </View>

                        <View className="mb-6">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">Género *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {[
                                    { label: 'Femenino', value: 'femenino' },
                                    { label: 'Masculino', value: 'masculino' },
                                    { label: 'Otro', value: 'otro' },
                                    { label: 'Prefiero no decirlo', value: 'prefiero-no' },
                                ].map((gen) => {
                                    const isSelected = form.genero === gen.value;
                                    return (
                                        <TouchableOpacity
                                            key={gen.value}
                                            onPress={() => cambiar('genero', gen.value)}
                                            className={`px-3 py-2.5 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {gen.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </>
                )}

                {/* ================= PASO 2 ================= */}
                {paso === 2 && (
                    <>
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Peso y estatura *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Peso (Ej: 70 kg)"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.peso}
                                    onChangeText={manejarPeso}
                                />
                                <TextInput
                                    className="flex-1 bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3.5 text-sm text-[#17251B]"
                                    placeholder="Estatura (m) Ej: 1.75"
                                    placeholderTextColor="#A1ADA5"
                                    maxLength={4}
                                    value={form.estatura}
                                    onChangeText={manejarEstatura}
                                />
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">Actividad diaria *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {[
                                    { label: 'Sedentario (poco ejercicio)', value: 'sedentario' },
                                    { label: 'Ligero (1-3 días)', value: 'ligero' },
                                    { label: 'Activo (3-5 días)', value: 'activo' },
                                    { label: 'Muy activo (6-7 días)', value: 'muy-activo' },
                                ].map((act) => {
                                    const isSelected = form.actividad === act.value;
                                    return (
                                        <TouchableOpacity
                                            key={act.value}
                                            onPress={() => cambiar('actividad', act.value)}
                                            className={`px-3 py-2.5 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {act.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">Objetivo principal *</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {[
                                    { label: 'Perder peso', value: 'perder' },
                                    { label: 'Ganar músculo', value: 'musculo' },
                                    { label: 'Mantener mi peso', value: 'mantener' },
                                    { label: 'Más energía', value: 'energia' },
                                ].map((obj) => {
                                    const isSelected = form.objetivo === obj.value;
                                    return (
                                        <TouchableOpacity
                                            key={obj.value}
                                            onPress={() => cambiar('objetivo', obj.value)}
                                            className={`px-3 py-2.5 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {obj.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">¿Cada cuánto haces ejercicio?</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {[
                                    { label: 'Casi nunca', value: 'nunca' },
                                    { label: '1-2 veces', value: '1-2' },
                                    { label: '3-4 veces', value: '3-4' },
                                    { label: '5+ veces', value: '5+' },
                                ].map((fre) => {
                                    const isSelected = form.frecuencia === fre.value;
                                    return (
                                        <TouchableOpacity
                                            key={fre.value}
                                            onPress={() => cambiar('frecuencia', fre.value)}
                                            className={`px-3 py-2 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {fre.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="mb-6">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">Nivel de experiencia</Text>
                            <View className="flex-row flex-wrap gap-2">
                                {['principiante', 'intermedio', 'avanzado'].map((niv) => {
                                    const isSelected = form.nivel === niv;
                                    return (
                                        <TouchableOpacity
                                            key={niv}
                                            onPress={() => cambiar('nivel', niv)}
                                            className={`px-3 py-2 rounded-xl border capitalize ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {niv}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    </>
                )}

                {/* ================= PASO 3 ================= */}
                {paso === 3 && (
                    <>
                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">¿Tienes alguna alergia o intolerancia?</Text>
                            <View className="flex-row flex gap-2 mb-2">
                                {[
                                    { label: 'Ninguna', value: '' },
                                    { label: 'Gluten', value: 'gluten' },
                                    { label: 'Lactosa', value: 'lactosa' },
                                    { label: 'Frutos secos', value: 'frutos-secos' },
                                    { label: 'Soja', value: 'soja' },
                                    { label: 'Huevo', value: 'huevo' },
                                    { label: 'Mariscos', value: 'mariscos' },
                                    { label: 'Otra...', value: 'otro' },
                                ].map((alg) => {
                                    const isSelected = form.alergia === alg.value;
                                    return (
                                        <TouchableOpacity
                                            key={alg.value}
                                            onPress={() => cambiar('alergia', alg.value)}
                                            className={`px-3 py-2 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {alg.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            {form.alergia === 'otro' && (
                                <TextInput
                                    className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3 text-sm text-[#17251B] mt-2"
                                    placeholder="Especifica cuál"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.otroAlergia}
                                    onChangeText={(text) => cambiar('otroAlergia', text)}
                                />
                            )}
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-2 ml-1">¿Sigues algún tipo de alimentación especial?</Text>
                            <View className="flex-row flex gap-2 mb-2">
                                {[
                                    { label: 'Sin dieta', value: '' },
                                    { label: 'Vegetariano', value: 'vegetariano' },
                                    { label: 'Vegano', value: 'vegano' },
                                    { label: 'Pescetariano', value: 'pescetariano' },
                                    { label: 'Keto', value: 'keto' },
                                    { label: 'Sin gluten', value: 'sin-gluten' },
                                    { label: 'Otro', value: 'otro' },
                                ].map((diet) => {
                                    const isSelected = form.dieta === diet.value;
                                    return (
                                        <TouchableOpacity
                                            key={diet.value}
                                            onPress={() => cambiar('dieta', diet.value)}
                                            className={`px-3 py-2 rounded-xl border ${isSelected ? 'bg-[#16A34A] border-[#16A34A]' : 'bg-[#F8FAF9] border-[#E4ECE6]'
                                                }`}
                                        >
                                            <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#34443A]'}`}>
                                                {diet.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            {form.dieta === 'otro' && (
                                <TextInput
                                    className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3 text-sm text-[#17251B] mt-2"
                                    placeholder="Especifica cuál"
                                    placeholderTextColor="#A1ADA5"
                                    value={form.otroDieta}
                                    onChangeText={(text) => cambiar('otroDieta', text)}
                                />
                            )}
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Restricciones o preferencias adicionales</Text>
                            <TextInput
                                className="bg-[#F8FAF9] border border-[#E4ECE6] rounded-2xl px-4 py-3 text-sm text-[#17251B] h-20 text-top"
                                placeholder="Ej: no consumo azúcar..."
                                placeholderTextColor="#A1ADA5"
                                multiline
                                numberOfLines={2}
                                value={form.restricciones}
                                onChangeText={(text) => cambiar('restricciones', text)}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-xs font-bold text-[#34443A] mb-1.5 ml-1">Contraseña * (mín. 8 caracteres)</Text>
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
                    </>
                )}

                {/* BOTONES DE NAVEGACIÓN ENTRE PASOS */}
                <View className="flex-row justify-between items-center mt-2">
                    {paso > 1 ? (
                        <TouchableOpacity
                            onPress={anterior}
                            className="bg-gray-100 py-3.5 px-6 rounded-2xl"
                        >
                            <Text className="text-[#34443A] font-bold text-xs">← Anterior</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                            className="py-3.5 px-2"
                        >
                            <Text className="text-xs text-[#718078]">
                                ¿Ya tienes cuenta? <Text className="text-[#16A34A] font-bold">Ingresa</Text>
                            </Text>
                        </TouchableOpacity>
                    )}

                    {paso < 3 ? (
                        <TouchableOpacity
                            onPress={siguiente}
                            className="bg-[#16A34A] py-3.5 px-8 rounded-2xl shadow-md shadow-emerald-700/20"
                        >
                            <Text className="text-white font-black text-xs">Siguiente →</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={enviar}
                            className="bg-[#16A34A] py-3.5 px-8 rounded-2xl shadow-md shadow-emerald-700/20"
                        >
                            <Text className="text-white font-black text-xs">Empezar 🚀</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default RegisterClient;
