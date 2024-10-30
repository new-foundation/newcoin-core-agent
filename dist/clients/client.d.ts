export declare const NewgraphClient: (token: string) => {
    initialize(baseUrl: string): import("./newgraph").CreatorApi;
    getCurrentToken(): string;
    updateToken(token: string): void;
    authorize(): Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    readonly api: import("./newgraph").CreatorApi;
};
export type NewgraphClient = ReturnType<typeof NewgraphClient>;
