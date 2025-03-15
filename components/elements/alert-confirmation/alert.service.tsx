import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert } from './alert';
import { AlertButton, AlertProps, AlertType } from './alert.props';

interface AlertContextType {
  alert: (options: Omit<AlertProps, 'visible'>) => void;
  confirm: (options: ConfirmOptions) => void;
  info: (options: BaseAlertOptions) => void;
  success: (options: BaseAlertOptions) => void;
  warning: (options: BaseAlertOptions) => void;
  error: (options: BaseAlertOptions) => void;
  hide: () => void;
}

interface BaseAlertOptions {
  title: string;
  message: string | React.ReactNode;
  buttonText?: string;
  onPress?: () => void;
  dismissable?: boolean;
}

interface ConfirmOptions extends BaseAlertOptions {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  type?: AlertType;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertState, setAlertState] = useState<AlertProps & { visible: boolean }>({
    visible: false,
    title: '',
    message: '',
    buttons: [],
    type: 'default',
    dismissable: true,
  });

  const hide = () => {
    setAlertState(prev => ({ ...prev, visible: false }));
  };

  const alert = (options: Omit<AlertProps, 'visible'>) => {
    setAlertState({
      ...options,
      visible: true,
    });
  };

  const confirm = ({
    title,
    message,
    confirmText = 'OK',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    type = 'default',
    dismissable = true,
  }: ConfirmOptions) => {
    const buttons: AlertButton[] = [
      {
        text: cancelText,
        style: 'cancel',
        onPress: () => {
          hide();
          if (onCancel) onCancel();
        },
      },
      {
        text: confirmText,
        style: 'default',
        onPress: () => {
          hide();
          onConfirm();
        },
      },
    ];

    setAlertState({
      visible: true,
      title,
      message,
      buttons,
      type,
      dismissable,
      onDismiss: () => {
        hide();
        if (onCancel) onCancel();
      },
    });
  };

  const createTypeAlert =
    (type: AlertType) =>
    ({ title, message, buttonText = 'OK', onPress, dismissable = true }: BaseAlertOptions) => {
      const buttons: AlertButton[] = [
        {
          text: buttonText,
          style: 'default',
          onPress: () => {
            hide();
            if (onPress) onPress();
          },
        },
      ];

      setAlertState({
        visible: true,
        title,
        message,
        buttons,
        type,
        dismissable,
        onDismiss: hide,
      });
    };

  return (
    <AlertContext.Provider
      value={{
        alert,
        confirm,
        info: createTypeAlert('info'),
        success: createTypeAlert('success'),
        warning: createTypeAlert('warning'),
        error: createTypeAlert('error'),
        hide,
      }}
    >
      {children}
      <Alert {...alertState} />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

let _alertContext: AlertContextType | undefined;

export const setAlertContext = (context: AlertContextType | undefined) => {
  _alertContext = context;
};

const isContextAvailable = (): boolean => {
  return !!_alertContext;
};

export const alertService = {
  alert: (options: Omit<AlertProps, 'visible'>) => {
    if (isContextAvailable()) {
      _alertContext?.alert(options);
    }
  },
  confirm: (options: ConfirmOptions) => {
    if (isContextAvailable()) {
      _alertContext?.confirm(options);
    }
  },
  info: (options: BaseAlertOptions) => {
    if (isContextAvailable()) {
      _alertContext?.info(options);
    }
  },
  success: (options: BaseAlertOptions) => {
    if (isContextAvailable()) {
      _alertContext?.success(options);
    }
  },
  warning: (options: BaseAlertOptions) => {
    if (isContextAvailable()) {
      _alertContext?.warning(options);
    }
  },
  error: (options: BaseAlertOptions) => {
    if (isContextAvailable()) {
      _alertContext?.error(options);
    }
  },
  hide: () => {
    if (isContextAvailable()) {
      _alertContext?.hide();
    }
  },
};

export const registerAlertHook = () => {
  const useRegisterAlert = () => {
    const alert = useAlert();
    React.useEffect(() => {
      setAlertContext(alert);
      return () => setAlertContext(undefined);
    }, [alert]);
  };

  return useRegisterAlert;
};
