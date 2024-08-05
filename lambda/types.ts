interface ISecurityBase {
  symbol: string;
  description?: string;
  type: number;
}

export interface ICreateSecurity extends ISecurityBase {}
export interface ISecurity extends ISecurityBase {
  securityId: number;
  dateCreated: string;
  dateModified: string;
}

interface IExchangeBase {
  exchangeName: string;
}

export interface ICreateExchange extends IExchangeBase {}
export interface IExchange extends IExchangeBase {
  exchangeId: number;
  dateCreated: string;
  dateModified: string;
}

interface IListingBase {
  exchangeId: number;
  securityId: number;
  exchangeSecurityId: string;
  exchangeSecuritySymbol: string;
}

export interface ICreateListing extends IListingBase {}
export interface IListing extends IListingBase {
  dateCreated: string;
  dateModified: string;
}
