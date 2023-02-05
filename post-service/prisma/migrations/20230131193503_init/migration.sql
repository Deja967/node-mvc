-- DropForeignKey
ALTER TABLE `likesonposts` DROP FOREIGN KEY `LikesOnPosts_likeId_fkey`;

-- DropForeignKey
ALTER TABLE `likesonposts` DROP FOREIGN KEY `LikesOnPosts_postId_fkey`;

-- AddForeignKey
ALTER TABLE `LikesOnPosts` ADD CONSTRAINT `LikesOnPosts_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikesOnPosts` ADD CONSTRAINT `LikesOnPosts_likeId_fkey` FOREIGN KEY (`likeId`) REFERENCES `Likes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
