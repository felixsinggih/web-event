/*
  Warnings:

  - You are about to drop the column `eventCategoryId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `evant_category_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_eventCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_userId_fkey`;

-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `eventCategoryId`,
    DROP COLUMN `userId`,
    ADD COLUMN `evant_category_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_evant_category_id_fkey` FOREIGN KEY (`evant_category_id`) REFERENCES `event_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
