import { Api } from "@newstackdev/iosdk-newgraph-client-js";
export declare class CreatorApi extends Api<{
    token: string;
}> {
}
import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
export declare const NewgraphApi: () => {
    initialize(baseUrl: string): CreatorApi;
    getCurrentToken(): string;
    updateToken(token: string): void;
    authorize(): Promise<UserReadPrivateResponse>;
    readonly api: CreatorApi;
};
