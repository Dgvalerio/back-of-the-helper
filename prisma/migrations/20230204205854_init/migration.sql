-- CreateTable
CREATE TABLE "GithubBranch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sha" TEXT NOT NULL,
    "repositoryId" TEXT NOT NULL,

    CONSTRAINT "GithubBranch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubBranch_repositoryId_key" ON "GithubBranch"("repositoryId");

-- AddForeignKey
ALTER TABLE "GithubBranch" ADD CONSTRAINT "GithubBranch_repositoryId_fkey" FOREIGN KEY ("repositoryId") REFERENCES "GithubRepository"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
