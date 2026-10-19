
import React, { useEffect, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';

export default function SplashScreen({ onFinishLoading }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Entrada suave del logo.
        const entranceAnimation = Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 900,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 45,
                useNativeDriver: true,
            }),
        ]);

        // Pulso sutil mientras la aplicación carga.
        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.035,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1200,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        entranceAnimation.start();
        pulseAnimation.start();

        // Simulación de carga inicial.
        const timeout = setTimeout(() => {
            onFinishLoading?.();
        }, 2500);

        // Evita animaciones y callbacks después de desmontar.
        return () => {
            clearTimeout(timeout);
            entranceAnimation.stop();
            pulseAnimation.stop();
        };
    }, [fadeAnim, scaleAnim, pulseAnim, onFinishLoading]);

    return (
        <View style={styles.container}>
            {/* Círculo decorativo suave */}
            <View style={styles.glow} />

            {/* Logo centrado y animado */}
            <Animated.View
                style={[
                    styles.logoWrapper,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { scale: pulseAnim },
                        ],
                    },
                ]}
            >
                <Image
                    source={require('../../assets/nutrick.png')}
                    style={styles.logo}
                    resizeMode="contain"
                    accessibilityLabel="Logo de Nutrik"
                />
            </Animated.View>

            {/* Pequeño indicador animado inferior */}
            <View style={styles.loadingIndicator}>
                <View style={styles.loadingDot} />
                <View style={[styles.loadingDot, styles.middleDot]} />
                <View style={styles.loadingDot} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 0,
        width: '100%',
        backgroundColor: '#F8FCF8',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },

    glow: {
        position: 'absolute',
        width: 230,
        height: 230,
        borderRadius: 115,
        backgroundColor: '#E7F6E9',
        opacity: 0.65,
    },

    logoWrapper: {
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        width: 145,
        height: 145,
    },

    loadingIndicator: {
        position: 'absolute',
        bottom: 48,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },

    loadingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#79BD7D',
        opacity: 0.55,
    },

    middleDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2E8B43',
        opacity: 1,
    },
});
