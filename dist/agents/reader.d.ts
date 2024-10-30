import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NewgraphClient } from "../clients/client";
export declare const NewcoinReader: (client: NewgraphClient) => {
    current: () => Promise<UserReadPrivateResponse>;
    getUser: () => Promise<UserReadPrivateResponse>;
    toString: () => string | undefined;
    listTopFolders: (page?: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    listAttachedPosts: (folderId: string, page?: number, order?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodListAttachedResponse>;
    listOwnFolders: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    ratePost: (postId: string, folderId: string, value: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").HttpResponse<import("@newstackdev/iosdk-newgraph-client-js").RatingUpdateResponse, import("@newstackdev/iosdk-newgraph-client-js").ErrorResponse>>;
};
