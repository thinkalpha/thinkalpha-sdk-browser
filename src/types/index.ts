import { WatchlistTableConfig } from '../features/client/types';

export interface ClientCredentials {
    clientId: string;
    clientSecret: string;
}

export type CheckLoadedMessage = {
    type: 'thinkalpha::check-loaded';
};
export type SubmitClientCredentialsMessage = {
    type: 'thinkalpha::submit-client-credentials';
    payload: ClientCredentials;
};

export type DrawNLPTableMessage = { type: 'thinkalpha::draw-nlp-table'; payload: string };

export type DrawWatchListMessage = { type: 'thinkalpha::draw-watch-list'; payload: WatchlistTableConfig };

export type OutgoingMessages =
    | CheckLoadedMessage
    | SubmitClientCredentialsMessage
    | DrawNLPTableMessage
    | DrawWatchListMessage;

export type SDKReadyMessage = { type: 'thinkalpha::sdk-ready' };
export type AuthReadyMessage = { type: 'thinkalpha::auth-ready' };
export type NLPTableReadyMessage = { type: 'thinkalpha::nlp-table-drawn' };

export type IncomingMessages = SDKReadyMessage | AuthReadyMessage | NLPTableReadyMessage;
