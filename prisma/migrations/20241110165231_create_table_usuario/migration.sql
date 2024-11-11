-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(250) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "senha" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");
