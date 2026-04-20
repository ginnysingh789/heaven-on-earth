/**
 * One-time migration script: Local MongoDB → Atlas
 * 
 * Usage:
 *   node server/migrate-to-atlas.js "mongodb+srv://YOUR_ATLAS_URI"
 * 
 * This reads ALL collections from your local DB and upserts them into Atlas.
 * Existing docs in Atlas with the same _id will be replaced.
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const ATLAS_URI = process.argv[2];

if (!ATLAS_URI) {
  console.error('❌ Usage: node server/migrate-to-atlas.js "mongodb+srv://YOUR_ATLAS_URI"');
  process.exit(1);
}

const LOCAL_URI = process.env.MONGO_URI;
console.log(`\n📦 Source (local): ${LOCAL_URI}`);
console.log(`☁️  Target (Atlas): ${ATLAS_URI.substring(0, 40)}...\n`);

async function migrate() {
  // Connect to local DB
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log('✅ Connected to LOCAL MongoDB');

  // Connect to Atlas DB
  const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
  console.log('✅ Connected to ATLAS MongoDB\n');

  const collections = await localConn.db.listCollections().toArray();
  let totalDocs = 0;

  for (const col of collections) {
    const name = col.name;
    const localCollection = localConn.db.collection(name);
    const atlasCollection = atlasConn.db.collection(name);

    const docs = await localCollection.find({}).toArray();
    
    if (docs.length === 0) {
      console.log(`⏭  ${name}: 0 docs (skipped)`);
      continue;
    }

    // For collections with unique slug indexes, drop existing Atlas data first
    // then insert fresh from local to avoid duplicate key conflicts
    const existingCount = await atlasCollection.countDocuments();
    if (existingCount > 0) {
      await atlasCollection.deleteMany({});
      console.log(`   🗑  Cleared ${existingCount} existing docs in Atlas "${name}"`);
    }

    await atlasCollection.insertMany(docs);
    const inserted = docs.length;

    console.log(`✅ ${name}: ${inserted} docs migrated`);
    totalDocs += docs.length;
  }

  console.log(`\n🎉 Migration complete! ${totalDocs} total documents migrated across ${collections.length} collections.`);

  await localConn.close();
  await atlasConn.close();
  process.exit(0);
}

migrate().catch(err => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
