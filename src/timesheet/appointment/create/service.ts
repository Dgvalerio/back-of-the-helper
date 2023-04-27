import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Scope } from '@nestjs/common';

import { TimesheetAppointmentCreate } from '@/timesheet/appointment/create/types';
import { timesheetRoutes } from '@/timesheet/client/utils/routes';
import { TimesheetInfosReadService } from '@/timesheet/infos/read/service';
import { decryptPassword } from '@/timesheet/infos/utils/decryptPassword';

import { AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { Cookie, CookieJar } from 'tough-cookie';

@Injectable({ scope: Scope.REQUEST })
export class TimesheetAppointmentCreateService
  implements TimesheetAppointmentCreate.Service
{
  constructor(
    private readonly httpService: HttpService,
    private timesheetInfosRead: TimesheetInfosReadService
  ) {}

  configRequest(cookies: Cookie[]): AxiosRequestConfig {
    const cookie: string = cookies.reduce(
      (previous, { key, value }) => `${previous} ${key}=${value};`,
      ''
    );

    return {
      baseURL: timesheetRoutes.home,
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'x-requested-with': 'XMLHttpRequest',
        cookie,
        Referer: timesheetRoutes.worksheetRead,
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
    };
  }

  async loadCookies(login: string, password: string): Promise<Cookie[]> {
    try {
      const response = await this.httpService.axiosRef.get(
        timesheetRoutes.accountLogin
      );

      const regex = /value="([\S\s]+?)??" \/>/g;
      const token = regex.exec(response.data)[1];

      const verificationToken = response.headers['set-cookie']
        .find((ck) => ck.includes('__RequestVerificationToken'))
        .split(';')[0]
        .split('=')[1];

      const cookieJar = new CookieJar();

      wrapper(this.httpService.axiosRef);

      await this.httpService.axiosRef.post(
        timesheetRoutes.accountLogin,
        `__RequestVerificationToken=${token}&Login=${login}&Password=${password}`,
        {
          headers: {
            cookie: `__RequestVerificationToken=${verificationToken};`,
          },
          jar: cookieJar,
          withCredentials: true,
        }
      );

      const { cookies } = cookieJar.toJSON();

      return cookies as Cookie[];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error on load cookies: ', e);
    }
  }

  makeBody(
    WebKitFormBoundary: string,
    data: TimesheetAppointmentCreate.TimesheetAppointment
  ): string {
    const start = `------WebKitFormBoundary${WebKitFormBoundary}\r\nContent-Disposition: form-data; `;

    const values = Object.entries(data).reduce(
      (prev, [key, value]) =>
        prev + `${start}name="${key}"\r\n\r\n${value}\r\n`,
      ''
    );

    return `${values}------WebKitFormBoundary${WebKitFormBoundary}--\r\n`;
  }

  appointmentParse(
    data: TimesheetAppointmentCreate.Appointment
  ): Omit<
    TimesheetAppointmentCreate.TimesheetAppointment,
    '__RequestVerificationToken'
  > {
    return {
      Id: '0',
      IdCustomer: data.client,
      IdProject: data.project,
      IdCategory: data.category,
      InformedDate: data.date,
      StartTime: data.startTime,
      EndTime: data.endTime,
      NotMonetize: data.notMonetize ? 'true' : 'false',
      CommitRepository: data.commitLink || 'Não aplicado.',
      Description: data.description,
    };
  }

  async create(
    userId: string,
    appointments: TimesheetAppointmentCreate.Appointment[]
  ): Promise<TimesheetAppointmentCreate.Output[]> {
    if (appointments.length <= 0) {
      throw new BadRequestException('Não há nada para apontar!');
    }

    const { iv, content, login } = await this.timesheetInfosRead.getOne({
      userId,
    });

    const password = await decryptPassword({ iv, content });

    const cookies = await this.loadCookies(login, password);

    try {
      const response = await this.httpService.axiosRef.get(
        '/Worksheet/Read',
        this.configRequest(cookies)
      );

      const regex =
        /name="__RequestVerificationToken" type="hidden" value="([\S\s]+?)??" \/>/g;
      const __RequestVerificationToken = regex.exec(response.data)[1];

      const cookie: string = cookies.reduce(
        (previous, { key, value }) => `${previous} ${key}=${value};`,
        ''
      );

      const WebKitFormBoundary = 'MAKEaAppoINtmEnB';

      const promise = appointments.map(
        async (appointment): Promise<TimesheetAppointmentCreate.Output> => {
          const { data } = await this.httpService.axiosRef.post<string>(
            'https://luby-timesheet.azurewebsites.net/Worksheet/Update',
            this.makeBody(WebKitFormBoundary, {
              ...this.appointmentParse(appointment),
              __RequestVerificationToken,
            }),
            {
              headers: {
                accept:
                  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'max-age=0',
                'content-type': `multipart/form-data; boundary=----WebKitFormBoundary${WebKitFormBoundary}`,
                'sec-ch-ua':
                  '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                cookie,
                Referer:
                  'https://luby-timesheet.azurewebsites.net/Worksheet/Read',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
              },
            }
          );

          const regexError = /<div class="alert alert-danger">([\S\s]+?)??<a/gm;
          const errorResult = regexError.exec(data);

          return {
            ...appointment,
            success: !errorResult,
            errorMessage: errorResult ? errorResult[1] : undefined,
          };
        }
      );

      return await Promise.all(promise);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e });
    }
  }
}
