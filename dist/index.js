/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 32:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewcoinWriterAgent = exports.NewcoinReaderAgent = void 0;
const client_1 = __webpack_require__(27);
const reader_1 = __webpack_require__(181);
const writer_1 = __webpack_require__(117);
const NewcoinReaderAgent = (token) => {
    const client = (0, client_1.NewgraphClient)(token);
    return (0, reader_1.NewcoinReader)(client);
};
exports.NewcoinReaderAgent = NewcoinReaderAgent;
const NewcoinWriterAgent = (token) => {
    const client = (0, client_1.NewgraphClient)(token);
    return (0, writer_1.NewcoinWriter)(client);
};
exports.NewcoinWriterAgent = NewcoinWriterAgent;


/***/ }),

/***/ 234:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewcoinListener = void 0;
const wsclient_1 = __webpack_require__(141);
const _1 = __webpack_require__(32);
const DEBUG = process.env.NEWCOIN_CORE_DEBUG;
const NewcoinListener = (token, listener) => {
    const user = { current: {} };
    const writer = (0, _1.NewcoinWriterAgent)(token); // if a tree fell in a wood and someone heard it but said nothing, did it even happen?
    const currentP = writer.current().then((u) => {
        user.current = u;
        return u;
    });
    const newgraphWebsocketsClient = (0, wsclient_1.newgraphWebsocketsClientManager)((wsServer, token) => `${wsServer}?token=${encodeURIComponent(token)}`);
    ;
    newgraphWebsocketsClient.toggle(token);
    const stats = {
        totalStringSize: 0,
        messagesCount: 0
    };
    newgraphWebsocketsClient.socket?.addEventListener("open", () => {
        currentP.then(() => {
            console.log(`Listening as ${user.current.username}`);
        });
    });
    newgraphWebsocketsClient.socket?.addEventListener("message", async (msg) => {
        const msgSize = msg.data.toString().length;
        stats.totalStringSize += msgSize;
        stats.messagesCount += 1;
        if (msg.data == "pong") {
            return Promise.resolve();
        }
        ;
        const data = JSON.parse(msg.data.toString());
        // console.log("replying to: ", data.payload?.post?.content || "not replying")
        if (data.type == "newgraph" && data?.payload?.message == "post_in_folder") {
            const text = (data.payload?.post?.content || "").trim().replace(/\<[^\>]+\>/g, "");
            if (DEBUG) {
                console.log("Received: ", text);
            }
            // console.log(user.current.username, "Received", data.payload)
            if (!text.startsWith(`/${user.current.username}`)) //"/igorrubinovich.nco"))
                return Promise.resolve();
            if (listener) {
                const _r = listener(text.trim().replace(new RegExp(`/${user.current.username}`), ""), writer);
                const r = _r instanceof Promise ? await _r : _r;
                const rr = typeof r == "string" ? r : (r.filesPaths?.length ? r : r.content);
                if (DEBUG)
                    console.log("Replying: ", rr);
                if (typeof rr == "string") {
                    // await NewcoinWriter(agents[0]).postMessage(data.payload.folder.id!, "Hi, I'm a too basic bot. Cant tell you much but I can listen")
                    await writer.postMessage(data.payload.folder.id, rr);
                    console.log("replied to: ", data.payload.post.content, 'in folder', data.payload.folder.id);
                }
                else {
                    const filesPaths = rr.filesPaths || [undefined];
                    for (let i = 0; i < filesPaths.length; i++) {
                        const fp = filesPaths[i];
                        console.log("Uploading file", fp);
                        await writer.postMessage(data.payload.folder.id, i ? "" : rr.content, fp);
                    }
                }
            }
            // const p = await agents[0].api.post.postCreate({ content: "Hi, I'm a too basic bot. Cant tell you much but I can listen", contentType: "text/html" })
        }
    });
    return {
        get stats() {
            return stats;
        },
        wsclient: newgraphWebsocketsClient
    };
};
exports.NewcoinListener = NewcoinListener;


/***/ }),

