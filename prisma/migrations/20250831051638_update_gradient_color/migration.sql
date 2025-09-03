/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."MissionType" AS ENUM ('READING', 'QUICK_TASK', 'CHAT_TUTOR', 'QUIZ', 'REWARD', 'CALL_TUTOR');

-- CreateEnum
CREATE TYPE "public"."ProgressStatus" AS ENUM ('LOCKED', 'UNLOCKED', 'DONE', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."TutorMode" AS ENUM ('guided', 'free');

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "name",
ADD COLUMN     "avatar_url" VARCHAR(512),
ADD COLUMN     "gender" VARCHAR(16),
ADD COLUMN     "nickname" VARCHAR(50),
ALTER COLUMN "updated_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."journeys" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(64) NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,
    "color_hex" CHAR(7) NOT NULL,
    "gradient_color" CHAR(7),
    "is_unlocked_by_default" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journeys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."missions" (
    "id" TEXT NOT NULL,
    "journey_id" TEXT NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "type" "public"."MissionType" NOT NULL,
    "order_index" INTEGER NOT NULL,
    "xp_amount" INTEGER NOT NULL,
    "icon_name" VARCHAR(40) NOT NULL,
    "config" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "missions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_journey_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "journey_id" TEXT NOT NULL,
    "status" "public"."ProgressStatus" NOT NULL,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_journey_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_mission_progress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "status" "public"."ProgressStatus" NOT NULL,
    "score" INTEGER,
    "earned_xp" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_mission_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_stats" (
    "user_id" TEXT NOT NULL,
    "total_xp" INTEGER NOT NULL DEFAULT 0,
    "current_streak" INTEGER NOT NULL DEFAULT 0,
    "longest_streak" INTEGER NOT NULL DEFAULT 0,
    "last_active_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_stats_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "journeys_slug_key" ON "public"."journeys"("slug");

-- CreateIndex
CREATE INDEX "missions_journey_id_order_index_idx" ON "public"."missions"("journey_id", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "user_journey_progress_user_id_journey_id_key" ON "public"."user_journey_progress"("user_id", "journey_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_mission_progress_user_id_mission_id_key" ON "public"."user_mission_progress"("user_id", "mission_id");

-- AddForeignKey
ALTER TABLE "public"."missions" ADD CONSTRAINT "missions_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_journey_progress" ADD CONSTRAINT "user_journey_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_journey_progress" ADD CONSTRAINT "user_journey_progress_journey_id_fkey" FOREIGN KEY ("journey_id") REFERENCES "public"."journeys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_mission_progress" ADD CONSTRAINT "user_mission_progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_mission_progress" ADD CONSTRAINT "user_mission_progress_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "public"."missions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_stats" ADD CONSTRAINT "user_stats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
