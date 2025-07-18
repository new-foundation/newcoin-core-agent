import { NewcoinWriterAgent } from ".";
export type NewcoinAgentHandlerResponse = string | {
    content: string;
    filesPaths?: string[];
};
export type NewcoinAgentHandler = (msg: string, agent: ReturnType<typeof NewcoinWriterAgent>) => NewcoinAgentHandlerResponse | Promise<NewcoinAgentHandlerResponse>;
export declare const NewcoinListener: (token: string, listener?: NewcoinAgentHandler) => {
    readonly stats: {
        totalStringSize: number;
        messagesCount: number;
    };
    wsclient: import("../clients/wsclient").WSState;
};
