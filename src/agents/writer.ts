import { UserReadPrivateResponse } from "@newstackdev/iosdk-newgraph-client-js";
import { NewgraphClient } from "../clients/client"
import { NewcoinReader } from "./reader";
import { readFile } from "fs/promises";

export const NewcoinWriter = (client: NewgraphClient) => {
    let user: UserReadPrivateResponse;
    return ({
        ...NewcoinReader(client),
        toString: () => {
            return (user! || {}).username;
        },
        createFolder: async (name: string) => {
            const f = await client.api.mood.moodCreate({
                name: name + new Date().toString()
            } as any);

            return f.data;
        },
        postMessage: async (folderId: string, content: string, filePath?: string, contentType?: string) => {
            try {
                const np = {
                    content: content || new Date().toString() + " test",
                    contentType: contentType || "text/plain",
                    moodId: folderId
                };
                
                const post = await client.api.post.postCreate(np);
                
                await client.api.mood.attachPostUpdate({ id: folderId, targetId: post.data.id! })
                
                if(filePath) {
                    const uploadInfo = await client.api.post.uploadCreate({ targetId: post.data.id!, contentType: contentType || "image/jpeg", filename: filePath.split(/\//).at(-1)! })
                    const r = await fetch(uploadInfo.data.url as string, {
                        method: "PUT",
                        body: await readFile(filePath),
                      });
    
                    console.log("Upload status: ", r.status);
                }
    
                return post.data;    
            } catch (ex) {
                console.error("Failed to post response: ", ex);
            }
        }
    })
};
