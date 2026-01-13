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
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Ionicons name="wallet-outline" size={20} color={colors.primaryGold} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor={colors.textGray}
              keyboardType="numeric"
              value={accountNumber}
              onChangeText={setAccountNumber}
            />
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              placeholderTextColor={colors.textGray}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={setAmount}
            />
            <TouchableOpacity 
              style={styles.currencySelector}
              onPress={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
            >
              <Text style={styles.currencyText}>{currency}</Text>
              <Ionicons name="chevron-down" size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Transaction Summary */}
        {amount && accountNumber.length > 0 && (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>You will spend</Text>
            
            <View style={styles.totalContainer}>
              <Text style={styles.currencyLabel}>{currency}</Text>
              <Text style={styles.totalAmount}>
                {(parseFloat(amount) + transactionFee).toFixed(2)}
              </Text>
            </View>

            <View style={styles.feeInfoContainer}>
              <Text style={styles.feeInfoText}>
                Includes {currency} {transactionFee.toFixed(2)} fee
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    fontFamily: typography.fonts.medium,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  amountInput: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingLeft: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.borderGray,
    height: '60%',
  },
  currencyText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  summaryContainer: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    padding: spacing.xl,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.card,
  },
  summaryTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  currencyLabel: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fonts.bold,
    color: colors.primaryGold,
  },
  totalAmount: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  feeInfoContainer: {
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
  },
  feeInfoText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.medium,
    color: colors.textGray,
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
