class coreHTTP {
    async processRequest(inMethod, url, content = 0) {
        try {
            let options = {
                method: inMethod,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            if (content !== 0) {
                options.body = content;
            }
            let result = await fetch(url, options);
            if (result.ok) {
                return await result.json();
            } else {
                return { error: `${inMethod} Error: ${result.status} ${result.statusText}` };
            }
        } catch (err) {
            return { error: err.message };
        }
    }
}
