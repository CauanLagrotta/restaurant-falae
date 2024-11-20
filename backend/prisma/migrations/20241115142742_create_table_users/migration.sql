-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "useremail" TEXT NOT NULL,
    "userphone" TEXT NOT NULL,
    "userpassword" TEXT NOT NULL,
    "staff" INTEGER NOT NULL DEFAULT 0,
    "useraddress" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_useremail_key" ON "users"("useremail");

-- CreateIndex
CREATE UNIQUE INDEX "users_userphone_key" ON "users"("userphone");
