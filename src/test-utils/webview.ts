import type {Page} from '@playwright/test';

type BridgeMessage = {type: string; id: string; payload: Record<string, unknown>};
export const installWebviewBridge = async (
    page: Page,
    response: Record<string, unknown> = {}
): Promise<Array<BridgeMessage>> => {
    const messages: Array<BridgeMessage> = [];
    await page.exposeFunction('recordBridgeMessage', (message: BridgeMessage) => {
        messages.push(message);
    });
    await page.addInitScript(
        ({response}) => {
            const bridgeWindow = window as unknown as {
                tuentiWebView: {postMessage: (message: string) => void};
                __tuenti_webview_bridge: {postMessage: (message: string) => void};
                recordBridgeMessage: (message: BridgeMessage) => Promise<void>;
            };
            bridgeWindow.tuentiWebView = {
                postMessage: async (serialized) => {
                    const message: BridgeMessage = JSON.parse(serialized);
                    await bridgeWindow.recordBridgeMessage(message);
                    bridgeWindow['__tuenti_webview_bridge'].postMessage(
                        JSON.stringify({...message, payload: response})
                    );
                },
            };
        },
        {response}
    );
    return messages;
};
