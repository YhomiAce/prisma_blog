-- CreateTable
CREATE TABLE "GroupPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupPostToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupPostToUser_AB_unique" ON "_GroupPostToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupPostToUser_B_index" ON "_GroupPostToUser"("B");

-- AddForeignKey
ALTER TABLE "_GroupPostToUser" ADD CONSTRAINT "_GroupPostToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupPostToUser" ADD CONSTRAINT "_GroupPostToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
