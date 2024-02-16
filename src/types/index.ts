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

export interface ClientCredentials {
  clientId: string;
  clientSecret: string;
}

export type SetStyleSheetMessage = {
  type: "thinkalpha::set-style-sheet";
  payload: string;
};

export type CheckLoadedMessage = {
  type: "thinkalpha::check-loaded";
};

export type SubmitClientCredentialsMessage = {
  type: "thinkalpha::submit-client-credentials";
  payload: ClientCredentials;
};

export type DrawNLPTableMessage = {
  type: "thinkalpha::draw-nlp-table";
  payload: string;
};

export type DrawWatchListMessage = {
  type: "thinkalpha::draw-watch-list";
  payload: WatchlistTableConfig;
};

export type OutgoingMessages =
  | CheckLoadedMessage
  | DrawNLPTableMessage
  | DrawWatchListMessage
  | SetStyleSheetMessage
  | SubmitClientCredentialsMessage;

export type SDKReadyMessage = { type: "thinkalpha::sdk-ready" };
export type AuthReadyMessage = { type: "thinkalpha::auth-ready" };
export type NLPTableReadyMessage = { type: "thinkalpha::nlp-table-drawn" };

export type IncomingMessages =
  | SDKReadyMessage
  | AuthReadyMessage
  | NLPTableReadyMessage;
