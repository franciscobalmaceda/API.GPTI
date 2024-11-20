-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "currentPrompt" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedPrompt" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tituloTrabajo" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "tipoEmpleo" TEXT NOT NULL,
    "responsabilidades" TEXT NOT NULL,
    "requisitos" TEXT NOT NULL,
    "beneficios" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "generated" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "GeneratedPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- AddForeignKey
ALTER TABLE "GeneratedPrompt" ADD CONSTRAINT "GeneratedPrompt_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
