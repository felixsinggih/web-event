/*
  Warnings:

  - You are about to drop the column `eventId` on the `event_categories` table. All the data in the column will be lost.
  - Added the required column `event_id` to the `event_categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event_categories` DROP FOREIGN KEY `event_categories_eventId_fkey`;

-- AlterTable
ALTER TABLE `event_categories` DROP COLUMN `eventId`,
    ADD COLUMN `event_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `event_categories` ADD CONSTRAINT `event_categories_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
