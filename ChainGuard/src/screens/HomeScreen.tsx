import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BalanceCard } from '../components/BalanceCard';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius, shadows } from '../constants/spacing';

interface HomeScreenProps {
  navigation: any;
}

interface CurrencyRate {
  pair: string;
  rate: number;
  change: number;
  trend: 'up' | 'down';
}

interface Transaction {
  id: string;
  type: 'received' | 'sent' | 'swap';
  name: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  currency: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  

 

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
  ];

  const handleCurrencyToggle = () => {
    setCurrency(currency === 'USD' ? 'NGN' : 'USD');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* Balance Card */}
        <BalanceCard
          balance={balance}
          currency={currency}
          onCurrencyToggle={handleCurrencyToggle}
          onSwap={() => navigation.navigate('Swap')}
          onSend={() => navigation.navigate('Send')}
          onNotificationPress={() => console.log('Notifications')}
        />
      {/* Recent Transactions Section */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {transactions.map((tx) => (
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
                  {tx.type === 'received' ? '+' : '-'}${tx.amount.toFixed(2)}
                </Text>
                <Text style={styles.transactionStatus}>{tx.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation handled by BottomTabNavigator */ }
      {/* 
      <View style={styles.bottomNav}>
        ...
      </View> 
      */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  banner: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.base,
    marginTop: spacing.base,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
  },
  placeholder: {
    width: 40,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primaryGold,
    fontFamily: typography.fonts.medium,
  },
  ratePair: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.medium,
    color: colors.textDark,
  },
  rateValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  rateChange: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fonts.medium,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  transactionsSection: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.base,
    marginBottom: spacing.huge, 
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
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
  transactionDate: {
    fontSize: typography.fontSize.xs,
    color: colors.textGray,
    fontFamily: typography.fonts.regular,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.semibold,
    color: colors.textDark,
    marginBottom: 2,
  },
  transactionAmount: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fonts.bold,
    marginBottom: 2,
  },
  amountReceived: {
    color: colors.success,
  },
  amountSent: {
    color: colors.textDark,
  },
  transactionStatus: {
    fontSize: typography.fontSize.xs,
    color: colors.textGray,
    textTransform: 'capitalize',
  },
});
