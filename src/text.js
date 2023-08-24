import {dirname, resolve} from "path";
import { fileURLToPath } from "url";
import {readFileSync} from "fs"

const __dirname = dirname(fileURLToPath(import.meta.url))

class TextConvertor {
    getToken() {
        const key = JSON.parse(
            readFileSync(resolve(__dirname, '../google-youtube.jsno'))
        )

        const token = 
    }
    textToSpeech(text) {

    }
}

export const textConvertor = new TextConvertor()