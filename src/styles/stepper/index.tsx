import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import type { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { cn } from '@/utils/cn';
import { CustomStepperProps, StepItem } from './types';

const NumberIconWrapper = styled('div')<{
  ownerState: { active: boolean; completed: boolean };
}>(({ ownerState }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  fontWeight: 600,
  transition: '0.2s',
  fontSize: '14px',
  color:
    ownerState.active || ownerState.completed
      ? 'var(--color-primary-foreground, oklch(0.98 0 0))'
      : 'var(--color-foreground, oklch(0.2 0 0))',
  backgroundColor:
    ownerState.active || ownerState.completed
      ? 'var(--color-primary, oklch(0.35 0.15 220))'
      : 'var(--color-muted, oklch(0.93 0 0))',
  '&:hover': {
    backgroundColor:
      ownerState.active || ownerState.completed
        ? 'var(--color-ring, oklch(0.35 0.15 220))'
        : 'var(--color-border, oklch(0.92 0.01 220))',
  },
}));

function NumberStepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;
  return <NumberIconWrapper ownerState={{ active: !!active, completed: !!completed }}>{icon}</NumberIconWrapper>;
}

const CustomStepper: React.FC<CustomStepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  width = '100%',
  className,
}) => {
  const stepsArray: StepItem[] =
    typeof steps === 'number' ? Array.from({ length: steps }, () => ({ label: undefined })) : steps;

  return (
    <Box sx={{ width }} className={cn('mb-2', className)}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={
          <StepConnector
            sx={{
              '& .MuiStepConnector-line': {
                borderColor: 'var(--color-border, oklch(0.92 0.01 220))',
                borderTopWidth: 2,
              },
            }}
          />
        }
      >
        {stepsArray.map((step, index) => (
          <Step
            key={index}
            onClick={() => onStepChange?.(index)}
            sx={{
              cursor: onStepChange ? 'pointer' : 'default',
              '& .MuiStepLabel-label': {
                fontFamily: 'var(--font-sans, sans-serif)',
                color: 'var(--color-muted-foreground, oklch(0.5 0 0))',
                '&.Mui-active': {
                  color: 'var(--color-primary, oklch(0.35 0.15 220))',
                  fontWeight: 600,
                },
                '&.Mui-completed': {
                  color: 'var(--color-foreground, oklch(0.2 0 0))',
                },
              },
              '& .MuiStepConnector-root': {
                '& .MuiStepConnector-line': {
                  borderColor:
                    index <= activeStep
                      ? 'var(--color-primary, oklch(0.35 0.15 220))'
                      : 'var(--color-border, oklch(0.92 0.01 220))',
                },
              },
            }}
          >
            <StepLabel StepIconComponent={NumberStepIcon}>
              {step.label && (
                <Typography
                  sx={{
                    fontSize: 12,
                    mt: 0.5,
                    fontFamily: 'var(--font-sans, sans-serif)',
                    color: 'var(--color-muted-foreground, oklch(0.5 0 0))',
                  }}
                >
                  {step.label}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;
