import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "monlam-mcp",
  version: "1.0.0",
});

async function monlamai(text) {
  const url = "https://api.monlam.ai/api/v1/translation/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer asdfaheigkdin_sdfasd_feffes",
  };
  const data = {
    input: text,
    target: "bo",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      return { error: `API Error: ${response.status} ${response.statusText}` };
    }

    const result = await response.json();
    if (result.success && result.translation) {
      const cleanTranslation = result.translation.replace(/^\"|\"$/g, "");
      return cleanTranslation;
    } else {
      console.error("No translation found in API response:", result);
      return { error: "No translation found in API response" };
    }
  } catch (error) {
    console.error("Error calling Monlam API:", error);
    return { error: error.message };
  }
}

server.tool(
  "getTibetanTranslation",
  { textdata: z.string() },
  async ({ textdata }) => {
    try {
      const translationResult = await monlamai(textdata);
      if (typeof translationResult === "object" && translationResult.error) {
        console.error("Translation error:", translationResult.error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${translationResult.error}`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: translationResult,
          },
        ],
      };
    } catch (error) {
      console.error("Unexpected error in translation tool:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
      };
    }
  }
);

async function init() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Monlam MCP server started and ready for translation requests");
}

init();
