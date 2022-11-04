"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function __fetch(input, init = undefined) {
    const response = await window.fetch(input, init);
    if (response.ok)
        return response;
    throw new Error(`Couldn't get ${input}!`);
}
async function NFetch(input, type, init = undefined) {
    const response = await __fetch(input, init);
    if (type == "blob")
        return await response.blob();
    else if (type == "text")
        return await response.text();
    else if (type == "json")
        return await response.json();
    else if (type == "image")
        return await createImageBitmap(await response.blob());
    else if (type == "audio")
        return new Audio(URL.createObjectURL(await response.blob()));
    else if (type == "arraybuffer")
        return await response.arrayBuffer();
    else if (type == "form")
        return await response.formData();
    else if (type == "response")
        return response;
    else
        throw new Error(`${type} is not a vaild type!`);
}
exports.default = NFetch;
//# sourceMappingURL=index.js.map