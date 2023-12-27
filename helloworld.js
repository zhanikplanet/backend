const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydb';

// Collection Name
const collectionName = 'mycollection';

async function main() {
  try {
    // Create a new MongoClient
    const client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to the server
    await client.connect();

    console.log('Connected to MongoDB');

    // Create a new database
    const db = client.db(dbName);

    // Create a new collection
    await createCollection(db);

    // Close the connection
    await client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error:', err);
  }
}

async function createCollection(db) {
  try {
    // Create a new collection
    const collection = await db.createCollection(collectionName);

    console.log(`Collection '${collectionName}' created successfully`);
  } catch (err) {
    console.error('Error creating collection:', err);
  }
}

// Call the main function to execute the code
main();
