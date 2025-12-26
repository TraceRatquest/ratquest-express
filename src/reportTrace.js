import fetch from "node-fetch";

export async function reportTrace(data, config) {
    try {
        const res = await fetch(config.collectorUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": config.apiKey
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            config.debug && console.error("Failed to report trace -> ", await res.text())
        }
    } catch (error) {
        config.debug && console.error("Failed to report trace -> ", error)
    }
}