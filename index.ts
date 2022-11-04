async function __fetch(input: NFetch.Input,init: NFetch.RequestOptions = undefined)
{
    const response = await window.fetch(input,init)
    if(response.ok) return response
    throw new Error(`Couldn't get ${input}!`)
}

async function NFetch(input: NFetch.Input,type: "blob",init?: NFetch.RequestOptions): Promise<Blob>
async function NFetch(input: NFetch.Input,type: "text",init?: NFetch.RequestOptions): Promise<string>
async function NFetch(input: NFetch.Input,type: "json",init?: NFetch.RequestOptions): Promise<object>
async function NFetch(input: NFetch.Input,type: "image",init?: NFetch.RequestOptions): Promise<ImageBitmap>
async function NFetch(input: NFetch.Input,type: "audio",init?: NFetch.RequestOptions): Promise<HTMLAudioElement>
async function NFetch(input: NFetch.Input,type: "arraybuffer",init?: NFetch.RequestOptions): Promise<ArrayBuffer>
async function NFetch(input: NFetch.Input,type: "form",init?: NFetch.RequestOptions): Promise<FormData>
async function NFetch(input: NFetch.Input,type: "response",init?: NFetch.RequestOptions): Promise<Response>
async function NFetch(input: NFetch.Input,type: NFetch.Type,init: NFetch.RequestOptions = undefined)
{
    const response = await __fetch(input,init)
    if(type == "blob") return await response.blob()
    else if(type == "text") return await response.text()
    else if(type == "json") return await response.json()
    else if(type == "image") return await createImageBitmap(await response.blob())
    else if(type == "audio") return new Audio(URL.createObjectURL(await response.blob()))
    else if(type == "arraybuffer") return await response.arrayBuffer()
    else if(type == "form") return await response.formData()
    else if(type == "response") return response
    else throw new Error(`${type} is not a vaild type!`)
}

namespace NFetch
{
    export type Input = RequestInfo | URL
    export type RequestOptions = RequestInit | undefined
    export type Type = "blob" | "text" | "json" | "image" | "audio" | "arraybuffer" | "form" | "response"
}

export default NFetch