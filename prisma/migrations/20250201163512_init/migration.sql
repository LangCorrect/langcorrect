-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('UPCOMING', 'ONGOING', 'ENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CorrectionType" AS ENUM ('PERFECT', 'CORRECTED');

-- CreateEnum
CREATE TYPE "PostVisibility" AS ENUM ('PUBLIC', 'MEMBERS', 'FRIENDS', 'PRIVATE');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'PREMIUM', 'CONTRIBUTOR', 'VIP', 'USER', 'UNVERIFIED', 'BANNED');

-- CreateEnum
CREATE TYPE "Proficiency" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'NATIVE');

-- CreateTable
CREATE TABLE "Challenge" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "oldSlug" TEXT,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'UPCOMING',
    "authorId" UUID,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PostUserCorrection" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "feedback" TEXT,

    CONSTRAINT "PostUserCorrection_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PostRowCorrection" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postRowId" UUID NOT NULL,
    "postUserCorrectionId" UUID NOT NULL,
    "text" TEXT,
    "note" TEXT,
    "type" "CorrectionType" NOT NULL,

    CONSTRAINT "PostRowCorrection_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PostUserCorrectionReply" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "authorId" UUID NOT NULL,
    "postUserCorrectionId" UUID NOT NULL,
    "postRowCorrectionId" UUID,
    "parentReplyId" UUID,

    CONSTRAINT "PostUserCorrectionReply_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Language" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "familyCode" VARCHAR(10) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Post" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,
    "languageId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "nativeText" TEXT,
    "genderOfNarration" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "visibility" "PostVisibility" NOT NULL DEFAULT 'PUBLIC',
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "level" "Proficiency" NOT NULL DEFAULT 'A1',
    "promptId" UUID,
    "isCorrected" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PostRow" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "sentence" TEXT NOT NULL,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PostRow_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Prompt" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "oldSlug" TEXT,
    "text" TEXT NOT NULL,
    "level" "Proficiency",
    "languageId" UUID NOT NULL,
    "challengeId" UUID,
    "authorId" UUID NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Tag" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PostTag" (
    "postId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "PostTag_pkey" PRIMARY KEY ("postId","tagId")
);

-- CreateTable
CREATE TABLE "PromptTag" (
    "promptId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "PromptTag_pkey" PRIMARY KEY ("promptId","tagId")
);

-- CreateTable
CREATE TABLE "ChallengeTag" (
    "challengeId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "ChallengeTag_pkey" PRIMARY KEY ("challengeId","tagId")
);

-- CreateTable
CREATE TABLE "CorrectionTag" (
    "postRowCorrectionId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "CorrectionTag_pkey" PRIMARY KEY ("postRowCorrectionId","tagId")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLogin" TIMESTAMP(3),
    "password" VARCHAR(128) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "firstName" VARCHAR(20),
    "lastName" VARCHAR(20),
    "email" VARCHAR(120) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
    "bio" TEXT,
    "staffNote" TEXT,
    "role" "Role" NOT NULL DEFAULT 'UNVERIFIED',

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserLanguage" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "level" "Proficiency" NOT NULL,
    "languageId" UUID NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserLanguage_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserFollow" (
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "followerId" UUID NOT NULL,
    "followingId" UUID NOT NULL,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_url_key" ON "Challenge"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_slug_key" ON "Challenge"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_oldSlug_key" ON "Challenge"("oldSlug");

-- CreateIndex
CREATE UNIQUE INDEX "PostUserCorrection_id_key" ON "PostUserCorrection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostUserCorrection_authorId_postId_key" ON "PostUserCorrection"("authorId", "postId");

-- CreateIndex
CREATE UNIQUE INDEX "PostRowCorrection_id_key" ON "PostRowCorrection"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostRowCorrection_postRowId_postUserCorrectionId_key" ON "PostRowCorrection"("postRowId", "postUserCorrectionId");

-- CreateIndex
CREATE UNIQUE INDEX "PostUserCorrectionReply_id_key" ON "PostUserCorrectionReply"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PostRow_id_key" ON "PostRow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_slug_key" ON "Prompt"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Prompt_oldSlug_key" ON "Prompt"("oldSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserLanguage_userId_languageId_key" ON "UserLanguage"("userId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFollow_followerId_followingId_key" ON "UserFollow"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrection" ADD CONSTRAINT "PostUserCorrection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrection" ADD CONSTRAINT "PostUserCorrection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRowCorrection" ADD CONSTRAINT "PostRowCorrection_postRowId_fkey" FOREIGN KEY ("postRowId") REFERENCES "PostRow"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRowCorrection" ADD CONSTRAINT "PostRowCorrection_postUserCorrectionId_fkey" FOREIGN KEY ("postUserCorrectionId") REFERENCES "PostUserCorrection"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrectionReply" ADD CONSTRAINT "PostUserCorrectionReply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrectionReply" ADD CONSTRAINT "PostUserCorrectionReply_postUserCorrectionId_fkey" FOREIGN KEY ("postUserCorrectionId") REFERENCES "PostUserCorrection"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrectionReply" ADD CONSTRAINT "PostUserCorrectionReply_postRowCorrectionId_fkey" FOREIGN KEY ("postRowCorrectionId") REFERENCES "PostRowCorrection"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostUserCorrectionReply" ADD CONSTRAINT "PostUserCorrectionReply_parentReplyId_fkey" FOREIGN KEY ("parentReplyId") REFERENCES "PostUserCorrectionReply"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRow" ADD CONSTRAINT "PostRow_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostRow" ADD CONSTRAINT "PostRow_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostTag" ADD CONSTRAINT "PostTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptTag" ADD CONSTRAINT "PromptTag_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "Prompt"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromptTag" ADD CONSTRAINT "PromptTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeTag" ADD CONSTRAINT "ChallengeTag_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeTag" ADD CONSTRAINT "ChallengeTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionTag" ADD CONSTRAINT "CorrectionTag_postRowCorrectionId_fkey" FOREIGN KEY ("postRowCorrectionId") REFERENCES "PostRowCorrection"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectionTag" ADD CONSTRAINT "CorrectionTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserLanguage" ADD CONSTRAINT "UserLanguage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
