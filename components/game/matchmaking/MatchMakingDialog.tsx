'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import {cn} from '@/lib/utils';

interface MatchMakingDialogProps {
  onClose?: () => void;
  children: React.ReactNode;
  open?: any;
  onOpenChange?: any;
  // 다른 필요한 props 타입들을 여기에 추가
}

const MatchMakingDialog = ({
  onClose,
  children,
  ...props
}: MatchMakingDialogProps) => (
  <DialogPrimitive.Root
    {...props}
    onOpenChange={(open) => {
      if (!open) onClose?.();
    }}
  >
    {children}
  </DialogPrimitive.Root>
);

const MatchMakingDialogTrigger = DialogPrimitive.Trigger;

const MatchMakingDialogPortal = ({className, ...props}: any) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
);
MatchMakingDialogPortal.displayName = DialogPrimitive.Portal.displayName;

const MatchMakingDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({className, ...props}, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
MatchMakingDialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const MatchMakingDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({className, children, ...props}, ref) => (
  <MatchMakingDialogPortal>
    <MatchMakingDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className='align-middle bottom-10 rounded-sm opacity-70 ring-offset-background
      transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring
      focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent
      data-[state=open]:text-muted-foreground'
      >
        매치 취소
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </MatchMakingDialogPortal>
));
MatchMakingDialogContent.displayName = DialogPrimitive.Content.displayName;

const MatchMakingDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
);
MatchMakingDialogHeader.displayName = 'MatchMakingDialogHeader';

const MatchMakingDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);
MatchMakingDialogFooter.displayName = 'MatchMakingDialogFooter';

const MatchMakingDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({className, ...props}, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
MatchMakingDialogTitle.displayName = DialogPrimitive.Title.displayName;

const MatchMakingDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({className, ...props}, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
MatchMakingDialogDescription.displayName =
  DialogPrimitive.Description.displayName;

export {
  MatchMakingDialog,
  MatchMakingDialogTrigger,
  MatchMakingDialogContent,
  MatchMakingDialogHeader,
  MatchMakingDialogFooter,
  MatchMakingDialogTitle,
  MatchMakingDialogDescription
};
