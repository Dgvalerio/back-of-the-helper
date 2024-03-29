import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { GithubRepositoryRead } from '@/github/repository/read/types';
import { UserRead } from '@/user/read/types';
import { Endpoints } from '@octokit/types';

import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsMilitaryTime,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export namespace GithubCommitRead {
  export type Commits =
    Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'];

  export type Commit = Commits[number];

  export interface Service {
    dateNow(dateString: Commit['commit']['committer']['date']): string;
    simplifyCommit(repo: string, _: Commit): LoadOutput;
    removeMerge(commits: LoadOutput[]): LoadOutput[];
    joinRepositoryCommits(commits: LoadOutput[][]): LoadOutput[];
    sortCommitsByDate(commits: LoadOutput[]): LoadOutput[];
    load(
      userId: UserRead.Output['id'],
      userEmail: UserRead.Output['email'],
      githubToken: UserRead.Output['githubInfos']['token'],
      when: DateFilter
    ): Promise<LoadOutput[]>;
    simpleLoad(
      userId: UserRead.Output['id'],
      userEmail: UserRead.Output['email'],
      githubToken: UserRead.Output['githubInfos']['token'],
      options: Input
    ): Promise<LoadOutput[]>;
    groupedLoad(
      userId: UserRead.Output['id'],
      userEmail: UserRead.Output['email'],
      githubToken: UserRead.Output['githubInfos']['token'],
      options: Input
    ): Promise<GithubCommitDayTimeGroup[]>;
    groupByDay(commits: LoadOutput[]): Promise<GithubCommitDayGroup[]>;
    translateConventionalCommits(commits: LoadOutput[]): LoadOutput[];
    parseLocation(commits: LoadOutput[]): LoadOutput[];
    translateMessage(commits: LoadOutput[]): Promise<LoadOutput[]>;
    translateCommits(commits: LoadOutput[]): Promise<LoadOutput[]>;
  }

  @InputType('GithubCommitReadDayTime')
  export class DayTime {
    // Horário inicial do apontamento (no formato HH:MM).
    @IsMilitaryTime()
    start: string;

    // Horário final do apontamento (no formato HH:MM).
    @IsMilitaryTime()
    end: string;
  }

  @InputType('GithubCommitReadDateFilter')
  export class DateFilter {
    // Desde quando (no formato 2022-12-01T00:00:00Z).
    @IsDateString()
    @IsOptional()
    since?: string;

    // Até quando (no formato 2022-12-01T00:00:00Z).
    @IsDateString()
    @IsOptional()
    until?: string;
  }

  @InputType('GithubCommitReadInput')
  export class Input {
    @IsBoolean()
    @IsOptional()
    translate?: boolean;

    @IsArray()
    @IsOptional()
    @ValidateNested()
    @Type(() => DayTime)
    dayTimes?: DayTime[];

    @IsOptional()
    @ValidateNested()
    @Type(() => DateFilter)
    when?: DateFilter;
  }

  @ObjectType('GithubCommitLoadOutput')
  export class LoadOutput {
    @Field()
    repo: GithubRepositoryRead.Output['fullName'];

    @Field()
    date: Commit['commit']['committer']['date'];

    @Field()
    description: Commit['commit']['message'];

    @Field()
    commit: Commit['html_url'];
  }

  @ObjectType('GithubCommitDayGroup')
  export class GithubCommitDayGroup {
    @Field()
    date: Commit['commit']['committer']['date'];

    @Field()
    commits: GithubCommitOfDayGroup[];
  }

  @ObjectType('GithubCommitOfDayGroup')
  export class GithubCommitOfDayGroup {
    @Field()
    repo: GithubRepositoryRead.Output['fullName'];

    @Field()
    time: Commit['commit']['committer']['date'];

    @Field()
    description: Commit['commit']['message'];

    @Field()
    commit: Commit['html_url'];
  }

  @ObjectType('GithubCommitDayTimeGroup')
  export class GithubCommitDayTimeGroup {
    @Field()
    date: Commit['commit']['committer']['date'];

    @Field()
    commits: GithubCommitTimeGroup[];
  }

  @ObjectType('GithubCommitTimeGroup')
  export class GithubCommitTimeGroup {
    @Field()
    startTime: Commit['commit']['committer']['date'];

    @Field()
    endTime: Commit['commit']['committer']['date'];

    @Field()
    items: GithubCommitTimeGroupItems[];
  }

  @ObjectType('GithubCommitTimeGroupItems')
  export class GithubCommitTimeGroupItems {
    @Field()
    repo: GithubRepositoryRead.Output['fullName'];

    @Field()
    commits: GithubCommitOfDayTimeGroup[];
  }

  @ObjectType('GithubCommitOfDayTimeGroup')
  export class GithubCommitOfDayTimeGroup {
    @Field()
    description: Commit['commit']['message'];

    @Field()
    commit: Commit['html_url'];
  }
}