/***/ 181:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewcoinReader = void 0;
const NewcoinReader = (client) => {
    let user;
    return ({
        current: async () => {
            if (user)
                return user;
            return user = await client.authorize();
        },
        getUser: async () => {
            return user;
        },
        toString: () => {
            return user.username;
        },
        listTopFolders: async (page = 0) => {
            console.log("Listing top folders...");
            return (await client.api.mood.listTopList({ page: page.toString() })).data;
        },
        listAttachedPosts: async (folderId, page = 0, order = "created") => {
            console.log(`Listing posts in folder ${folderId}...`);
            debugger;
            return (await client.api.mood.attachmentsList({ id: folderId, page: page.toString(), order: order })).data;
        },
        listOwnFolders: async () => {
            return (await client.api.user.moodsList()).data;
        },
        ratePost: async (postId, folderId, value) => {
            return (await client.api.mood.rateCreate({ targetId: postId, contextType: "folder", contextValue: folderId, value }));
        }
    });
};
exports.NewcoinReader = NewcoinReader;


/***/ }),

/***/ 117:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewcoinWriter = void 0;
const reader_1 = __webpack_require__(181);
const promises_1 = __webpack_require__(943);
const NewcoinWriter = (client) => {
    let user;
    return ({
        ...(0, reader_1.NewcoinReader)(client),
        toString: () => {
            return (user || {}).username;
        },
        createFolder: async (name) => {
            const f = await client.api.mood.moodCreate({
                name: name + new Date().toString()
            });
            return f.data;
        },
        postMessage: async (folderId, content, filePath, contentType) => {
            try {
                const post = await client.api.post.postCreate({
                    content: content || new Date().toString() + " test",
                    contentType,
                    moodId: folderId
                });
                await client.api.mood.attachPostUpdate({ id: folderId, targetId: post.data.id });
                if (filePath) {
                    const uploadInfo = await client.api.post.uploadCreate({ targetId: post.data.id, contentType: contentType || "image/jpeg", filename: filePath.split(/\//).at(-1) });
                    const r = await fetch(uploadInfo.data.url, {
                        method: "PUT",
                        body: await (0, promises_1.readFile)(filePath),
                    });
                    console.log("Upload status: ", r.status);
                }
                return post.data;
            }
            catch (ex) {
                console.error("Failed to post response: ", ex);
            }
        }
    });
};
exports.NewcoinWriter = NewcoinWriter;


/***/ }),

/***/ 27:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewgraphClient = void 0;
const newgraph_1 = __webpack_require__(278);
const API_URL = "https://api.newgra.ph/v1";
const NewgraphClient = (token) => {
    const a = (0, newgraph_1.NewgraphApi)();
    a.initialize(API_URL);
    a.updateToken(token);
    return a;
};
exports.NewgraphClient = NewgraphClient;


/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewgraphApi = exports.CreatorApi = void 0;
const iosdk_newgraph_client_js_1 = __webpack_require__(135);
class CreatorApi extends iosdk_newgraph_client_js_1.Api {
}
exports.CreatorApi = CreatorApi;
exports.NewgraphApi = (() => {
    let _api;
    let _token = "";
    return {
        initialize(baseUrl) {
            _api = new CreatorApi({
                baseUrl,
                securityWorker: (securityData) => {
                    return !securityData ? {} : { headers: { Authorization: securityData.token } };
                },
            });
            return _api;
        },
        getCurrentToken() {
            return _token;
        },
        updateToken(token) {
            _token = token;
            _api.setSecurityData({ token });
        },
        async authorize() {
            try {
                console.log(`Authorizeing with token:${this.getCurrentToken()}`);
                const r = await _api.user.currentList();
                console.log("Authorized as: ", r.data.username);
                return r.data;
            }
            catch (_ex) {
                const ex = _ex;
                throw ex;
            }
        },
        get api() {
            return _api;
        }
    };
});


/***/ }),

