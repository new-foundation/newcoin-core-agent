export declare const NewcoinReaderAgent: (token: string) => {
    current: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    getUser: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    toString: () => string | undefined;
    listTopFolders: (page?: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    listAttachedPosts: (folderId: string, page?: number, order?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodListAttachedResponse>;
    listOwnFolders: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    ratePost: (postId: string, folderId: string, value: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").HttpResponse<import("@newstackdev/iosdk-newgraph-client-js").RatingUpdateResponse, import("@newstackdev/iosdk-newgraph-client-js").ErrorResponse>>;
};
export declare const NewcoinWriterAgent: (token: string) => {
    toString: () => string | undefined;
    createFolder: (name: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodCreateResponse>;
    postMessage: (folderId: string, content: string, filePath?: string, contentType?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").PostCreateResponse | undefined>;
    current: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    getUser: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").UserReadPrivateResponse>;
    listTopFolders: (page?: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    listAttachedPosts: (folderId: string, page?: number, order?: string) => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodListAttachedResponse>;
    listOwnFolders: () => Promise<import("@newstackdev/iosdk-newgraph-client-js").MoodPagedListReadPublicResponse>;
    ratePost: (postId: string, folderId: string, value: number) => Promise<import("@newstackdev/iosdk-newgraph-client-js").HttpResponse<import("@newstackdev/iosdk-newgraph-client-js").RatingUpdateResponse, import("@newstackdev/iosdk-newgraph-client-js").ErrorResponse>>;
};
