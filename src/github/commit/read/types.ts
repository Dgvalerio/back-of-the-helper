import { Field, ObjectType } from '@nestjs/graphql';

import { GithubRepositoryRead } from '@/github/repository/read/types';
import { UserRead } from '@/user/read/types';
import { Endpoints } from '@octokit/types';

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
      githubToken: UserRead.Output['githubInfos']['token']
    ): Promise<LoadOutput[]>;
    loadGroupedByDay(
      userId: UserRead.Output['id'],
      userEmail: UserRead.Output['email'],
      githubToken: UserRead.Output['githubInfos']['token']
    ): Promise<GithubCommitDayGroup[]>;
    translateConventionalCommits(
      commits: GithubCommitRead.LoadOutput[]
    ): GithubCommitRead.LoadOutput[];
    parseLocation(
      commits: GithubCommitRead.LoadOutput[]
    ): GithubCommitRead.LoadOutput[];
    translateMessage(
      commits: GithubCommitRead.LoadOutput[]
    ): Promise<GithubCommitRead.LoadOutput[]>;
    loadAndTranslate(
      userId: UserRead.Output['id'],
      userEmail: UserRead.Output['email'],
      githubToken: UserRead.Output['githubInfos']['token']
    ): Promise<GithubCommitRead.LoadOutput[]>;
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
}
