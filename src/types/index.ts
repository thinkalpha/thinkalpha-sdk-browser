import { DisplaySettings } from "./displaySettings";

export interface ClientConfig {
  credentials: ClientCredentials;
  endpointUrl: string;
  frame: HTMLIFrameElement;
}

export interface NLPTableConfig {
  phrase: string;
  gridDisplaySettings?: DisplaySettings[];
}

export interface WatchlistTableConfig {
  columnTemplate: any; // ToDo: Pull relevant properties
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
  payload: NLPTableConfig;
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
