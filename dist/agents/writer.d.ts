import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NewgraphClient } from "../clients/client";
export declare const NewcoinWriter: (client: NewgraphClient) => {
    toString: () => string | undefined;
    createFolder: (name: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodCreateResponse>;
    postMessage: (folderId: string, content: string, filePath?: string, contentType?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").PostCreateResponse | undefined>;
    current: () => Promise<UserReadPrivateResponse>;
    getUser: () => Promise<UserReadPrivateResponse>;
    listTopFolders: (page?: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    listAttachedPosts: (folderId: string, page?: number, order?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodListAttachedResponse>;
    listOwnFolders: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    ratePost: (postId: string, folderId: string, value: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").HttpResponse<import("@newstackdev/iosdk-newgraph-client-js").RatingUpdateResponse, import("@newstackdev/iosdk-newgraph-client-js").ErrorResponse>>;
};
