/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PatientToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `medicalInfo` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PatientToUser" DROP CONSTRAINT "_PatientToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToUser" DROP CONSTRAINT "_PatientToUser_B_fkey";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "medicalInfo" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_PatientToUser";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assistant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_email_key" ON "Assistant"("email");
