import fetch from "node-fetch";
import { requestContext } from "./context.js";

export function connectMicro() {
    return async (url, options = {}) => {
        const store = requestContext.getStore();
        const trace_id = store?.trace_id;

        options.headers = {
            ...options.headers,
            ...(trace_id && { "x-trace-id": trace_id })
        };
        return fetch(url, options);
    };
}