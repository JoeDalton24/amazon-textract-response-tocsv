# amazon-textract-response-tocsv

amazon-textract-response-tocsv export tables and extract key-value pairs in form documents from JSON returned by Amazon Textract into a comma-separated values (CSV) file

# export tables from JSON returned by Amazon Textract

```
// Import required AWS SDK clients and commands for Node.js
import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { TextractClient } from "@aws-sdk/client-textract";

// writeTablesToCsv form amazon-textract-response-tocsv
import { writeTablesToCsv } from "amazon-textract-response-tocsv";

const bucket = "your_bucket";
const photo = "your_document.png";

// Set params
const params = {
  Document: {
    S3Object: {
      Bucket: bucket,
      Name: photo,
    },
  },
  FeatureTypes: ["TABLES", "FORMS"],
};

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //writeTablesToCsv with the response
    await writeTablesToCsv(response)
  } catch (err) {
    console.log("Error", err);
  }
};
```
