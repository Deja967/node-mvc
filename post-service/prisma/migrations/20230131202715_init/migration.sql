-- DropForeignKey
ALTER TABLE `likesoncomments` DROP FOREIGN KEY `LikesOnComments_commentId_fkey`;

-- DropForeignKey
ALTER TABLE `likesoncomments` DROP FOREIGN KEY `LikesOnComments_likeId_fkey`;

-- AddForeignKey
ALTER TABLE `LikesOnComments` ADD CONSTRAINT `LikesOnComments_commentId_fkey` FOREIGN KEY (`commentId`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikesOnComments` ADD CONSTRAINT `LikesOnComments_likeId_fkey` FOREIGN KEY (`likeId`) REFERENCES `Likes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
