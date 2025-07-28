-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "aboutMe" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "onboardingStep" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminConfig" (
    "id" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "stepNumber" INTEGER NOT NULL,

    CONSTRAINT "AdminConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
