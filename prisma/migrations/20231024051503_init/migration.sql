/*
  Warnings:

  - Added the required column `status` to the `event_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event_categories` ADD COLUMN `status` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `status` BOOLEAN NOT NULL;
