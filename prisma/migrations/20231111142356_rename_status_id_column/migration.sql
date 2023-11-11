/*
  Warnings:

  - You are about to drop the column `statusId` on the `task` table. All the data in the column will be lost.
  - Added the required column `status_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_statusId_fkey";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "statusId",
ADD COLUMN     "status_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
