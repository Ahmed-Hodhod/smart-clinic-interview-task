/*
  Warnings:

  - You are about to drop the column `doctorId` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `Assistant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AssistantToPatient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `birthdate` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'ASSISTANT');

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToPatient" DROP CONSTRAINT "_AssistantToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToPatient" DROP CONSTRAINT "_AssistantToPatient_B_fkey";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "doctorId",
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Assistant";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "_AssistantToPatient";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatientToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToUser_AB_unique" ON "_PatientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToUser_B_index" ON "_PatientToUser"("B");

-- AddForeignKey
ALTER TABLE "_PatientToUser" ADD CONSTRAINT "_PatientToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToUser" ADD CONSTRAINT "_PatientToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
