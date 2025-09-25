
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateTutorialContent = async (topic: string): Promise<string> => {
  const prompt = `
You are an expert in Google Sheets and an expert web developer who writes clean HTML. Your task is to provide a comprehensive, step-by-step guide on the topic: '${topic}'.

The guide should be easy for a beginner to understand but also contain enough detail for an intermediate user.

Please structure your response as a single JSON object with a single key "html_content". The value of this key should be a string containing the complete HTML for the tutorial.

The HTML should be well-structured and use Tailwind CSS classes for styling. Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags. Just provide the content that would go inside a container \`<div>\`.

Use the following Tailwind classes for styling:
- Main title (h1): 'text-3xl font-bold mb-6 text-gray-900 border-b pb-2'
- Section headings (h2): 'text-2xl font-bold mb-4 text-gray-800 mt-6'
- Sub-headings (h3): 'text-xl font-semibold mb-3 text-gray-700 mt-4'
- Paragraphs: 'mb-4 text-gray-700 leading-relaxed'
- Code/Formulas: 'bg-gray-200 text-red-600 font-mono rounded px-2 py-1 text-sm'
- Lists (ul, ol): 'list-disc list-inside mb-4 pl-4 text-gray-700' or 'list-decimal list-inside mb-4 pl-4 text-gray-700'
- List items (li): 'mb-2'
- Tables: 'w-full text-left border-collapse mb-4 shadow-sm rounded-lg overflow-hidden'
- Table Headers (th): 'border-b-2 border-gray-300 p-3 bg-gray-100 font-semibold text-gray-600'
- Table Cells (td): 'border-b border-gray-200 p-3'
- Tip/Note blocks: 'bg-blue-50 border-l-4 border-blue-400 p-4 my-4 rounded-r-lg'
- Tip/Note block title: 'font-bold text-blue-800'

Include the following sections in the HTML:
1.  A main H1 title for the topic.
2.  **Introduction**: A brief overview of the topic and its importance.
3.  **Step-by-Step Guide**: Clear, numbered steps on how to use the feature or function.
4.  **Examples**: Provide at least one practical example with a clear explanation. Use HTML tables to represent sample data.
5.  **Tips & Tricks**: Offer some best practices or common pitfalls to avoid.

For the topic '${topic}', generate the JSON object now.`;
    
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    const text = response.text.trim();
    // Clean potential markdown code block fences
    const cleanedText = text.replace(/^```json\s*|```\s*$/g, '');
    const data = JSON.parse(cleanedText);

    if (data && typeof data.html_content === 'string') {
      return data.html_content;
    } else {
      throw new Error("Invalid JSON structure in API response.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    return `<div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p class="font-bold">Error</p>
              <p>Could not generate content for this topic. Please try again later.</p>
            </div>`;
  }
};
