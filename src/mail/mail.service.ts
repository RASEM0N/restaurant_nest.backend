import { Inject, Injectable } from '@nestjs/common'
import { CONFIG_OPTIONS } from 'src/common/common.constants'
import { EmailVars, MailModuleOptions } from './mail.interfaces'
import * as FormData from 'form-data'
import got from 'got'

@Injectable()
export class MailService {
    constructor(@Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions) {}

    private async sendEmail(subject: string, to: string, template: string, emailVars: EmailVars[]) {
        const form = new FormData()
        form.append('from', `RASE from Nuber EA <mailgun@${this.options.domain}>`)
        form.append('to', to)
        form.append('subject', subject)
        form.append('template', template)
        emailVars.forEach((eVar) => form.append(eVar.key, eVar.value))

        try {
            await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(`api:${this.options.apiKey}`).toString(
                        'base64',
                    )}`,
                },
                body: form,
            })
        } catch (error) {
            console.log(error)
        }
    }

    async sendVerificationEmail(email: string, code: string) {
        await this.sendEmail('Verify your email', email, 'verify-email', [
            { key: 'v:code', value: code },
            { key: 'v:username', value: email },
        ])
    }
}
