-- AlterTable
ALTER TABLE "User" ADD COLUMN     "categoriaId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE;
