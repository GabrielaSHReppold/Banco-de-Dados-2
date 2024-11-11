-- CreateTable
CREATE TABLE "Follower" (
    "id" UUID NOT NULL,
    "followerId" UUID NOT NULL,
    "followedId" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerId_followedId_key" ON "Follower"("followerId", "followedId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
