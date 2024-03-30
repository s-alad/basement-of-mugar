import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const { MongoClient, ServerApiVersion } = require('mongodb');

const fs = require('fs');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;


async function uploadscript() {

  const uri = process.env.MDB;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: true,
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    console.log(`Current working directory: ${process.cwd()}`);
    const data = fs.readFileSync('./src/upload.json', 'utf8');
    const documents = JSON.parse(data);
    const collection = client.db("basemugar").collection("library");
    const result = await collection.insertMany(documents);
    console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    await client.close();
  }
}
uploadscript().catch(console.dir);




app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port} \n`);
});
