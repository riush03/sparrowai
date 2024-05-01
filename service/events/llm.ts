
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";


function extractMimeAndBase64(dataUrl: string) {
  const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 data URL");
  }
  return { mimeType: matches[1], base64Data: matches[2] };
}


function transformData(data: Record<any, any>[]) {
  const parts = [];

 
  for (const item of data) {
    if (item.content) {
      if (typeof item.content === "string") {
        
        parts.push({ text: item.content });
      } else if (Array.isArray(item.content)) {
        
        for (const part of item.content) {
          if (part.type === "text") {
            parts.push({ text: part.text });
          } else if (part.type === "image_url") {
    
            const { mimeType, base64Data } = extractMimeAndBase64(
              part.image_url.url
            );
            parts.push({
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            });
          }
        }
      }
    }
  }


  return [
    {
      role: "user",
      parts: parts,
    },
  ];
}

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
async function useGeminiResponse([messages, callback, params]: Parameters<
  typeof streamingGeminiResponses
>) {
  let genAI = new GoogleGenerativeAI(
    params.geminiApiKey || process.env["GEMINI_API_KEY"]
  );
  const generationConfig = {
    temperature: 0,
    topK: 32,
    topP: 1,
    maxOutputTokens: 30000, //
  };

  const contents = transformData(messages);
  const parts = contents[0].parts;
  let modelType = 'gemini-pro'
  if (parts && parts[1] && parts[1].inlineData) {
    modelType = "gemini-pro-vision"
  }

  const model = genAI.getGenerativeModel({ model:  modelType});

  const result = await model.generateContentStream({
    contents: contents,
    generationConfig,
    safetySettings,
  });

  let text = "";
  let perText = "";
  for await (const chunk of result.stream) {
    if (perText) {
      callback(perText);
      text += perText;
    }
    const chunkText = text
      ? chunk.text()
      : chunk.text().replace(/^\s*```html/g, "");
    perText = chunkText;
  }
  perText = perText.replace(/```\s*$/g, "");
  callback(perText);
  text += perText;
  return text;
}


export async function streamingGeminiResponses(
  messages: any,
  callback: {
    (content: string, event?: string | undefined): void;
    (arg0: string, arg1: string | undefined): void;
  },
  params: {
    llm: string;
    geminiApiKey: any;
  }
) {

  if (params.llm === "gemini") {
    const full_response = await useGeminiResponse([messages, callback, params]);
    return full_response;
  }


}