/***/ 141:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.newgraphWebsocketsClientManager = void 0;
const WEBSOCKETS_SERVER = "wss://wsapi.newgra.ph/v1";
const ws_1 = __importDefault(__webpack_require__(86));
const newgraphWebsocketsClientManager = (upd) => {
    const state = {
        socket: null,
    };
    const outboundQueue = [];
    let pingInterval;
    let pingCounter = 0;
    let _token = "";
    const processPong = (ev) => {
        if (ev.data === "pong") {
            pingCounter = Math.max(pingCounter - 1, 0); // without the .max if disconnect occurs between ping and pong, after reconnection will go to negative values and delay disconnect detection
            console.log("pong, pingCounter == ", pingCounter, new Date().toISOString());
        }
    };
    const handleNoPing = () => {
        console.log("Websockets ping failed, trying to reconnect");
        if (_token)
            toggle(_token);
        else
            console.log("No token, not attempting to resume after failed ping");
    };
    const startPing = () => (pingInterval = setInterval(() => {
        if (pingCounter > 0) {
            pingCounter--;
            return handleNoPing();
        }
        try {
            state?.socket?.send("ping");
        }
        catch (ex) {
            console.log("Couldn't ping:", ex);
            return handleNoPing();
        }
        pingCounter++;
        console.log("ping, pingCounter == ", pingCounter);
    }, 10000));
    const stopPing = () => {
        clearInterval(pingInterval);
    };
    const logConnected = () => console.log("Websockets client connected");
    const logDisconnected = () => console.log("Websockets client disconnected");
    const logError = (err) => console.log(err);
    const sendQueued = () => {
        let msg;
        for (msg of outboundQueue)
            state.send(msg);
    };
    const eventHandlers = {
        open: [startPing, sendQueued, logConnected],
        close: [stopPing],
        error: [logError],
        message: [processPong],
        upgrade: [(res) => {
                console.log('Upgrade response status:', res.statusCode);
                console.log('Headers:', res.headers);
            }],
        'unexpected-response': [(req, res) => {
                console.error('Unexpected response:', res.statusCode);
                res.on('data', (chunk) => {
                    console.error('Body:', chunk.toString());
                });
            }]
    };
    const toggle = async (token) => {
        debugger;
        _token = token;
        const url = upd(WEBSOCKETS_SERVER, token);
        if (state.url === url)
            return;
        state.url = url;
        if (state.socket) {
            // clean up subscriptions
            Object.keys(eventHandlers)
                .forEach((eventName) => eventHandlers[eventName].forEach(handler => state.socket?.removeEventListener(eventName, handler)));
            state.socket.close();
            state.socket = null;
        }
        stopPing();
        if (token && url) {
            state.socket = new ws_1.default(url);
            // subscribe to events
            Object.keys(eventHandlers)
                .forEach(eventName => eventHandlers[eventName].forEach(handler => state.socket?.addEventListener(eventName, handler)));
        }
    };
    state.toggle = toggle;
    state.send = (msg) => {
        if (state.socket?.readyState == state.socket?.CONNECTING) {
            outboundQueue.push(msg);
            return;
        }
        if (typeof msg != "string")
            msg = JSON.stringify(msg);
        state.socket?.send(msg);
    };
    return state;
};
exports.newgraphWebsocketsClientManager = newgraphWebsocketsClientManager;


/***/ }),

/***/ 135:
/***/ ((module) => {

module.exports = require("@newstackdev/iosdk-newgraph-client-js");

/***/ }),

/***/ 86:
/***/ ((module) => {

module.exports = require("ws");

/***/ }),

/***/ 943:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._ = exports.NewcoinWriterAgent = exports.NewcoinReaderAgent = exports.NewcoinListener = void 0;
const agents_1 = __webpack_require__(32);
Object.defineProperty(exports, "NewcoinReaderAgent", ({ enumerable: true, get: function () { return agents_1.NewcoinReaderAgent; } }));
Object.defineProperty(exports, "NewcoinWriterAgent", ({ enumerable: true, get: function () { return agents_1.NewcoinWriterAgent; } }));
const listener_1 = __webpack_require__(234);
Object.defineProperty(exports, "NewcoinListener", ({ enumerable: true, get: function () { return listener_1.NewcoinListener; } }));
exports["default"] = listener_1.NewcoinListener;
exports._ = "hi";

})();

module.exports = __webpack_exports__;
/******/ })()
;