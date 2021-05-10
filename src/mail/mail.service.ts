import { Inject, Injectable } from '@nestjs/common'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { MailModuleOptions } from './mail.interfaces'
import * as FormData from 'form-data'
import got from 'got'

@Injectable()
export class MailService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {
        this.sendEmail('testing', 'test')
    }

    private async sendEmail(subject: string, content: string) {
        const form = new FormData()
        form.append('from', `Excited User <mailgun@${this.options.domain}>`)
        form.append('to', `negativ12fly@gmail.com`)
        form.append('subject', subject)
        form.append('template', 'verify-email')
        form.append('v:code', 'sekret-hash-code-vpopu')
        form.append('v:username', 'UserAboba')

        const response = await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString(
                    'base64',
                )}`,
            },
            body: form,
        })
        console.log(response.body)
    }
}
