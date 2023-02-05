/*
  Warnings:

  - You are about to drop the column `commentId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `likeId` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `commentId`,
    DROP COLUMN `likeId`,
    ADD COLUMN `comments` INTEGER NULL,
    ADD COLUMN `likes` INTEGER NULL;
