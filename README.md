# Crucible

A benchmark arena for Post-Quantum Cryptography (PQC) algorithm implementations. Researchers can submit, benchmark, and compare PQC implementations with reproducible results.

## Features

- **Algorithm Submission**: Submit PQC implementations with source code and metadata
- **Automated Benchmarking**: Measure key generation time, signing/encapsulation, verification/decapsulation, memory usage, and key sizes
- **Leaderboards**: Compare implementations across categories with normalized scores
- **Reproducibility**: Every benchmark includes full environment details and cryptographic hashes
- **Categories**: Lattice-based, Code-based, Hash-based, Isogeny-based, Multivariate

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crucible.git
cd crucible
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Seed the database with sample data:
```bash
npx tsx prisma/seed.ts
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:3000

## Project Structure

```
crucible/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Sample data
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── algorithms/    # Algorithm pages
│   │   ├── submit/        # Submission page
│   │   ├── about/         # About page
│   │   └── page.tsx       # Landing page
│   ├── components/        # React components
│   └── lib/               # Utilities and types
└── public/
```

## API Endpoints

### Algorithms

- `GET /api/algorithms` - List all algorithms
- `POST /api/algorithms` - Submit a new algorithm
- `GET /api/algorithms/:id` - Get algorithm details

### Benchmarks

- `POST /api/benchmarks` - Submit benchmark results

### Leaderboard

- `GET /api/leaderboard` - Get leaderboard entries

## Benchmark Metrics

### Performance
- Key generation time (microseconds)
- Sign/Encapsulation time (microseconds)
- Verify/Decapsulation time (microseconds)

### Memory
- Peak memory usage (KB)
- Stack usage (KB)

### Sizes
- Public key size (bytes)
- Secret key size (bytes)
- Signature/Ciphertext size (bytes)

### Environment
- CPU model and core count
- RAM
- Operating system
- Compiler version

## Scoring

The overall score is calculated as a weighted average:
- Speed Score: 40%
- Memory Score: 30%
- Size Score: 30%

Scores are normalized relative to the best-performing algorithm in each category. Lower values are better for all raw metrics.

## Algorithm Categories

| Category | Description | Examples |
|----------|-------------|----------|
| Lattice-based | Based on lattice problems (LWE, NTRU) | Kyber, Dilithium, Falcon |
| Code-based | Based on error-correcting codes | Classic McEliece, BIKE |
| Hash-based | Based on hash functions | SPHINCS+, XMSS |
| Isogeny-based | Based on elliptic curve isogenies | CSIDH |
| Multivariate | Based on multivariate polynomials | GeMSS |

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

MIT License
