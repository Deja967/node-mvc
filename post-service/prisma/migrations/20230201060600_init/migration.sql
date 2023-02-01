/*
  Warnings:

  - Made the column `userId` on table `comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `likes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `comment` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `likes` MODIFY `userId` VARCHAR(191) NOT NULL;
