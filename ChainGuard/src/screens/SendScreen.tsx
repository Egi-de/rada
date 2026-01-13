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

interface SendScreenProps {
  navigation: any;
}

export const SendScreen: React.FC<SendScreenProps> = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  const transactionFee = 0.5; // Fixed fee in USD

  const handleConfirmSend = () => {
    // Handle send confirmation
    console.log('Send confirmed:', { accountNumber, amount, currency });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Account Number Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter account number"
            placeholderTextColor={colors.textGray}
            keyboardType="numeric"
            value={accountNumber}
            onChangeText={setAccountNumber}
          />
        </View>

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountRow}>
            <TouchableOpacity 
              style={styles.currencySelector}
              onPress={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
            >
              <Text style={styles.currencyText}>{currency}</Text>
              <Ionicons name="chevron-down" size={20} color={colors.textGray} />
            </TouchableOpacity>
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

        {/* Transaction Summary */}
        {amount && accountNumber.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Transaction Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Account</Text>
              <Text style={styles.summaryValue}>{accountNumber}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>{currency} {amount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Transaction Fee</Text>
              <Text style={styles.summaryValue}>{currency} {transactionFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                {currency} {(parseFloat(amount) + transactionFee).toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Confirm Button */}
        <TouchableOpacity 
          style={[
            styles.confirmButton, 
            (!amount || !accountNumber) && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSend}
          disabled={!amount || !accountNumber}
        >
          <Text style={styles.confirmButtonText}>Send Money</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.textGray,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: typography.fontSize.xl,
    color: colors.textDark,
    fontWeight: typography.fontWeight.medium,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    paddingVertical: spacing.sm,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingRight: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: colors.borderGray,
  },
  currencyText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  amountInput: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
    flex: 1,
  },
  summaryContainer: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.md,
  },
  summaryTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginBottom: spacing.md,
    textTransform: 'uppercase',
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
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
  },
  summaryTotalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryGold,
  },
  confirmButton: {
    backgroundColor: colors.primaryGold,
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxxl,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.button,
  },
  confirmButtonDisabled: {
    backgroundColor: colors.borderGray,
    shadowOpacity: 0,
    elevation: 0,
  },
  confirmButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
});
