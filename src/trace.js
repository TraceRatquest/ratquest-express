import crypto from "crypto";

export function getTraceId(req) {
    let trace_id = req.headers["x-trace-id"];
    !trace_id && (trace_id = crypto.randomUUID());
    return trace_id;
}