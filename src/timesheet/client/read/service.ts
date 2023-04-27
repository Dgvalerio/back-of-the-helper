import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';

import { TimesheetClientRead } from '@/timesheet/client/read/types';
import { timesheetRoutes } from '@/timesheet/client/utils/routes';
import { TimesheetInfosReadService } from '@/timesheet/infos/read/service';
import { decryptPassword } from '@/timesheet/infos/utils/decryptPassword';

import { AxiosRequestConfig } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar, Cookie } from 'tough-cookie';

@Injectable({ scope: Scope.REQUEST })
export class TimesheetClientReadService implements TimesheetClientRead.Service {
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
      console.error('Error on load cookies: ', e);
    }
  }

  async getAll(
    where: TimesheetClientRead.Input
  ): Promise<TimesheetClientRead.Client[]> {
    const { iv, content, login } = await this.timesheetInfosRead.getOne({
      userId: where.userId,
    });

    const password = await decryptPassword({ iv, content });

    const cookies = await this.loadCookies(login, password);

    return this.loadClients(cookies);
  }

  async loadCategories(
    projectId: TimesheetClientRead.Project['id'],
    cookies: Cookie[]
  ): Promise<TimesheetClientRead.Category[]> {
    try {
      const { data } = await this.httpService.axiosRef.post<
        { Id: number; Name: string }[]
      >(
        '/Worksheet/ReadCategory',
        `idproject=${projectId}`,
        this.configRequest(cookies)
      );

      return data.map(({ Id, Name }) => ({ id: Id, name: Name }));
    } catch (e) {
      console.error(`Error on get Categories from "${projectId}" process!`, e);

      return [];
    }
  }

  async loadProjects(
    clientId: TimesheetClientRead.Client['id'],
    cookies: Cookie[]
  ): Promise<TimesheetClientRead.Project[]> {
    try {
      const { data } = await this.httpService.axiosRef.post<
        {
          Id: number;
          Name: string;
          StartDate: string;
          EndDate: string;
          IdCustomer: number;
        }[]
      >(
        '/Worksheet/ReadProject',
        `idcustomer=${clientId}`,
        this.configRequest(cookies)
      );

      const promise = data.map(async (p) => ({
        ...p,
        categories: await this.loadCategories(p.Id, cookies),
      }));
      const projects = await Promise.all(promise);

      return projects.map((p) => ({
        id: p.Id,
        name: p.Name,
        startDate: p.StartDate,
        endDate: p.EndDate,
        categories: p.categories,
      }));
    } catch (e) {
      console.error(`Error on get Projects from "${clientId}" process!`, e);

      return [];
    }
  }

  async loadClients(cookies: Cookie[]): Promise<TimesheetClientRead.Client[]> {
    const clients: TimesheetClientRead.Client[] = [];

    try {
      const response = await this.httpService.axiosRef.get(
        '/Worksheet/Read',
        this.configRequest(cookies)
      );

      const html: string = response.data;

      const regex = /(name="IdCustomer">)([\w\W]+?)(<\/select>)/gm;
      const search: string = (html.match(regex) || [''])[0];

      const cleanedSearch = search.split(/\r\n/gm).join('');

      const values = cleanedSearch.match(/value="([\S\s]+?)??">([\S\s]+?)</g);

      if (!values) {
        if (html.match('<div class="login-content">'))
          console.error('Cookies are invalid!');
        else console.error('Options not found!');

        return [];
      }

      const clientsPromise: Promise<TimesheetClientRead.Client>[] = values.map(
        async (option) => {
          const [id, title] = option
            .replace(/value="([\S\s]+?)??">([\S\s]+?)</g, '$1|$2')
            .split('|');

          const projects = await this.loadProjects(id, cookies);

          if (id) clients.push({ id, title, projects });

          return { id: id || '-1', title, projects };
        }
      );

      await Promise.all(clientsPromise);
    } catch (e) {
      console.error('Error on Get Clients process!', e);
    }

    if (clients.length <= 0) console.error('Clients not loaded');

    return clients;
  }
}
