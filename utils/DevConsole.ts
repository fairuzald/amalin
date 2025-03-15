import { Platform } from 'react-native';

const isDev = __DEV__ || process.env.NODE_ENV === 'development';

type ConsoleMethod =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'debug'
  | 'table'
  | 'trace'
  | 'group'
  | 'groupEnd'
  | 'groupCollapsed';

interface DevConsoleType extends Record<ConsoleMethod, (...args: any[]) => void> {
  labeled: (label: string, ...args: any[]) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  logIf: (condition: boolean, ...args: any[]) => void;
  network: (url: string, method: string, data?: any, response?: any) => void;
  action: (actionType: string, payload?: any) => void;
}

const DevConsole: DevConsoleType = {} as DevConsoleType;

const methods: ConsoleMethod[] = [
  'log',
  'info',
  'warn',
  'error',
  'debug',
  'table',
  'trace',
  'group',
  'groupEnd',
  'groupCollapsed',
];

methods.forEach(method => {
  DevConsole[method] = (...args: any[]) => {
    if (isDev) {
      const prefix = `[DEV]${Platform.OS === 'ios' ? '🍎' : '🤖'}`;
      console[method](prefix, ...args);
    }
  };
});

DevConsole.labeled = (label: string, ...args: any[]) => {
  if (isDev) {
    console.log(`[DEV][${label}]`, ...args);
  }
};

DevConsole.time = (label: string) => {
  if (isDev) {
    console.time(`[DEV][${label}]`);
  }
};

DevConsole.timeEnd = (label: string) => {
  if (isDev) {
    console.timeEnd(`[DEV][${label}]`);
  }
};

DevConsole.logIf = (condition: boolean, ...args: any[]) => {
  if (isDev && condition) {
    console.log('[DEV][CONDITIONAL]', ...args);
  }
};

DevConsole.network = (url: string, method: string, data?: any, response?: any) => {
  if (isDev) {
    console.groupCollapsed(`[DEV][NETWORK] ${method} ${url}`);
    data && console.log('Request:', data);
    response && console.log('Response:', response);
    console.groupEnd();
  }
};

DevConsole.action = (actionType: string, payload?: any) => {
  if (isDev) {
    console.log(`[DEV][ACTION] ${actionType}`, payload || '');
  }
};

export default DevConsole;
