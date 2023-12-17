/*
  Warnings:

  - You are about to drop the column `evant_category_id` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `event_category_id` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `invoices` DROP FOREIGN KEY `invoices_evant_category_id_fkey`;

-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `evant_category_id`,
    ADD COLUMN `event_category_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_event_category_id_fkey` FOREIGN KEY (`event_category_id`) REFERENCES `event_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
