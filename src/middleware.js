import { requestContext } from "./context.js";
import { reportTrace } from "./reportTrace.js";
import { getTraceId } from "./trace.js";

/*
    add new trace_id to incoming requests if not present
    receive service name, collectorUrl and api key from headers
    calcuate request latency (start time - end time)
    collect response status code
    report the data to ratquest server
*/
export function ratquestMiddleware(config) {
    /*
        config = {
            service: "service-name",
            collectorUrl: "https://ratquest.io/collect",
            apiKey: "your-api-key",
            debug: true/false
        }
    */
    return function (req, res, next) {
        const trace_id = getTraceId(req);
        const start = process.hrtime.bigint();

        requestContext.run({ trace_id }, () => {
            req.trace_id = trace_id;
            res.setHeader("x-trace-id", trace_id);

            res.on("finish", () => {
                const end = process.hrtime.bigint();
                const latency = Number(end - start) / 1e6;
    
                reportTrace({
                    traceId: trace_id,
                    service: config.service,
                    route: req.route?.path || req.originalUrl,
                    duration: Math.round(latency),
                    status: res.statusCode.toString(),
                    timestamp: new Date().toISOString()
                }, config);
            });
            next();
        })



    }

}