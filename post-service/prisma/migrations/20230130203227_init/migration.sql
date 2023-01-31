/*
  Warnings:

  - You are about to drop the column `commentId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `likes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `likes` DROP FOREIGN KEY `Likes_postId_fkey`;

-- AlterTable
ALTER TABLE `likes` DROP COLUMN `commentId`,
    DROP COLUMN `postId`;

-- CreateTable
CREATE TABLE `LikesOnPosts` (
    `postId` VARCHAR(191) NOT NULL,
    `likeId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`postId`, `likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikesOnComments` (
    `commentId` VARCHAR(191) NOT NULL,
    `likeId` VARCHAR(191) NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentId`, `likeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikesOnPosts` ADD CONSTRAINT `LikesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikesOnPosts` ADD CONSTRAINT `LikesOnPosts_likeId_fkey` FOREIGN KEY (`likeId`) REFERENCES `Likes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikesOnComments` ADD CONSTRAINT `LikesOnComments_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikesOnComments` ADD CONSTRAINT `LikesOnComments_likeId_fkey` FOREIGN KEY (`likeId`) REFERENCES `Likes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
