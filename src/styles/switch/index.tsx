import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { IOSSwitchProps } from './types';

export const IOSSwitch = styled(({ className, ...props }: IOSSwitchProps) => (
  <Switch className={className} focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => ({
  width: 42,
  height: 26,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',

    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--color-primary)',
        opacity: 1,
      },
    },
  },

  '& .MuiSwitch-thumb': {
    width: 22,
    height: 22,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },

  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'var(--color-muted)',
    opacity: 1,
    transition: 'all 300ms',
  },
}));
