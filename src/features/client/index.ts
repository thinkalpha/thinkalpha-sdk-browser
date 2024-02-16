import { sendAndRespond, waitForAuth, waitForSDK } from "../../lib/messaging";
import {
  DrawNLPTableMessage,
  DrawWatchListMessage,
  NLPTableReadyMessage,
} from "../../types";
import {
  ClientConfig,
  NLPTableConfig,
  WatchlistTableConfig,
} from "../../types";

export class ThinkAlphaClient {
  constructor(private config: ClientConfig) {}

  async setStyleSheet(styleSheet: string, frame: HTMLIFrameElement) {
    await sendAndRespond(
      { type: "thinkalpha::set-style-sheet", payload: styleSheet },
      frame.contentWindow!
    );
  }

  async drawNlpTable(config: NLPTableConfig, frame: HTMLIFrameElement) {
    await waitForSDK(frame, this.config.endpointUrl);

    await waitForAuth(frame, this.config.credentials);

    await sendAndRespond<DrawNLPTableMessage, NLPTableReadyMessage>(
      {
        type: "thinkalpha::draw-nlp-table",
        payload: config.phrase,
      },
      frame.contentWindow!
    );
  }

  async drawWatchList(config: WatchlistTableConfig, frame: HTMLIFrameElement) {
    await waitForSDK(frame, this.config.endpointUrl);

    await waitForAuth(frame, this.config.credentials);

    await sendAndRespond<DrawWatchListMessage, NLPTableReadyMessage>(
      {
        type: "thinkalpha::draw-watch-list",
        payload: config,
      },
      frame.contentWindow!
    );
  }
}
