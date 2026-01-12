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
  const [isRatesExpanded, setIsRatesExpanded] = useState(false);

  const rates: CurrencyRate[] = [
    { pair: 'USD/NGN', rate: 760.5, change: 13.8, trend: 'up' },
    { pair: 'GBP/NGN', rate: 955.2, change: 3.93, trend: 'up' },
    { pair: 'EUR/NGN', rate: 810.3, change: -10.3, trend: 'down' },
  ];

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
          onSwap={() => console.log('Swap')}
          onSend={() => console.log('Send')}
          onNotificationPress={() => console.log('Notifications')}
        />

        {/* Rates Section - Replacing Invite Friends Banner */}
        <View style={styles.ratesSection}>
          <View style={styles.ratesHeader}>
            <Text style={styles.sectionTitle}>Rates</Text>
            <TouchableOpacity onPress={() => setIsRatesExpanded(!isRatesExpanded)}>
              <Ionicons 
                name={isRatesExpanded ? "chevron-up" : "chevron-down"} 
                size={20} 
                color={colors.primaryGold} 
              />
            </TouchableOpacity>
          </View>

          {/* Collapsible Vertical Rates List */}
          <View>
            {(isRatesExpanded ? rates : rates.slice(0, 1)).map((rate, index) => (
              <View key={index} style={styles.rateCard}>
                <View style={styles.rateLeft}>
                  <View style={styles.rateIcon}>
                    <Ionicons name="logo-usd" size={20} color={colors.success} />
                  </View>
                  <Text style={styles.ratePair}>{rate.pair}</Text>
                </View>

                <View style={styles.rateCenter}>
                  <View style={styles.miniChart}>
                    {rate.trend === 'up' ? (
                      <Ionicons name="trending-up" size={24} color={colors.success} />
                    ) : (
                      <Ionicons name="trending-down" size={24} color={colors.error} />
                    )}
                  </View>
                </View>

                <View style={styles.rateRight}>
                  <Text style={styles.rateValue}>{rate.rate.toFixed(2)}</Text>
                  <Text
                    style={[
                      styles.rateChange,
                      rate.trend === 'up' ? styles.rateChangeUp : styles.rateChangeDown,
                    ]}
                  >
                    {rate.trend === 'up' ? '+' : ''}{rate.change.toFixed(2)}%
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Send Section with Curly Bracket Shape */}
        <View style={styles.quickSendWrapper}>
          {/* Left Curve */}
          <View style={[styles.curveDecoration, styles.curveLeft]} />
          
          {/* Center Notch */}
          <View style={styles.centerNotch} />
          
          {/* Right Curve */}
          <View style={[styles.curveDecoration, styles.curveRight]} />
          
          <View style={styles.quickSendSection}>
            <View style={styles.quickSendHeader}>
            <Text style={styles.sectionTitle}>Quick Send</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickSendList}
          >
            {/* Contact 1 */}
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={28} color={colors.white} />
              </View>
              <Text style={styles.contactName}>Aubrey</Text>
            </TouchableOpacity>

            {/* Contact 2 */}
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={28} color={colors.white} />
              </View>
              <Text style={styles.contactName}>Victoria</Text>
            </TouchableOpacity>

            {/* Contact 3 */}
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={28} color={colors.white} />
              </View>
              <Text style={styles.contactName}>Debra</Text>
            </TouchableOpacity>

            {/* Contact 4 */}
            <TouchableOpacity style={styles.contactItem}>
              <View style={styles.contactAvatar}>
                <Ionicons name="person" size={28} color={colors.white} />
              </View>
              <Text style={styles.contactName}>Colleen</Text>
            </TouchableOpacity>

            {/* Add New Contact */}
            <TouchableOpacity style={styles.contactItem}>
              <View style={[styles.contactAvatar, styles.addContactAvatar]}>
                <Ionicons name="add" size={28} color={colors.primaryGold} />
              </View>
              <Text style={styles.contactName}>New</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

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
  bannerTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textGray,
  },
  quickSendWrapper: {
    marginTop: spacing.lg,
    position: 'relative',
  },
  curveDecoration: {
    position: 'absolute',
    top: 0,
    width: 60,
    height: 30,
    backgroundColor: colors.white,
    zIndex: 2,
  },
  curveLeft: {
    left: 0,
    borderTopRightRadius: 30,
  },
  curveRight: {
    right: 0,
    borderTopLeftRadius: 30,
  },
  centerNotch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -30,
    width: 60,
    height: 20,
    backgroundColor: colors.lightGray,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    zIndex: 2,
  },
  quickSendSection: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    ...shadows.card,
  },
  quickSendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
  },
  seeAllText: {
    fontSize: typography.fontSize.sm,
    color: colors.primaryGold,
    fontWeight: typography.fontWeight.medium,
  },
  quickSendList: {
    gap: spacing.base,
    paddingRight: spacing.base,
  },
  contactItem: {
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  contactAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  addContactAvatar: {
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: colors.primaryGold,
    borderStyle: 'dashed',
  },
  contactName: {
    fontSize: typography.fontSize.sm,
    color: colors.textDark,
    fontWeight: typography.fontWeight.medium,
  },
  ratesContainer: {
    marginTop: spacing.lg,
  },
  ratesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.base,
    borderRadius: borderRadius.lg, // Updated to match other cards
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  rateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rateIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  ratePair: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textDark,
  },
  rateCenter: {
    marginHorizontal: spacing.base,
  },
  miniChart: {
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateRight: {
    alignItems: 'flex-end',
  },
  rateValue: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  rateChange: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
  },
  rateChangeUp: {
    color: colors.success,
  },
  rateChangeDown: {
    color: colors.error,
  },
  ratesSection: {
    marginTop: spacing.lg,
    marginHorizontal: spacing.base,
    marginBottom: 0,
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
    // Add extra bottom padding for scrolling past bottom nav if needed, 
    // though safe area usually handles it. 
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
    backgroundColor: colors.success + '15', // 15% opacity
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
    marginBottom: 2,
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
