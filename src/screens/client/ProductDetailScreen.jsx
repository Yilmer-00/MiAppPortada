import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ChevronLeft,
    Heart,
    Minus,
    Plus,
    Star,
    ShoppingBag,
} from "lucide-react-native";

// Mapeo local de imágenes por ID para evitar problemas de serialización en React Navigation
const PRODUCT_IMAGES = {
    "1": require("../../../assets/proteina.png"),
    "2": require("../../../assets/icons/vitaminas.png"), // Mapeo para ID 2
    "3": require("../../../assets/Questbar.png"),
    "4": require("../../../assets/mantequillaNutrelle.png"),
    "5": require("../../../assets/electrolit.png"),
};

export default function ProductDetailScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // Recibir producto enviado por parámetro
    const { product } = route.params || {};

    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    // Si se accede sin un producto, muestra un estado por defecto
    if (!product) {
        return (
            <SafeAreaView style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No se encontró la información del producto.</Text>
                <TouchableOpacity style={styles.backButtonBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    // Obtener la imagen correspondiente
    const imageSource = product.image || PRODUCT_IMAGES[product.id];

    // Controladores de cantidad
    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    // Agregar al Carrito
    const handleAddToCart = () => {
        navigation.navigate("Carrito", {
            productoAgregar: {
                id: product.id,
                title: product.title,
                brand: product.brand,
                price: product.price,
                numericPrice: product.numericPrice,
                weight: product.weight,
                bgAccent: product.bgAccent,
                quantity: quantity,
            },
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            {/* Dynamic Background Accent */}
            <View
                style={[
                    styles.imageHeaderContainer,
                    { backgroundColor: product.bgAccent || "#FEF3C7" },
                ]}
            >
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity
                        style={styles.iconCircle}
                        onPress={() => navigation.goBack()}
                    >
                        <ChevronLeft size={20} color="#0F172A" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.iconCircle}
                        onPress={() => setIsFavorite(!isFavorite)}
                    >
                        <Heart
                            size={20}
                            color={isFavorite ? "#EF4444" : "#0F172A"}
                            fill={isFavorite ? "#EF4444" : "transparent"}
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Image */}
                <View style={styles.imageWrapper}>
                    {imageSource ? (
                        <Image
                            source={imageSource}
                            style={styles.productImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>Sin imagen</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Details Container */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.detailsContainer}
            >
                <View style={styles.headerInfo}>
                    <View style={styles.brandBadge}>
                        <Text style={styles.brandText}>{product.brand || "NUTRIK"}</Text>
                    </View>
                    <View style={styles.ratingBadge}>
                        <Star size={14} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.ratingText}>{product.rating || "4.8"}</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={styles.productTitle}>{product.title}</Text>

                {/* Price & Discount */}
                <View style={styles.priceRow}>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    {product.oldPrice && (
                        <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                    )}
                    {product.discount && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>{product.discount}</Text>
                        </View>
                    )}
                </View>

                {/* Quick Specs */}
                <View style={styles.specsRow}>
                    <View style={styles.specBox}>
                        <Text style={styles.specLabel}>Peso / Porción</Text>
                        <Text style={styles.specValue}>{product.weight || "N/A"}</Text>
                    </View>
                    <View style={styles.specDivider} />
                    <View style={styles.specBox}>
                        <Text style={styles.specLabel}>Calorías</Text>
                        <Text style={styles.specValue}>{product.calories || "190 Cal"}</Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={styles.descriptionText}>
                    {product.description ||
                        "Producto de alta calidad fabricado con ingredientes 100% naturales para apoyar tu nutrición diaria y rendimiento."}
                </Text>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={handleDecrease}
                        activeOpacity={0.7}
                    >
                        <Minus size={16} color="#0F172A" />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={handleIncrease}
                        activeOpacity={0.7}
                    >
                        <Plus size={16} color="#0F172A" />
                    </TouchableOpacity>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={handleAddToCart}
                    activeOpacity={0.85}
                >
                    <ShoppingBag size={18} color="#FFFFFF" />
                    <Text style={styles.addToCartText}>Agregar al Carrito</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#F8FAFC",
    },
    emptyText: {
        fontSize: 16,
        color: "#64748B",
        marginBottom: 16,
    },
    backButtonBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#0F172A",
        borderRadius: 12,
    },
    backButtonText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    imageHeaderContainer: {
        height: 280,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        paddingHorizontal: 20,
        paddingTop: 10,
        position: "relative",
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    imageWrapper: {
        width: "100%",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    productImage: {
        width: "80%",
        height: "100%",
    },
    placeholderImage: {
        width: 150,
        height: 150,
        backgroundColor: "#E2E8F0",
        borderRadius: 75,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: {
        color: "#64748B",
        fontSize: 12,
    },
    detailsContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 20,
    },
    headerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    brandBadge: {
        backgroundColor: "#F1F5F9",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    brandText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#475569",
        letterSpacing: 0.5,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "#FEF3C7",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#D97706",
    },
    productTitle: {
        fontSize: 22,
        fontWeight: "900",
        color: "#0F172A",
        marginBottom: 12,
        lineHeight: 28,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: "900",
        color: "#0F172A",
    },
    oldPrice: {
        fontSize: 15,
        color: "#94A3B8",
        textDecorationLine: "line-through",
    },
    discountBadge: {
        backgroundColor: "#0F172A",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    discountText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "800",
    },
    specsRow: {
        flexDirection: "row",
        backgroundColor: "#F8FAFC",
        borderRadius: 16,
        padding: 14,
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 20,
    },
    specBox: {
        alignItems: "center",
    },
    specLabel: {
        fontSize: 11,
        color: "#94A3B8",
        fontWeight: "600",
        marginBottom: 2,
    },
    specValue: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0F172A",
    },
    specDivider: {
        width: 1,
        height: 24,
        backgroundColor: "#E2E8F0",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        color: "#64748B",
        lineHeight: 22,
    },
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        backgroundColor: "#FFFFFF",
        gap: 16,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        borderRadius: 20,
        padding: 4,
    },
    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    qtyText: {
        fontSize: 15,
        fontWeight: "800",
        color: "#0F172A",
        paddingHorizontal: 12,
    },
    addToCartBtn: {
        flex: 1,
        height: 48,
        backgroundColor: "#15803D",
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        shadowColor: "#15803D",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    addToCartText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },
});