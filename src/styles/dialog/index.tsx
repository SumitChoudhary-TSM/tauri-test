import { Dialog, DialogTitle, DialogContent, DialogActions, Slide, IconButton, SlideProps } from '@mui/material';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import CloseIcon from '@mui/icons-material/Close';
import { CustomDialogProps, headerTextColor, sizeClasses, variantClasses } from './types';

const Transition = forwardRef<HTMLDivElement, SlideProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function CustomDialog({
  title,
  children,
  actions,
  variant = 'default',
  size = 'md',
  disableOutsideClick = false,
  showCloseButton = true,
  className,
  onClose,
  slots,
  slotProps,
  ...props
}: CustomDialogProps) {
  const hasTitle = !!title;
  const hasHeader = hasTitle || (showCloseButton && onClose);

  return (
    <Dialog
      slots={{
        ...slots,
        transition: slots?.transition || Transition,
      }}
      slotProps={{
        ...slotProps,
        paper: {
          ...slotProps?.paper,
          className: cn(
            'rounded-xl border p-0 shadow-lg w-full overflow-hidden',
            sizeClasses[size],
            variantClasses[variant],
            className,
          ),
        },
      }}
      onClose={(event, reason) => {
        if (disableOutsideClick && reason === 'backdropClick') return;
        onClose?.(event, reason);
      }}
      {...props}
    >
      {hasHeader && (
        <div className={cn('flex items-center justify-between border-b px-6', hasTitle ? 'py-4' : 'py-3 min-h-[52px]')}>
          {hasTitle ? (
            <DialogTitle
              component="div"
              className={cn('text-xl font-semibold m-0 p-0 flex-1', headerTextColor[variant])}
            >
              {title}
            </DialogTitle>
          ) : (
            <div className="flex-1" />
          )}

          {showCloseButton && onClose && (
            <IconButton
              aria-label="close"
              onClick={(e) => onClose(e, 'escapeKeyDown')}
              size="small"
              className="ml-2 -mr-2"
              sx={{
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </div>
      )}

      <DialogContent
        className={cn('px-6 text-foreground', hasHeader ? 'py-4' : 'pt-6 pb-4')}
        sx={{
          '&.MuiDialogContent-root': {
            paddingTop: hasHeader ? '16px' : '24px',
          },
        }}
      >
        {children}
      </DialogContent>

      {actions && <DialogActions className={cn('px-6 py-4 gap-2')}>{actions}</DialogActions>}
    </Dialog>
  );
}
