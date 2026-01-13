import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { OTPInput } from '../components/OTPInput';
import { CustomButton } from '../components/CustomButton';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { colors } from '../constants/colors';
import { typography } from '../constants/typography';
import { spacing, borderRadius } from '../constants/spacing';

interface OTPVerificationScreenProps {
  navigation: any;
  route: any;
}

export const OTPVerificationScreen: React.FC<OTPVerificationScreenProps> = ({
  navigation,
  route,
}) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const email = route.params?.email || 'your email';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('App');
      }, 1500);
    }
  };

  const handleResend = () => {
    setOtp('');
    setTimeLeft(300);
    // Simulate resend API call
    console.log('Resending OTP...');
  };

  const handleOTPComplete = (value: string) => {
    // Auto-submit when OTP is complete
    setOtp(value);
    setTimeout(() => {
      handleVerify();
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={colors.textDark} />
          </TouchableOpacity>
        </View>

        <ProgressIndicator currentStep={2} totalSteps={3} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to{'\n'}
            <Text style={styles.email}>{email}</Text>
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpSection}>
          <OTPInput
            value={otp}
            onChange={setOtp}
            onComplete={handleOTPComplete}
          />
        </View>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <View style={styles.timer}>
            <Ionicons name="time-outline" size={16} color={colors.success} />
            <Text style={styles.timerText}>
              OTP expires in {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Resend */}
        <TouchableOpacity
          onPress={handleResend}
          disabled={timeLeft > 0}
          style={styles.resendButton}
        >
          <Text
            style={[
              styles.resendText,
              timeLeft > 0 && styles.resendTextDisabled,
            ]}
          >
            Resend Code
          </Text>
        </TouchableOpacity>

        {/* Verify Button */}
        <CustomButton
          title="Verify"
          onPress={handleVerify}
          variant="primary"
          loading={isLoading}
          disabled={otp.length !== 6 || isLoading}
          style={styles.verifyButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  titleSection: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxxl,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fonts.bold,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textGray,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  email: {
    color: colors.textDark,
    fontFamily: typography.fonts.medium,
  },
  otpSection: {
    marginBottom: spacing.xl,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    gap: spacing.xs,
  },
  timerText: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    fontWeight: typography.fontWeight.medium,
  },
  resendButton: {
    alignSelf: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
  },
  resendText: {
    fontSize: typography.fontSize.base,
    color: colors.primaryGold,
    fontWeight: typography.fontWeight.medium,
  },
  resendTextDisabled: {
    color: colors.textLight,
  },
  verifyButton: {
    marginTop: 'auto',
    marginBottom: spacing.xl,
  },
});
