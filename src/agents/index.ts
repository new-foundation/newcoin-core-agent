import { NewgraphClient } from "../clients/client";
import { NewcoinReader } from "./reader";
import { NewcoinWriter } from "./writer";

export const NewcoinReaderAgent = (token: string) => {
    const client = NewgraphClient(token)
    return NewcoinReader(client);
}


export const NewcoinWriterAgent = (token: string) => {
    const client = NewgraphClient(token)
    return NewcoinWriter(client);
}