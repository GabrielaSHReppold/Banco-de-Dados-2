-- CreateEnum
CREATE TYPE "TweetTipo" AS ENUM ('Tweet', 'Reply');

-- CreateTable
CREATE TABLE "tweets" (
    "id" UUID NOT NULL,
    "conteudo" TEXT NOT NULL,
    "tipo" "TweetTipo" NOT NULL DEFAULT 'Tweet',
    "usuario_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tweets" ADD CONSTRAINT "tweets_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
