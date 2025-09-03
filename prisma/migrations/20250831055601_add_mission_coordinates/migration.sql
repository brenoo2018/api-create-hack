/*
  Warnings:

  - Added the required column `coordinates` to the `missions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."missions" ADD COLUMN     "coordinates" JSONB NOT NULL;
