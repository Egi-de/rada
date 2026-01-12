import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <React.Fragment key={stepNumber}>
            <View
              style={[
                styles.step,
                isActive && styles.activeStep,
                isCompleted && styles.completedStep,
              ]}
            />
            {stepNumber < totalSteps && (
              <View
                style={[
                  styles.line,
                  isCompleted && styles.completedLine,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.base,
  },
  step: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.borderGray,
  },
  activeStep: {
    backgroundColor: colors.primaryGold,
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  completedStep: {
    backgroundColor: colors.primaryGold,
  },
  line: {
    width: 40,
    height: 2,
    backgroundColor: colors.borderGray,
    marginHorizontal: spacing.xs,
  },
  completedLine: {
    backgroundColor: colors.primaryGold,
  },
});
