import { OpenAI } from 'openai'
import config from 'config'
import fs from 'fs'
import {FormData} from "openai/_shims/formdata";

class Openai {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
    }
    constructor() {
        this.openai = new OpenAI({
            apiKey: config.get('OPENAI_KEY'),
            organization: config.get('ORGANIZATION')
        })
    }

    async chat(messages) {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
            })
            return response.choices[0].message
        } catch (e) {
            console.log('Error while gpt chat', e.message)
        }
    }
    async transcription(filepath) {
        try {
            const formData = new FormData()
            formData.append('fd', 'null');
            const audioFileStream = fs.createReadStream(String(filepath));
            const response = await this.openai.audio.transcriptions.create({
                    file: audioFileStream,
                    model: "whisper-1",
                    body: formData
            })
            console.log(response.text)
            return response.text
        } catch (e) {
            console.log('Error while transcription', e.message)
        }
    }
}
export const openai = new Openai(config.get('OPENAI_KEY'))