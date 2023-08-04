-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "FAQ" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUser" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "employeeSince" TIMESTAMP(3),
    "employeeInfo" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',

    CONSTRAINT "TeamUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamUserReview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startCount" INTEGER NOT NULL DEFAULT 4,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teamUserId" INTEGER NOT NULL,

    CONSTRAINT "TeamUserReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyReview" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startCount" INTEGER NOT NULL DEFAULT 4,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "CompanyReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamUser_username_key" ON "TeamUser"("username");

-- AddForeignKey
ALTER TABLE "TeamUserReview" ADD CONSTRAINT "TeamUserReview_teamUserId_fkey" FOREIGN KEY ("teamUserId") REFERENCES "TeamUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
