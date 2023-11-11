/*
  Warnings:

  - You are about to drop the column `status` on the `task` table. All the data in the column will be lost.
  - Added the required column `statusId` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "status",
ADD COLUMN     "statusId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "StatusEnum";

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "status_id_key" ON "status"("id");

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
