# amazon-textract-response-tocsv

amazon-textract-response-tocsv export tables and extract key-value pairs in form documents from JSON returned by Amazon Textract into a comma-separated values (CSV) file

# export tables from JSON returned by Amazon Textract

```
import { writeTables } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeTables with the response
    await writeTables(response)
  } catch (err) {
    console.log("Error", err);
  }
};

```

# How to use writeTables

The writeTables function of amazon-textract-response-tocsv take one parameters the
JSON returned by Amazon Textract.

And the export the data in an file named tables_output.csv"

```
await writeTables(response)

```

# export key-value pairs from JSON returned by Amazon Textract

```
import { writeKeyValuePair } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeKeyValuePair with the response
    await writeKeyValuePair(response)
  } catch (err) {
    console.log("Error", err);
  }
};

```

# How to use writeKeyValuePair

The writeKeyValuePair function just like the writeTables function of amazon-texttract-response-tocsv takes one parameters the
JSON returned by Amazon Textract

the only difference is that the exported file will be named 'key_value_output.csv'

```
await writeKeyValuePair(response);
```
