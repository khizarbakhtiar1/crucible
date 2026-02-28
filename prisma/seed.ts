import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

function uuidv4() {
  return randomUUID();
}

async function main() {
  console.log('Seeding database...');

  // Create researchers
  const researchers = await Promise.all([
    prisma.researcher.upsert({
      where: { email: 'alice@crypto.edu' },
      update: {},
      create: {
        id: uuidv4(),
        name: 'Alice Chen',
        email: 'alice@crypto.edu',
        affiliation: 'MIT Cryptography Lab',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.researcher.upsert({
      where: { email: 'bob@lattice.io' },
      update: {},
      create: {
        id: uuidv4(),
        name: 'Bob Martinez',
        email: 'bob@lattice.io',
        affiliation: 'Stanford Security Research',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
    prisma.researcher.upsert({
      where: { email: 'carol@pqc.org' },
      update: {},
      create: {
        id: uuidv4(),
        name: 'Carol Williams',
        email: 'carol@pqc.org',
        affiliation: 'NIST PQC Team',
        passwordHash: await bcrypt.hash('password123', 10),
      },
    }),
  ]);

  console.log(`Created ${researchers.length} researchers`);

  // Create algorithms
  const algorithms = [
    {
      name: 'CRYSTALS-Dilithium',
      version: '3.1',
      category: 'lattice',
      description: 'Reference implementation of CRYSTALS-Dilithium, a lattice-based digital signature scheme. This implementation focuses on security level 3 with optimized polynomial arithmetic.',
      language: 'C',
      sourceCode: `// CRYSTALS-Dilithium Reference Implementation
#include <stdint.h>
#include "params.h"
#include "sign.h"
#include "packing.h"
#include "polyvec.h"
#include "poly.h"
#include "randombytes.h"
#include "symmetric.h"
#include "fips202.h"

int crypto_sign_keypair(uint8_t *pk, uint8_t *sk) {
  uint8_t seedbuf[2*SEEDBYTES + CRHBYTES];
  uint8_t tr[SEEDBYTES];
  const uint8_t *rho, *rhoprime, *key;
  polyvecl mat[K];
  polyvecl s1, s1hat;
  polyveck s2, t1, t0;

  randombytes(seedbuf, SEEDBYTES);
  shake256(seedbuf, 2*SEEDBYTES + CRHBYTES, seedbuf, SEEDBYTES);
  rho = seedbuf;
  rhoprime = rho + SEEDBYTES;
  key = rhoprime + CRHBYTES;

  polyvec_matrix_expand(mat, rho);
  polyvecl_uniform_eta(&s1, rhoprime, 0);
  polyveck_uniform_eta(&s2, rhoprime, L);
  
  s1hat = s1;
  polyvecl_ntt(&s1hat);
  polyvec_matrix_pointwise_montgomery(&t1, mat, &s1hat);
  polyveck_reduce(&t1);
  polyveck_invntt_tomont(&t1);
  polyveck_add(&t1, &t1, &s2);
  polyveck_caddq(&t1);
  polyveck_power2round(&t1, &t0, &t1);
  pack_pk(pk, rho, &t1);
  
  shake256(tr, SEEDBYTES, pk, CRYPTO_PUBLICKEYBYTES);
  pack_sk(sk, rho, tr, key, &t0, &s1, &s2);
  return 0;
}`,
      researcherId: researchers[0].id,
      verified: true,
    },
    {
      name: 'CRYSTALS-Kyber',
      version: '1024',
      category: 'lattice',
      description: 'Implementation of CRYSTALS-Kyber KEM at security level 5. Includes AVX2 optimizations for x86-64 platforms.',
      language: 'C',
      sourceCode: `// CRYSTALS-Kyber Reference Implementation
#include <stddef.h>
#include <stdint.h>
#include "params.h"
#include "kem.h"
#include "indcpa.h"
#include "verify.h"
#include "symmetric.h"
#include "randombytes.h"

int crypto_kem_keypair(uint8_t *pk, uint8_t *sk) {
  size_t i;
  indcpa_keypair(pk, sk);
  for(i=0;i<KYBER_INDCPA_PUBLICKEYBYTES;i++)
    sk[i+KYBER_INDCPA_SECRETKEYBYTES] = pk[i];
  hash_h(sk+KYBER_SECRETKEYBYTES-2*KYBER_SYMBYTES, pk, KYBER_PUBLICKEYBYTES);
  randombytes(sk+KYBER_SECRETKEYBYTES-KYBER_SYMBYTES, KYBER_SYMBYTES);
  return 0;
}

int crypto_kem_enc(uint8_t *ct, uint8_t *ss, const uint8_t *pk) {
  uint8_t buf[2*KYBER_SYMBYTES];
  uint8_t kr[2*KYBER_SYMBYTES];
  randombytes(buf, KYBER_SYMBYTES);
  hash_h(buf, buf, KYBER_SYMBYTES);
  hash_h(buf+KYBER_SYMBYTES, pk, KYBER_PUBLICKEYBYTES);
  hash_g(kr, buf, 2*KYBER_SYMBYTES);
  indcpa_enc(ct, buf, pk, kr+KYBER_SYMBYTES);
  hash_h(kr+KYBER_SYMBYTES, ct, KYBER_CIPHERTEXTBYTES);
  kdf(ss, kr, 2*KYBER_SYMBYTES);
  return 0;
}`,
      researcherId: researchers[1].id,
      verified: true,
    },
    {
      name: 'Falcon',
      version: '512',
      category: 'lattice',
      description: 'Fast-Fourier Lattice-based Compact Signatures over NTRU. This implementation targets the Falcon-512 parameter set.',
      language: 'C',
      sourceCode: `// Falcon-512 Implementation
#include "falcon.h"
#include "inner.h"

int falcon_keygen(shake256_context *rng, void *privkey, void *pubkey) {
    union {
        uint8_t b[FALCON_KEYGEN_TEMP_9];
        uint64_t dummy_u64;
        fpr dummy_fpr;
    } tmp;
    int8_t f[512], g[512], F[512];
    uint16_t h[512];
    
    Zf(keygen)(&inner, f, g, F, NULL, h, 9, tmp.b, rng);
    Zf(encode_private_key)(privkey, FALCON_PRIVKEY_SIZE(9), f, g, F, 9);
    Zf(encode_public_key)(pubkey, FALCON_PUBKEY_SIZE(9), h, 9);
    return 0;
}`,
      researcherId: researchers[0].id,
      verified: false,
    },
    {
      name: 'SPHINCS+',
      version: 'SHA256-256f',
      category: 'hash-based',
      description: 'Stateless hash-based signature scheme. This variant uses SHA-256 as the underlying hash function with fast parameters.',
      language: 'C',
      sourceCode: `// SPHINCS+ Reference Implementation
#include <stdint.h>
#include <string.h>
#include "params.h"
#include "wots.h"
#include "fors.h"
#include "hash.h"
#include "thash.h"
#include "address.h"
#include "randombytes.h"
#include "utils.h"

int crypto_sign_keypair(unsigned char *pk, unsigned char *sk) {
    unsigned char seed[CRYPTO_SEEDBYTES];
    randombytes(seed, CRYPTO_SEEDBYTES);
    
    memcpy(sk, seed, CRYPTO_SEEDBYTES);
    memcpy(pk, sk + 2*SPX_N, SPX_N);
    
    initialize_hash_function(pk, sk);
    
    set_layer_addr(addr, SPX_D - 1);
    set_tree_addr(addr, 0);
    
    treehash(pk + SPX_N, sk + 3*SPX_N, 0, SPX_TREE_HEIGHT, 
             wots_gen_leaf, addr, sk, pk);
    
    memcpy(sk + 3*SPX_N, pk + SPX_N, SPX_N);
    return 0;
}`,
      researcherId: researchers[2].id,
      verified: true,
    },
    {
      name: 'Classic McEliece',
      version: '460896',
      category: 'code-based',
      description: 'Code-based KEM based on binary Goppa codes. Conservative security choice with very large keys but fast operations.',
      language: 'C',
      sourceCode: `// Classic McEliece Implementation
#include "operations.h"
#include "controlbits.h"
#include "randombytes.h"
#include "crypto_hash.h"
#include "encrypt.h"
#include "decrypt.h"
#include "params.h"
#include "sk_gen.h"
#include "pk_gen.h"
#include "util.h"

int crypto_kem_keypair(unsigned char *pk, unsigned char *sk) {
    while (1) {
        randombytes(sk, SYS_N/8 + (1 << GFBITS)*sizeof(gf) + SYS_T*2 + 32);
        
        if (pk_gen(pk, sk + SYS_N/8, sk + SYS_N/8 + IRR_BYTES) == 0)
            break;
    }
    
    controlbitsfrompermutation(sk + SYS_N/8 + IRR_BYTES + COND_BYTES, 
                               sk + SYS_N/8 + IRR_BYTES, GFBITS, 1 << GFBITS);
    return 0;
}`,
      researcherId: researchers[1].id,
      verified: false,
    },
  ];

  const createdAlgorithms = [];
  for (const algo of algorithms) {
    const existing = await prisma.algorithm.findUnique({
      where: { name_version: { name: algo.name, version: algo.version } },
    });
    
    if (!existing) {
      const created = await prisma.algorithm.create({
        data: {
          id: uuidv4(),
          ...algo,
        },
      });
      createdAlgorithms.push(created);
    } else {
      createdAlgorithms.push(existing);
    }
  }

  console.log(`Created ${createdAlgorithms.length} algorithms`);

  // Create benchmarks
  const environments = [
    { cpuModel: 'Intel Core i9-12900K', cpuCores: 16, ramMb: 32768, osVersion: 'Ubuntu 22.04', compilerVersion: 'gcc 11.3.0' },
    { cpuModel: 'AMD Ryzen 9 5950X', cpuCores: 16, ramMb: 65536, osVersion: 'Debian 12', compilerVersion: 'gcc 12.2.0' },
    { cpuModel: 'Apple M2 Max', cpuCores: 12, ramMb: 32768, osVersion: 'macOS 14.0', compilerVersion: 'clang 15.0.0' },
  ];

  const benchmarkData = [
    // Dilithium benchmarks
    { algorithmIndex: 0, keyGenTime: 42.5, signTime: 156.3, verifyTime: 45.2, peakMemory: 128, publicKeySize: 1952, secretKeySize: 4016, signatureSize: 3293 },
    { algorithmIndex: 0, keyGenTime: 38.2, signTime: 142.1, verifyTime: 41.8, peakMemory: 124, publicKeySize: 1952, secretKeySize: 4016, signatureSize: 3293 },
    { algorithmIndex: 0, keyGenTime: 35.1, signTime: 138.7, verifyTime: 39.5, peakMemory: 120, publicKeySize: 1952, secretKeySize: 4016, signatureSize: 3293 },
    // Kyber benchmarks
    { algorithmIndex: 1, keyGenTime: 28.4, encapsTime: 36.2, decapsTime: 42.1, peakMemory: 96, publicKeySize: 1568, secretKeySize: 3168, ciphertextSize: 1568 },
    { algorithmIndex: 1, keyGenTime: 25.1, encapsTime: 32.8, decapsTime: 38.5, peakMemory: 92, publicKeySize: 1568, secretKeySize: 3168, ciphertextSize: 1568 },
    // Falcon benchmarks
    { algorithmIndex: 2, keyGenTime: 8542.3, signTime: 312.5, verifyTime: 28.4, peakMemory: 256, publicKeySize: 897, secretKeySize: 1281, signatureSize: 666 },
    { algorithmIndex: 2, keyGenTime: 7856.1, signTime: 298.2, verifyTime: 26.1, peakMemory: 248, publicKeySize: 897, secretKeySize: 1281, signatureSize: 666 },
    // SPHINCS+ benchmarks
    { algorithmIndex: 3, keyGenTime: 1256.8, signTime: 8542.1, verifyTime: 156.3, peakMemory: 512, publicKeySize: 64, secretKeySize: 128, signatureSize: 49856 },
    { algorithmIndex: 3, keyGenTime: 1185.2, signTime: 7985.6, verifyTime: 148.7, peakMemory: 496, publicKeySize: 64, secretKeySize: 128, signatureSize: 49856 },
    // McEliece benchmarks
    { algorithmIndex: 4, keyGenTime: 185623.5, encapsTime: 42.3, decapsTime: 156.8, peakMemory: 1024, publicKeySize: 524160, secretKeySize: 13568, ciphertextSize: 188 },
  ];

  let benchmarkCount = 0;
  for (const data of benchmarkData) {
    const algo = createdAlgorithms[data.algorithmIndex];
    const env = environments[benchmarkCount % environments.length];
    
    await prisma.benchmark.create({
      data: {
        id: uuidv4(),
        algorithmId: algo.id,
        keyGenTime: data.keyGenTime,
        signTime: data.signTime || null,
        verifyTime: data.verifyTime || null,
        encapsTime: data.encapsTime || null,
        decapsTime: data.decapsTime || null,
        peakMemory: data.peakMemory,
        publicKeySize: data.publicKeySize,
        secretKeySize: data.secretKeySize,
        signatureSize: data.signatureSize || null,
        ciphertextSize: data.ciphertextSize || null,
        ...env,
        runHash: uuidv4(),
      },
    });
    benchmarkCount++;
  }

  console.log(`Created ${benchmarkCount} benchmarks`);

  // Create leaderboard entries
  for (const algo of createdAlgorithms) {
    const benchmarks = await prisma.benchmark.findMany({
      where: { algorithmId: algo.id },
    });

    if (benchmarks.length === 0) continue;

    const bestKeyGenTime = Math.min(...benchmarks.map((b) => b.keyGenTime));
    const lowestMemory = Math.min(...benchmarks.map((b) => b.peakMemory));

    await prisma.leaderboardEntry.upsert({
      where: { algorithmId: algo.id },
      update: {
        algorithmName: algo.name,
        category: algo.category,
        bestKeyGenTime,
        bestSignTime: benchmarks.some((b) => b.signTime) ? Math.min(...benchmarks.filter((b) => b.signTime).map((b) => b.signTime!)) : null,
        bestVerifyTime: benchmarks.some((b) => b.verifyTime) ? Math.min(...benchmarks.filter((b) => b.verifyTime).map((b) => b.verifyTime!)) : null,
        bestEncapsTime: benchmarks.some((b) => b.encapsTime) ? Math.min(...benchmarks.filter((b) => b.encapsTime).map((b) => b.encapsTime!)) : null,
        bestDecapsTime: benchmarks.some((b) => b.decapsTime) ? Math.min(...benchmarks.filter((b) => b.decapsTime).map((b) => b.decapsTime!)) : null,
        lowestMemory,
        runCount: benchmarks.length,
        speedScore: Math.max(0, Math.min(100, 100 - (bestKeyGenTime / 2000) * 100)),
        memoryScore: Math.max(0, Math.min(100, 100 - (lowestMemory / 1024) * 100)),
        sizeScore: 50,
        overallScore: Math.max(0, Math.min(100, 100 - (bestKeyGenTime / 2000) * 100)) * 0.4 + Math.max(0, Math.min(100, 100 - (lowestMemory / 1024) * 100)) * 0.3 + 50 * 0.3,
      },
      create: {
        id: uuidv4(),
        algorithmId: algo.id,
        algorithmName: algo.name,
        category: algo.category,
        bestKeyGenTime,
        bestSignTime: benchmarks.some((b) => b.signTime) ? Math.min(...benchmarks.filter((b) => b.signTime).map((b) => b.signTime!)) : null,
        bestVerifyTime: benchmarks.some((b) => b.verifyTime) ? Math.min(...benchmarks.filter((b) => b.verifyTime).map((b) => b.verifyTime!)) : null,
        bestEncapsTime: benchmarks.some((b) => b.encapsTime) ? Math.min(...benchmarks.filter((b) => b.encapsTime).map((b) => b.encapsTime!)) : null,
        bestDecapsTime: benchmarks.some((b) => b.decapsTime) ? Math.min(...benchmarks.filter((b) => b.decapsTime).map((b) => b.decapsTime!)) : null,
        lowestMemory,
        runCount: benchmarks.length,
        speedScore: Math.max(0, Math.min(100, 100 - (bestKeyGenTime / 2000) * 100)),
        memoryScore: Math.max(0, Math.min(100, 100 - (lowestMemory / 1024) * 100)),
        sizeScore: 50,
        overallScore: Math.max(0, Math.min(100, 100 - (bestKeyGenTime / 2000) * 100)) * 0.4 + Math.max(0, Math.min(100, 100 - (lowestMemory / 1024) * 100)) * 0.3 + 50 * 0.3,
      },
    });
  }

  console.log('Created leaderboard entries');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
