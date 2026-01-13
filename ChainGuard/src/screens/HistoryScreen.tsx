import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

interface Transaction {
  id: string;
  type: 'received' | 'sent' | 'swap';
  name: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  currency: string;
}

export const HistoryScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'received' | 'sent' | 'swap'>('all');

  const transactions: Transaction[] = [
    { 
      id: '1', 
      type: 'received', 
      name: 'Sarah Williams', 
      date: 'Today, 10:30 AM', 
      amount: 150.00, 
      status: 'completed',
      currency: 'USD'
    },
    { 
      id: '2', 
      type: 'sent', 
      name: 'Netflix Subscription', 
      date: 'Yesterday, 02:15 PM', 
      amount: 15.99, 
      status: 'completed',
      currency: 'USD'
    },
    { 
      id: '3', 
      type: 'swap', 
      name: 'USD to NGN', 
      date: 'Oct 25, 09:00 AM', 
      amount: 50.00, 
      status: 'completed',
      currency: 'USD'
    },
    { 
      id: '4', 
      type: 'received', 
      name: 'John Doe', 
      date: 'Oct 24, 03:45 PM', 
      amount: 200.00, 
      status: 'completed',
      currency: 'USD'
    },
    { 
      id: '5', 
      type: 'sent', 
      name: 'Electric Bill', 
      date: 'Oct 23, 11:20 AM', 
      amount: 75.50, 
      status: 'completed',
      currency: 'USD'
    },
    { 
      id: '6', 
      type: 'swap', 
      name: 'NGN to USD', 
      date: 'Oct 22, 09:15 AM', 
      amount: 100.00, 
      status: 'pending',
      currency: 'NGN'
    },
  ];

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(tx => tx.type === filter);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'received', label: 'Received' },
    { key: 'sent', label: 'Sent' },
    { key: 'swap', label: 'Swap' },
  ] as const;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transaction History</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {filters.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.filterTab,
              filter === item.key && styles.filterTabActive,
            ]}
            onPress={() => setFilter(item.key)}
          >
            <Text
              style={[
                styles.filterText,
                filter === item.key && styles.filterTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transactions List */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {filteredTransactions.map((tx) => (
          <TouchableOpacity key={tx.id} style={styles.transactionCard}>
            <View style={[
              styles.transactionIcon, 
              tx.type === 'received' ? styles.iconReceived : 
              tx.type === 'sent' ? styles.iconSent : styles.iconSwap
            ]}>
              <Ionicons 
                name={
                  tx.type === 'received' ? 'arrow-down' : 
                  tx.type === 'sent' ? 'arrow-up' : 'swap-horizontal'
                } 
                size={20} 
                color={
                  tx.type === 'received' ? colors.success : 
                  tx.type === 'sent' ? colors.error : colors.primaryGold
                } 
              />
            </View>
            
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{tx.name}</Text>
              <Text style={styles.transactionDate}>{tx.date}</Text>
            </View>

            <View style={styles.transactionAmountContainer}>
              <Text style={[
                styles.transactionAmount,
                tx.type === 'received' ? styles.amountReceived : styles.amountSent
              ]}>
                {tx.type === 'received' ? '+' : '-'}{tx.currency} {tx.amount.toFixed(2)}
              </Text>
              <View style={[
                styles.statusBadge,
                tx.status === 'completed' ? styles.statusCompleted :
                tx.status === 'pending' ? styles.statusPending : styles.statusFailed
              ]}>
                <Text style={styles.statusText}>{tx.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredTransactions.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={colors.textGray} />
            <Text style={styles.emptyText}>No transactions found</Text>
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
  filterContainer: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    marginRight: spacing.sm,
  },
  filterTabActive: {
    backgroundColor: colors.primaryGold,
  },
  filterText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textGray,
  },
  filterTextActive: {
    color: colors.white,
  },
  listContainer: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.xl,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconReceived: {
    backgroundColor: colors.success + '15',
  },
  iconSent: {
    backgroundColor: colors.error + '15',
  },
  iconSwap: {
    backgroundColor: colors.primaryGold + '15',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textGray,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 4,
  },
  amountReceived: {
    color: colors.success,
  },
  amountSent: {
    color: colors.textDark,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusCompleted: {
    backgroundColor: colors.success + '20',
  },
  statusPending: {
    backgroundColor: colors.primaryGold + '20',
  },
  statusFailed: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
    textTransform: 'capitalize',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.huge,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
    marginTop: spacing.md,
  },
});
