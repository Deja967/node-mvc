-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `message` VARCHAR(400) NOT NULL,
    `userId` INTEGER NOT NULL,
    `commentId` INTEGER NOT NULL,
    `likeId` INTEGER NOT NULL,

    UNIQUE INDEX `Post_message_key`(`message`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
