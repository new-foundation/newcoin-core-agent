import { NewgraphApi } from "./newgraph";

const API_URL = "https://api.newgra.ph/v1";

export const NewgraphClient = (token: string) => {
    const a = NewgraphApi();
    a.initialize(API_URL);
    a.updateToken(token);
    return a;
}

export type NewgraphClient = ReturnType<typeof NewgraphClient>;