import {
  S3Client,
  ListObjectsCommand,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import args from "./utils.js";

const region = args.region;
const bucketName = args.bucketName;
const folder = args.folder;
const searchValue = args.search;
const replaceValue = args.replace;
const cacheControl = args.cache;

const client = new S3Client({ region: region });

console.log("🔍 Listing objects");
const response = await client.send(
  new ListObjectsCommand({ Bucket: bucketName, Delimiter: "/", Prefix: folder })
);

const objects = response.Contents.filter((object) => object.Size > 0);

console.log(`📝 ${objects.length} will be modified`);

for (const object of objects) {
  try {
    console.log("📥 Getting object", object.Key);
    const response = await client.send(
      new GetObjectCommand({ Bucket: bucketName, Key: object.Key })
    );
    const { Body, ContentType } = response;
    let content = "";
    Body.on("data", (chunk) => (content = `${content}${chunk}`));
    Body.on("end", () => updateFileContent(object.Key, content, ContentType));
  } catch (err) {
    console.error(err);
  }
}

async function updateFileContent(Key, content, ContentType) {
  const Body = content.replace(searchValue, replaceValue);
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key,
        ContentType,
        CacheControl: cacheControl,
        Expires: new Date(),
        Body,
      })
    );
    console.log("✅", Key, "updated successfully");
  } catch (err) {
    console.error("⛔️ An error ocurred updating\n", Key, err);
  }
}
