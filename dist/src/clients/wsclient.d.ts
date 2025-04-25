import WebSocket from 'ws';
export type WSState = {
    socket: WebSocket | null;
    toggle: (token: string) => void;
    url: string;
    send: (msg: any) => void;
    upgrade: (msg: any) => void;
    "unexpected-response": (req: any, res: any) => void;
};
export declare const newgraphWebsocketsClientManager: (upd: (wsServer: string, token: string) => string) => WSState;
export type NewgraphWebsocketsClient = ReturnType<typeof newgraphWebsocketsClientManager>;
