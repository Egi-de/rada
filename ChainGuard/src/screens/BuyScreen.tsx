import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  trend: 'up' | 'down';
}

export const BuyScreen: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Cryptocurrency | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');

  const cryptocurrencies: Cryptocurrency[] = [
    { id: '1', name: 'Bitcoin', symbol: 'BTC', price: 45230.50, change: 2.5, trend: 'up' },
    { id: '2', name: 'Ethereum', symbol: 'ETH', price: 3120.75, change: -1.2, trend: 'down' },
    { id: '3', name: 'Tether', symbol: 'USDT', price: 1.00, change: 0.01, trend: 'up' },
    { id: '4', name: 'BNB', symbol: 'BNB', price: 312.40, change: 3.8, trend: 'up' },
  ];

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
        </View>

        {/* Cryptocurrency Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Cryptocurrency</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cryptoList}
          >
            {cryptocurrencies.map((crypto) => (
              <TouchableOpacity
                key={crypto.id}
                style={[
                  styles.cryptoCard,
                  selectedCrypto?.id === crypto.id && styles.cryptoCardSelected,
                ]}
                onPress={() => setSelectedCrypto(crypto)}
              >
                <View style={styles.cryptoIcon}>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol.charAt(0)}</Text>
                </View>
                <Text style={styles.cryptoName}>{crypto.name}</Text>
                <Text style={styles.cryptoPrice}>${crypto.price.toLocaleString()}</Text>
                <View style={styles.cryptoChange}>
                  <Ionicons 
                    name={crypto.trend === 'up' ? 'trending-up' : 'trending-down'} 
                    size={14} 
                    color={crypto.trend === 'up' ? colors.success : colors.error} 
                  />
                  <Text style={[
                    styles.changeText,
                    crypto.trend === 'up' ? styles.changeUp : styles.changeDown
                  ]}>
                    {crypto.change > 0 ? '+' : ''}{crypto.change}%
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {selectedCrypto && (
          <>
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
            >
              <Text style={styles.buyButtonText}>Buy {selectedCrypto.symbol}</Text>
            </TouchableOpacity>
          </>
        )}

        {!selectedCrypto && (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={64} color={colors.textGray} />
            <Text style={styles.emptyText}>Select a cryptocurrency to get started</Text>
          </View>
        )}
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
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  section: {
    marginTop: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
    marginHorizontal: spacing.base,
    marginBottom: spacing.md,
  },
  cryptoList: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  cryptoCard: {
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginRight: spacing.sm,
    width: 140,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.card,
  },
  cryptoCardSelected: {
    borderColor: colors.primaryGold,
  },
  cryptoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryGold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cryptoSymbol: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryGold,
  },
  cryptoName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
    marginBottom: 4,
  },
  cryptoPrice: {
    fontSize: typography.fontSize.xs,
    color: colors.textGray,
    marginBottom: 4,
  },
  cryptoChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  changeUp: {
    color: colors.success,
  },
  changeDown: {
    color: colors.error,
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
    color: colors.textGray,
    marginBottom: spacing.sm,
  },
  amountInput: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  conversionText: {
    fontSize: typography.fontSize.sm,
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
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
    marginTop: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
    marginTop: spacing.md,
  },
});
