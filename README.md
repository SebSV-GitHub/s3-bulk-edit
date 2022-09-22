# AWS S3 Bulk edit 🪣

## Credentials 🗝

Add your AWS credentials to the `.aws` file:

```yaml
[default]
aws_access_key_id = <your access key id>
aws_secret_access_key = <your secret key>
```

> Ensure your IAM profile has the permissions to **READ** and **MODIFY** the objects in the required bucket

## Run 🏃🏻‍♀️

To run the project use the command:

```sh
npm start -- --region=REGION --bucket-name=BUCKET-NAME --search=SEARCH-VALUE --replace=REPLACE-VALUE
```

### Options ⚙️

#### Required

- `--region=REGION`
- `--bucket-name=BUCKET-NAME`
- `--search=SEARCH_VALUE`
- `--replace=REPLACE_VALUE`

#### Optional

- `--folder=FOLDER_VALUE`
- `--cache=CACHE-CONTROL-VALUE`
