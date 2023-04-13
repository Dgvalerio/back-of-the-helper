-- CreateTable
CREATE TABLE "GithubInfos" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GithubInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubInfos_userId_key" ON "GithubInfos"("userId");

-- AddForeignKey
ALTER TABLE "GithubInfos" ADD CONSTRAINT "GithubInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
