/*
  Warnings:

  - Added the required column `xendit_external_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xendit_id` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xendit_url` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `xendit_external_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `xendit_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `xendit_url` VARCHAR(191) NOT NULL;
