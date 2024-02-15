import { ClientCredentials, IncomingMessages, OutgoingMessages } from '../types';
import { getRandomId } from './uuid';

function submitMessage<RequestMessage extends OutgoingMessages>(contentWindow: Window, message: RequestMessage) {
    contentWindow.postMessage(message, '*');
}

export async function sendAndRespond<RequestMessage extends OutgoingMessages, ResponseMessage extends IncomingMessages>(
    outgoing: RequestMessage,
    contentWindow: Window,
): Promise<ResponseMessage> {
    return new Promise((resolve, _reject) => {
        const messageId = getRandomId();

        function handleResponse(event: MessageEvent<IncomingMessages & { messageId?: string }>) {
            const { data } = event;

            if (data.messageId === messageId) {
                resolve(data as ResponseMessage);
                window.removeEventListener('message', handleResponse);
            }
        }

        window.addEventListener('message', handleResponse);
        submitMessage(contentWindow, { ...outgoing, messageId });
    });
}

export function waitForSDK(frame: HTMLIFrameElement, endpointUrl: string) {
    return new Promise(async (resolve, _reject) => {
        const { contentWindow } = frame;

        function checkForLoad(event: MessageEvent<IncomingMessages>) {
            if (event.data.type === 'thinkalpha::sdk-ready') {
                resolve(null);
                window.removeEventListener('message', checkForLoad);
            }
        }

        window.addEventListener('message', checkForLoad);

        if (contentWindow && frame.src === endpointUrl) {
            // In this case, the frame has already been loaded; so we
            // can check if it acks a message, and then resolve upon ack
            submitMessage(contentWindow, { type: 'thinkalpha::check-loaded' });
        } else {
            frame.src = endpointUrl;
        }
    });
}

export function waitForAuth(frame: HTMLIFrameElement, credentials: ClientCredentials) {
    return new Promise(async (resolve, reject) => {
        const { contentWindow } = frame;

        if (!contentWindow) {
            reject('No content window found');
            return;
        }

        function checkForAuth(event: MessageEvent<IncomingMessages>) {
            if (event.data.type === 'thinkalpha::auth-ready') {
                resolve(null);
                window.removeEventListener('message', checkForAuth);
            }
        }

        window.addEventListener('message', checkForAuth);

        submitMessage(contentWindow, { type: 'thinkalpha::submit-client-credentials', payload: credentials });
    });
}
