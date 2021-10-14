-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "todo_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("todo_id")
);

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
