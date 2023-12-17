/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `user_details` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_details_phone_number_key` ON `user_details`(`phone_number`);
