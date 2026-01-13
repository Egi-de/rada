import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

interface SwapScreenProps {
  navigation: any;
}

export const SwapScreen: React.FC<SwapScreenProps> = ({ navigation }) => {
  const [fromCurrency, setFromCurrency] = useState<'USD' | 'NGN'>('USD');
  const [toCurrency, setToCurrency] = useState<'USD' | 'NGN'>('NGN');
  const [amount, setAmount] = useState('');
  const exchangeRate = 760.5; // USD to NGN rate

  const calculateConversion = () => {
    if (!amount) return '0.00';
    const numAmount = parseFloat(amount);
    if (fromCurrency === 'USD') {
      return (numAmount * exchangeRate).toFixed(2);
    } else {
      return (numAmount / exchangeRate).toFixed(2);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConfirmSwap = () => {
    // Handle swap confirmation
    console.log('Swap confirmed:', { fromCurrency, toCurrency, amount });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Swap Currency</Text>
          <View style={styles.placeholder} />
        </View>

        {/* From Section */}
        <View style={styles.card}>
          <Text style={styles.label}>From</Text>
          <View style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <View style={styles.currencyIcon}>
                <Ionicons 
                  name={fromCurrency === 'USD' ? 'logo-usd' : 'cash'} 
                  size={24} 
                  color={colors.primaryGold} 
                />
              </View>
              <Text style={styles.currencyText}>{fromCurrency}</Text>
            </View>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textGray}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Swap Button */}
        <View style={styles.swapButtonContainer}>
          <TouchableOpacity style={styles.swapButton} onPress={handleSwapCurrencies}>
            <Ionicons name="swap-vertical" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* To Section */}
        <View style={styles.card}>
          <Text style={styles.label}>To</Text>
          <View style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <View style={styles.currencyIcon}>
                <Ionicons 
                  name={toCurrency === 'USD' ? 'logo-usd' : 'cash'} 
                  size={24} 
                  color={colors.primaryGold} 
                />
              </View>
              <Text style={styles.currencyText}>{toCurrency}</Text>
            </View>
            <Text style={styles.convertedAmount}>{calculateConversion()}</Text>
          </View>
        </View>

        {/* Exchange Rate Info */}
        <View style={styles.rateCard}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Exchange Rate</Text>
            <View style={styles.rateValue}>
              <Text style={styles.rateText}>
                1 {fromCurrency} = {fromCurrency === 'USD' ? exchangeRate.toFixed(2) : (1 / exchangeRate).toFixed(6)} {toCurrency}
              </Text>
              <Ionicons name="trending-up" size={16} color={colors.success} />
            </View>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity 
          style={[styles.confirmButton, !amount && styles.confirmButtonDisabled]}
          onPress={handleConfirmSwap}
          disabled={!amount}
        >
          <Text style={styles.confirmButtonText}>Confirm Swap</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.card,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
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
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryGold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  currencyText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  amountInput: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
    textAlign: 'right',
    flex: 1,
  },
  convertedAmount: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  swapButtonContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  swapButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.button,
  },
  rateCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.lg,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    ...shadows.card,
  },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.textGray,
  },
  rateValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rateText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
  },
  confirmButton: {
    backgroundColor: colors.primaryGold,
    marginHorizontal: spacing.base,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.button,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.textGray,
    opacity: 0.5,
  },
  confirmButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
});
