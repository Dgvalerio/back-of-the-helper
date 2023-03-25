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
}
