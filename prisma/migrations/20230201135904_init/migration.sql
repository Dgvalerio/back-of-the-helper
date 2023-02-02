-- CreateTable
CREATE TABLE "TimesheetInfos" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TimesheetInfos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TimesheetInfos_login_key" ON "TimesheetInfos"("login");

-- CreateIndex
CREATE UNIQUE INDEX "TimesheetInfos_userId_key" ON "TimesheetInfos"("userId");

-- AddForeignKey
ALTER TABLE "TimesheetInfos" ADD CONSTRAINT "TimesheetInfos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
