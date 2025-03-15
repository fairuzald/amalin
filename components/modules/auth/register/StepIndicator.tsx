import { Typography } from '@/components/elements/typography';
import { palette } from '@/themes/colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

interface Step {
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <View style={CONTAINER}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <View key={index} style={STEP_ITEM}>
            <View
              style={[
                STEP_LINE,
                index === 0 && { backgroundColor: 'transparent' },
                isCompleted && COMPLETED_STEP_LINE,
              ]}
            />
            <View
              style={[
                STEP_CIRCLE,
                isActive && ACTIVE_STEP_CIRCLE,
                isCompleted && COMPLETED_STEP_CIRCLE,
              ]}
            >
              {isCompleted ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : (
                <Typography style={[STEP_NUMBER, isActive && ACTIVE_STEP_NUMBER]}>
                  {index + 1}
                </Typography>
              )}
            </View>
            <View
              style={[
                STEP_LINE,
                index === steps.length - 1 && { backgroundColor: 'transparent' },
                isCompleted && COMPLETED_STEP_LINE,
              ]}
            />
            <View style={STEP_TEXT_CONTAINER}>
              <Typography style={[STEP_TITLE, (isActive || isCompleted) && ACTIVE_STEP_TITLE]}>
                {step.title}
              </Typography>
              <Typography style={STEP_DESCRIPTION}>{step.description}</Typography>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default StepIndicator;

// Base styles
const CONTAINER: ViewStyle = {
  paddingHorizontal: 20,
};

const STEP_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
};

const STEP_CIRCLE: ViewStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: palette.gray.lightest,
  borderWidth: 2,
  borderColor: palette.gray.light,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
};

const ACTIVE_STEP_CIRCLE: ViewStyle = {
  borderColor: palette.blue.primary,
};

const COMPLETED_STEP_CIRCLE: ViewStyle = {
  backgroundColor: palette.blue.primary,
  borderColor: palette.blue.primary,
};

const STEP_NUMBER: TextStyle = {
  fontSize: 14,
  fontWeight: '600',
  color: palette.gray.dark,
};

const ACTIVE_STEP_NUMBER: TextStyle = {
  color: palette.blue.primary,
};

const STEP_LINE: ViewStyle = {
  flex: 1,
  height: 2,
  backgroundColor: palette.gray.light,
};

const COMPLETED_STEP_LINE: ViewStyle = {
  backgroundColor: palette.blue.primary,
};

const STEP_TEXT_CONTAINER: ViewStyle = {
  marginLeft: 12,
  flex: 5,
};

const STEP_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: '600',
  color: palette.gray.dark,
  marginBottom: 2,
};

const ACTIVE_STEP_TITLE: TextStyle = {
  color: palette.gray.darkest,
  fontWeight: 'bold',
};

const STEP_DESCRIPTION: TextStyle = {
  fontSize: 12,
  color: palette.gray.medium,
};
