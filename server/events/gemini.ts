import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

function extractMimeAndBase64(dataUrl: string) {
    const matches = dataUrl.match(/^data:(.+);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 data URL');
    }
    return { mimeType: matches[1], base64Data: matches[2] };
}

function transformData(data: Record<any, any>[]) {
    const parts = [];

    // 遍历原始数据，合并文本内容
    for (const item of data) {
        if (item.content) {
            if (typeof item.content === 'string') {
                // 对于系统角色的文本内容
                parts.push({ text: item.content });
            } else if (Array.isArray(item.content)) {
                // 对于用户角色的内容数组
                for (const part of item.content) {
                    if (part.type === 'text') {
                        parts.push({ text: part.text });
                    } else if (part.type === 'image_url') {
                        // 提取MIME类型和base64数据
                        const { mimeType, base64Data } = extractMimeAndBase64(part.image_url.url);
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

    // 返回新的数据结构，所有文本和图像都合并到一个用户角色中
    return [
        {
            role: 'user',
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
    typeof streamingGeminiAIResponses
>) {
    let genAI = new GoogleGenerativeAI(params.openAiApiKey || process.env['GEMINI_API_KEY']);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    const generationConfig = {
        temperature: 0,
        topK: 32,
        topP: 1,
        maxOutputTokens: 30000,
    };

    const contents = transformData(messages);
    const result = await model.generateContentStream({
        contents: contents,
        generationConfig,
        safetySettings,
    });

    let text = '';
    let perText = '';
    for await (const chunk of result.stream) {
        if (perText) {
            callback(perText);
            text += perText;
        }
        const chunkText = text ? chunk.text() : chunk.text().replace(/^\s*```html/g, '');
        perText = chunkText;
    }
    perText = perText.replace(/```\s*$/g, '');
    callback(perText);
    text += perText;
    return text;
}

export async function streamingGeminiAIResponses(
    messages: any[],
    callback: {
        (content: string, event?: string | undefined): void;
        (arg0: string, arg1: string | undefined): void;
    },
    params: { openAiApiKey: any; openAiBaseURL: any; llm: string }
) {
    if (params.llm === 'Gemini') {
        const full_response = await useGeminiResponse([messages, callback, params]);
        return full_response;
    }
    
    //For implementing other models
}
