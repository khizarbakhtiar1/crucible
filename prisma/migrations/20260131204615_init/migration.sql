-- CreateTable
CREATE TABLE "Researcher" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "affiliation" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Algorithm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "compiledHash" TEXT,
    "researcherId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Algorithm_researcherId_fkey" FOREIGN KEY ("researcherId") REFERENCES "Researcher" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Benchmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "algorithmId" TEXT NOT NULL,
    "keyGenTime" REAL NOT NULL,
    "signTime" REAL,
    "verifyTime" REAL,
    "encapsTime" REAL,
    "decapsTime" REAL,
    "peakMemory" INTEGER NOT NULL,
    "stackUsage" INTEGER,
    "publicKeySize" INTEGER NOT NULL,
    "secretKeySize" INTEGER NOT NULL,
    "signatureSize" INTEGER,
    "ciphertextSize" INTEGER,
    "cpuModel" TEXT NOT NULL,
    "cpuCores" INTEGER NOT NULL,
    "ramMb" INTEGER NOT NULL,
    "osVersion" TEXT NOT NULL,
    "compilerVersion" TEXT NOT NULL,
    "runHash" TEXT NOT NULL,
    "chainTxHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Benchmark_algorithmId_fkey" FOREIGN KEY ("algorithmId") REFERENCES "Algorithm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "algorithmId" TEXT NOT NULL,
    "algorithmName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "speedScore" REAL NOT NULL,
    "memoryScore" REAL NOT NULL,
    "sizeScore" REAL NOT NULL,
    "overallScore" REAL NOT NULL,
    "bestKeyGenTime" REAL NOT NULL,
    "bestSignTime" REAL,
    "bestVerifyTime" REAL,
    "bestEncapsTime" REAL,
    "bestDecapsTime" REAL,
    "lowestMemory" INTEGER NOT NULL,
    "runCount" INTEGER NOT NULL,
    "lastUpdated" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Researcher_email_key" ON "Researcher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Algorithm_name_version_key" ON "Algorithm"("name", "version");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_algorithmId_key" ON "LeaderboardEntry"("algorithmId");
