import { ClientCredentials } from '../../../types';

export interface ClientConfig {
    credentials: ClientCredentials;
    endpointUrl: string;
}

export interface NLPTableConfig {
    phrase: string;
}

export interface WatchlistTableConfig {
    // ToDo: column template
    symbols: string[];
}
