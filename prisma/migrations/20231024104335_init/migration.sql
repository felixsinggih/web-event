/*
  Warnings:

  - Added the required column `is_paid` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `is_paid` INTEGER NOT NULL;
