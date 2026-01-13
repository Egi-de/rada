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

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export const SendScreen: React.FC<SendScreenProps> = ({ navigation }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  const contacts: Contact[] = [
    { id: '1', name: 'Aubrey', phone: '+234 801 234 5678' },
    { id: '2', name: 'Victoria', phone: '+234 802 345 6789' },
    { id: '3', name: 'Debra', phone: '+234 803 456 7890' },
    { id: '4', name: 'Colleen', phone: '+234 804 567 8901' },
  ];

  const transactionFee = 0.5; // Fixed fee in USD

  const handleConfirmSend = () => {
    // Handle send confirmation
    console.log('Send confirmed:', { selectedContact, amount, currency, note });
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
          <Text style={styles.headerTitle}>Send Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Recipient Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send To</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contactsList}
          >
            {contacts.map((contact) => (
              <TouchableOpacity
                key={contact.id}
                style={[
                  styles.contactCard,
                  selectedContact?.id === contact.id && styles.contactCardSelected,
                ]}
                onPress={() => setSelectedContact(contact)}
              >
                <View style={[
                  styles.contactAvatar,
                  selectedContact?.id === contact.id && styles.contactAvatarSelected,
                ]}>
                  <Ionicons 
                    name="person" 
                    size={24} 
                    color={selectedContact?.id === contact.id ? colors.white : colors.primaryGold} 
                  />
                </View>
                <Text style={styles.contactName}>{contact.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedContact && (
            <View style={styles.selectedContactInfo}>
              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
              <Text style={styles.selectedContactText}>
                {selectedContact.name} - {selectedContact.phone}
              </Text>
            </View>
          )}
        </View>

        {/* Amount Section */}
        <View style={styles.card}>
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

        {/* Note Section */}
        <View style={styles.card}>
          <Text style={styles.label}>Note (Optional)</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a message..."
            placeholderTextColor={colors.textGray}
            multiline
            numberOfLines={3}
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Transaction Summary */}
        {amount && selectedContact && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Transaction Summary</Text>
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
            (!amount || !selectedContact) && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmSend}
          disabled={!amount || !selectedContact}
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
  contactsList: {
    paddingHorizontal: spacing.base,
    gap: spacing.sm,
  },
  contactCard: {
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  contactCardSelected: {
    // Additional styling for selected state
  },
  contactAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryGold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactAvatarSelected: {
    backgroundColor: colors.primaryGold,
  },
  contactName: {
    fontSize: typography.fontSize.sm,
    color: colors.textDark,
    fontWeight: typography.fontWeight.medium,
  },
  selectedContactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    marginHorizontal: spacing.base,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.sm,
  },
  selectedContactText: {
    fontSize: typography.fontSize.sm,
    color: colors.textDark,
    flex: 1,
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
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
  },
  currencyText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
  },
  amountInput: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textDark,
    flex: 1,
  },
  noteInput: {
    fontSize: typography.fontSize.base,
    color: colors.textDark,
    minHeight: 60,
    textAlignVertical: 'top',
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
    fontWeight: typography.fontWeight.semibold,
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
    fontWeight: typography.fontWeight.medium,
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
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
  },
  summaryTotalValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.primaryGold,
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
