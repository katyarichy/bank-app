export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  id: number;
}

export interface Account {
  id: number;
  ownerId: number;
  currency: 'EUR' | 'USD';
  balance: number;
}
