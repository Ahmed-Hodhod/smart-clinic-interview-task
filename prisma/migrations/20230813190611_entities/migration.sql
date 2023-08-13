/*
  Warnings:

  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AssistantToPatient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToPatient" DROP CONSTRAINT "_AssistantToPatient_A_fkey";

-- DropForeignKey
ALTER TABLE "_AssistantToPatient" DROP CONSTRAINT "_AssistantToPatient_B_fkey";

-- DropTable
DROP TABLE "Patient";

-- DropTable
DROP TABLE "_AssistantToPatient";
