-- CreateTable
CREATE TABLE "GithubRepository" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GithubRepository_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GithubRepository" ADD CONSTRAINT "GithubRepository_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
