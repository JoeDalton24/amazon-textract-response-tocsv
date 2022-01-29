# amazon-textract-response-tocsv

amazon-textract-response-tocsv export tables and extract key-value pairs in form documents from JSON returned by Amazon Textract into a comma-separated values (CSV) file

# export tables from JSON returned by Amazon Textract

```
import { writeTablesToCsv } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeTablesToCsv with the response
    await writeTablesToCsv(response)
  } catch (err) {
    console.log("Error", err);
  }
};

```

# How to use writeTablesToCsv

The writeTablesToCsv function of amazon-texttract-response-tocsv takes two parameters the
JSON returned by Amazon Textract and the relative path where you want the csv to be written

the second parameter is optional if it is not filled in, the file will be exported to your working directory and will be named 'tables_output.csv'.

```
await writeTablesToCsv(response,'relative_path')

```

# export key-value pairs from JSON returned by Amazon Textract

```
import { writeKeyValuePairToCsv } from "amazon-textract-response-tocsv";

const analyze_document_text = async () => {
  try {
    const analyzeDoc = new AnalyzeDocumentCommand(params);
    const response = await textractClient.send(analyzeDoc);

    //call writeKeyValuePairToCsv with the response
    await writeKeyValuePairToCsv(response)
  } catch (err) {
    console.log("Error", err);
  }
};

```

# How to use writeKeyValuePairToCsv

The writeKeyValuePairToCsv function just like the writeTablesToCsv function of amazon-texttract-response-tocsv takes two parameters the
JSON returned by Amazon Textract and the relative path where you want the csv to be written

the only difference is that if the second parameter is not filled in, the export file will be named 'key_value_output.csv'

```
await writeKeyValuePairToCsv(response,'relative_path');

```
