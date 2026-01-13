import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8; // 80% of screen width to show side cards
const SWIPE_THRESHOLD = 50;

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
}

const StackedCard: React.FC<{
  crypto: Cryptocurrency;
  index: number;
  currentIndex: number;
  onSelect: () => void;
}> = ({ crypto, index, currentIndex, onSelect }) => {
  const position = index - currentIndex;
  
  // All hooks must be at the top, before any conditional returns
  const animatedScale = useRef(new Animated.Value(1)).current;
  const animatedTranslateX = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  
  // Calculate transforms based on position
  let scale = 1;
  let translateX = 0;
  let opacity = 1;
  let zIndex = 100;

  if (position === -2) {
    // Second card to the left
    scale = 0.7;
    translateX = -CARD_WIDTH * 1.1;
    opacity = 0.3;
    zIndex = 96;
  } else if (position === -1) {
    // First card to the left
    scale = 0.8;
    translateX = -CARD_WIDTH * 0.75;
    opacity = 0.5;
    zIndex = 98;
  } else if (position === 0) {
    // Current card (center)
    scale = 1;
    translateX = 0;
    opacity = 1;
    zIndex = 100;
  } else if (position === 1) {
    // First card to the right
    scale = 0.8;
    translateX = CARD_WIDTH * 0.75;
    opacity = 0.5;
    zIndex = 98;
  } else if (position === 2) {
    // Second card to the right
    scale = 0.7;
    translateX = CARD_WIDTH * 1.1;
    opacity = 0.3;
    zIndex = 96;
  }

  // Animate to new position
  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedScale, {
        toValue: scale,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(animatedTranslateX, {
        toValue: translateX,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(animatedOpacity, {
        toValue: opacity,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]).start();
  }, [position, scale, translateX, opacity]);

  // Show cards: 2 before current, current, and 2 after current
  if (position < -2 || position > 2) return null;

  const isActive = position === 0;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: CARD_WIDTH,
        height: 200,
        transform: [
          { translateX: animatedTranslateX },
          { scale: animatedScale },
        ],
        opacity: animatedOpacity,
        zIndex,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onSelect}
        style={[
          styles.stackedCard,
          isActive && styles.stackedCardActive,
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cryptoIconLarge}>
              <Text style={styles.cryptoSymbolLarge}>{crypto.symbol.charAt(0)}</Text>
            </View>
            <View style={styles.cardHeaderInfo}>
              <Text style={styles.cardCryptoName}>{crypto.name}</Text>
              <Text style={styles.cardCryptoSymbol}>{crypto.symbol}</Text>
            </View>
          </View>

          <View style={styles.cardPriceSection}>
            <Text style={styles.cardPriceLabel}>Current Price</Text>
            <Text style={styles.cardPrice}>${crypto.price.toLocaleString()}</Text>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.cardChange}>
              <Ionicons 
                name={crypto.trend === 'up' ? 'trending-up' : 'trending-down'} 
                size={18} 
                color={crypto.trend === 'up' ? colors.success : colors.error} 
              />
              <Text style={[
                styles.cardChangeText,
                crypto.trend === 'up' ? styles.changeUp : styles.changeDown
              ]}>
                {crypto.change > 0 ? '+' : ''}{crypto.change}%
              </Text>
            </View>
            <Text style={styles.cardChangeLabel}>24h Change</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const BuyScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const pan = useRef(new Animated.Value(0)).current;

  const cryptocurrencies: Cryptocurrency[] = [
    { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 45230.50, change: 2.5, trend: 'up' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3120.75, change: -1.2, trend: 'down' },
    { id: '3', name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.01, trend: 'up' },
    { id: '4', name: 'BNB', symbol: 'BNB', price: 312.40, change: 3.8, trend: 'up' },
    { id: '5', name: 'Cardano', symbol: 'ADA', price: 0.52, change: 1.8, trend: 'up' },
    { id: '6', name: 'Solana', symbol: 'SOL', price: 98.45, change: 5.2, trend: 'up' },
  ];

  const selectedCrypto = cryptocurrencies[currentIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        pan.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -SWIPE_THRESHOLD && currentIndex < cryptocurrencies.length - 1) {
          // Swiped left - go to next
          setCurrentIndex(currentIndex + 1);
        } else if (gestureState.dx > SWIPE_THRESHOLD && currentIndex > 0) {
          // Swiped right - go to previous
          setCurrentIndex(currentIndex - 1);
        }
        
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
        }).start();
      },
    })
  ).current;

  const calculateTotal = () => {
    if (!amount || !selectedCrypto) return '0.00';
    return (parseFloat(amount) * selectedCrypto.price).toFixed(2);
  };

  const handleBuy = () => {
    console.log('Buy:', { selectedCrypto, amount, paymentMethod });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Buy Crypto</Text>
          <Text style={styles.headerSubtitle}>Swipe to explore cryptocurrencies</Text>
        </View>

        {/* Stacked Cards with Swipe Gesture */}
        <View style={styles.cardsContainer}>
          <Animated.View 
            style={[
              styles.stackContainer,
              {
                transform: [{ translateX: pan }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            {cryptocurrencies.map((crypto, index) => (
              <StackedCard
                key={crypto.id}
                crypto={crypto}
                index={index}
                currentIndex={currentIndex}
                onSelect={() => setCurrentIndex(index)}
              />
            ))}
          </Animated.View>

          {/* Card Position Indicator */}
          <View style={styles.indicatorContainer}>
            {cryptocurrencies.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.dotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.card}>
          <Text style={styles.label}>Amount ({selectedCrypto.symbol})</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={colors.textGray}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
          <Text style={styles.conversionText}>
            ≈ ${calculateTotal()} USD
          </Text>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentCard,
                paymentMethod === 'card' && styles.paymentCardSelected,
              ]}
              onPress={() => setPaymentMethod('card')}
              activeOpacity={0.7}
            >
              <Ionicons name="card-outline" size={32} color={colors.primaryGold} />
              <Text style={styles.paymentLabel}>Debit Card</Text>
              {paymentMethod === 'card' && (
                <View style={styles.selectedBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentCard,
                paymentMethod === 'bank' && styles.paymentCardSelected,
              ]}
              onPress={() => setPaymentMethod('bank')}
              activeOpacity={0.7}
            >
              <Ionicons name="business-outline" size={32} color={colors.primaryGold} />
              <Text style={styles.paymentLabel}>Bank Transfer</Text>
              {paymentMethod === 'bank' && (
                <View style={styles.selectedBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cryptocurrency</Text>
            <Text style={styles.summaryValue}>{selectedCrypto.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount</Text>
            <Text style={styles.summaryValue}>{amount || '0'} {selectedCrypto.symbol}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Price per {selectedCrypto.symbol}</Text>
            <Text style={styles.summaryValue}>${selectedCrypto.price.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Transaction Fee</Text>
            <Text style={styles.summaryValue}>$2.50</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>
              ${(parseFloat(calculateTotal()) + 2.50).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Buy Button */}
        <TouchableOpacity 
          style={[styles.buyButton, !amount && styles.buyButtonDisabled]}
          onPress={handleBuy}
          disabled={!amount}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Buy {selectedCrypto.symbol}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textGray,
    marginTop: spacing.xs,
  },
  cardsContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.base,
    overflow: 'visible',
  },
  stackContainer: {
    height: 220,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  stackedCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    ...shadows.card,
    elevation: 5,
  },
  stackedCardActive: {
    borderWidth: 3,
    borderColor: colors.primaryGold,
  },
  cardContent: {
    flex: 1,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cryptoIconLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryGold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cryptoSymbolLarge: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fonts.bold,
    color: colors.primaryGold,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardCryptoName: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
    marginBottom: 4,
  },
  cardCryptoSymbol: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.medium,
    color: colors.textGray,
  },
  cardPriceSection: {
    marginBottom: spacing.md,
  },
  cardPriceLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textGray,
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardChangeText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
  },
  cardChangeLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textGray,
  },
  changeUp: {
    color: colors.success,
  },
  changeDown: {
    color: colors.error,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textGray + '40',
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primaryGold,
  },
  section: {
    marginTop: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.card,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.medium,
    color: colors.textGray,
    marginBottom: spacing.sm,
  },
  amountInput: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  conversionText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textGray,
  },
  paymentMethods: {
    flexDirection: 'row',
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  paymentCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    ...shadows.card,
  },
  paymentCardSelected: {
    borderColor: colors.primaryGold,
    backgroundColor: colors.primaryGold + '08',
  },
  paymentLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.medium,
    color: colors.textDark,
    marginTop: spacing.sm,
  },
  selectedBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    ...shadows.card,
  },
  summaryTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.regular,
    color: colors.textGray,
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.medium,
    color: colors.textDark,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  summaryTotalLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
  },
  summaryTotalValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.bold,
    color: colors.primaryGold,
  },
  buyButton: {
    backgroundColor: colors.primaryGold,
    marginHorizontal: spacing.base,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.button,
  },
  buyButtonDisabled: {
    backgroundColor: colors.textGray,
    opacity: 0.5,
  },
  buyButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.bold,
    color: colors.white,
  },
});

