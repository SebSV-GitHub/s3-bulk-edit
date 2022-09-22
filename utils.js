import minimist from "minimist";

let args = null;

function getArgs() {
  if (args === null) {
    args = minimist(process.argv.slice(2), {
      alias: {
        "bucket-name": "bucketName",
      },
      default: {
        folder: "",
        cache: 86400,
      },
    });
    validateArguments();
  }
  return args;
}

function validateArguments() {
  if (!args.region) {
    throw Error("Region not specified. Use --region=REGION to set it.");
  }
  if (!args.bucketName) {
    throw Error(
      "Bucket name not specified. Use --bucket-name=BUCKET_NAME to set it."
    );
  }
  if (!args.search) {
    throw Error(
      "Search value not specified. Use --search=SEARCH_VALUE to set it."
    );
  }
  if (!args.replace) {
    throw Error(
      "Replace value not specified. Use --replace=REPLACE_VALUE to set it."
    );
  }
}

export default getArgs();
