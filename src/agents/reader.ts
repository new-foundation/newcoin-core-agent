import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NewgraphClient } from "../clients/client"

export const NewcoinReader = (client: NewgraphClient) => {
    let user: UserReadPrivateResponse;
    return ({
        current: async () => {
            if(user)
                return user;
            return user = await client.authorize();
        },
        getUser: async () => {
            return user;
        },
        toString: () => {
            return user.username;
        },

        listTopFolders: async (page: number = 0) => {
            console.log("Listing top folders...")
            return (await client.api.mood.listTopList({ page: page.toString() })).data;
        },

        listAttachedPosts: async (folderId: string, page: number = 0, order: string = "created") => {
            console.log(`Listing posts in folder ${folderId}...`);
            debugger;
            return (await client.api.mood.attachmentsList({ id: folderId, page: page.toString(), order: order })).data;
        },
        listOwnFolders: async () => {
            return (await client.api.user.moodsList()).data;
        },
        ratePost: async (postId: string, folderId: string, value: number) => {
            return (await client.api.mood.rateCreate({ targetId: postId, contextType: "folder", contextValue: folderId, value }));
        }
    })
};
