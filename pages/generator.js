import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineCopy, AiOutlineDownload } from "react-icons/ai";
import Ajv from "ajv";
import addFormats from "ajv-formats";

export default function Generator() {
  const [json, setJson] = useState("{}");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [schema, setSchema] = useState("{}");
  const ajv = new Ajv();
  addFormats(ajv);

  const handleInputChange = (e) => setJson(e.target.value);
  const handleSchemaChange = (e) => setSchema(e.target.value);

  const generateJson = () => {
    try {
      const parsed = JSON.parse(json);
      const validate = ajv.compile(JSON.parse(schema));
      if (!validate(parsed)) {
        throw new Error("JSON does not match the schema");
      }
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
      toast.success("JSON successfully generated and validated!");
    } catch (err) {
      setError(err.message);
      setOutput("");
      toast.error("Error: " + err.message);
    }
  };

  const downloadJson = () => {
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">JSON Generator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Enter JSON</h2>
          <textarea
            className="border rounded w-full h-40 p-2"
            value={json}
            onChange={handleInputChange}
            placeholder="Enter JSON here..."
          ></textarea>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Enter JSON Schema</h2>
          <textarea
            className="border rounded w-full h-40 p-2"
            value={schema}
            onChange={handleSchemaChange}
            placeholder="Enter JSON Schema for validation..."
          ></textarea>
        </div>
      </div>

      <button
        onClick={generateJson}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Generate & Validate JSON
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {output && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated JSON</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            <code>{output}</code>
          </pre>

          <div className="flex items-center mt-4">
            <CopyToClipboard text={output}>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-4 hover:bg-green-600 flex items-center"
                onClick={() => toast.success("Copied to clipboard!")}
              >
                <AiOutlineCopy className="mr-2" />
                Copy
              </button>
            </CopyToClipboard>
            <button
              onClick={downloadJson}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 flex items-center"
            >
              <AiOutlineDownload className="mr-2" />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
