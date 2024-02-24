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

  async setStyleSheet(styleSheet: string) {
    await sendAndRespond(
      { type: "thinkalpha::set-style-sheet", payload: styleSheet },
      this.config.frame.contentWindow!
    );
  }

  async drawNlpTable(config: NLPTableConfig) {
    await waitForSDK(this.config.frame, this.config.endpointUrl);

    await waitForAuth(this.config.frame, this.config.credentials);

    await sendAndRespond<DrawNLPTableMessage, NLPTableReadyMessage>(
      {
        type: "thinkalpha::draw-nlp-table",
        payload: config,
      },
      this.config.frame.contentWindow!
    );
  }

  async drawWatchList(config: WatchlistTableConfig) {
    await waitForSDK(this.config.frame, this.config.endpointUrl);
    await waitForAuth(this.config.frame, this.config.credentials);

    await sendAndRespond<DrawWatchListMessage, NLPTableReadyMessage>(
      {
        type: "thinkalpha::draw-watch-list",
        payload: config,
      },
      this.config.frame.contentWindow!
    );
  }
}
