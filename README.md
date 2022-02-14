# Amazon Textract Response to CSV 🧩

**Amazon Textract Response to CSV** export tables and extract `key-value` pairs in form documents from `JSON` returned by Amazon Textract into a comma-separated values (CSV) file.

[![Made-In-Senegal](https://github.com/GalsenDev221/made.in.senegal/blob/master/assets/badge.svg)](https://github.com/GalsenDev221/made.in.senegal)

## Export tables from JSON returned by Amazon Textract ✅

```javascript
import { writeTables } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeTables with the response
    await writeTables(response);
  } catch (err) {
    console.log("Error", err);
  }
};
```

## How to use writeTables ✅

The writeTables function of **Amazon Textract Response to CSV** take one parameters the
JSON returned by Amazon Textract.  
And then exports data in an file named : `tables_output.csv`

```javascript
await writeTables(response);
```

## Export key-value pairs from JSON returned by Amazon Textract ✅

```javascript
import { writeKeyValuePair } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeKeyValuePair with the response
    await writeKeyValuePair(response);
  } catch (err) {
    console.log("Error", err);
  }
};
```

## How to use writeKeyValuePair ✅

The writeKeyValuePair function just like the writeTables function of **Amazon Textract Response to CSV** takes one parameters the `JSON` returned by Amazon Textract.  
The only difference is that the exported file will be named : `key_value_output.csv`

```javascript
await writeKeyValuePair(response);
```

### License 🎫

This project is released under the **[MIT License](LICENSE)** ✔
