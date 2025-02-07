import { GoogleGenerativeAI, GenerateContentRequest } from "@google/generative-ai";
import { action } from "./_generated/server";
import { v } from "convex/values";

type ImageGenerationRequest = {
  prompt: string;
};

type ImageResponse = {
  candidates?: { content?: { imageData?: { data: string } }[] }[];
};

export const generateThumbnailAction = action({
  args: { prompt: v.string() },
  handler: async (_: unknown, { prompt }: { prompt: string }) => {
    try {
        console.log(process.env.GOOGLE_API_KEY,"googleaoi")

      if (!process.env.GOOGLE_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY in environment variables.");
      }
      
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      
    //   const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });



      const result = (await model.generateContent(prompt)) as ImageResponse;
      console.log(result,"resut image")

      const image = result?.candidates?.[0]?.content?.[0]?.imageData;
      console.log(image,"iamge")
      if (!image || !image.data) {
        console.error("Gemini Response:", result);
        throw new Error("Error generating thumbnail: No image data received.");
      }

      const buffer = Buffer.from(image.data, "base64");
      console.log(buffer,"buffer image")
      return buffer; 

    } catch (error) {
      console.error("Error in generateThumbnailAction:", error);
      throw new Error(`Error generating thumbnail: ${(error as Error).message}`);
    }
  },
});

interface GenerateAudioArgs {
    input: string;
  }
  
  interface GeminiAudioResponse {
    response?: {
      candidates?: { content?: { audioData?: string } }[];
    };
  }

 
  
  export const generateAudioAction = action({
    args: { input: v.string() },
    handler: async (_, { input }: {input:string}) => {
      try {
        // const url = `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GOOGLE_API_KEY}`;

        //   const response = await fetch(url);
        //   const data = await response.json();

        //   console.log(data,"data")



//         if (!process.env.GOOGLE_API_KEY) {
//           throw new Error("Missing GOOGLE_API_KEY in environment variables.");
//         }
//   console.log(process.env.GOOGLE_API_KEY,"googleaoi")
//         const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  
        
//         // const model = genAI.getGenerativeModel({ model: "text-bison-001" }); // Ensure correct TTS model
//         const model = genAI.getGenerativeModel({ model: "tts-1" });

  
//         // const ttsRequest = {
//         //     contents: [
//         //       { role: "user", parts: [{ text: input }] }
//         //     ],
//         //     voice: {
//         //       languageCode: "en-US",
//         //       // You can add gender or name based on API docs.
//         //     },
//         //     audioConfig: {
//         //       audioEncoding: "MP3",
//         //       speakingRate: 1.0,
//         //       pitch: 0.0
//         //     }
//         //   };
  
//         const ttsRequest = {
//             contents: [{ role: "user", parts: [{ text: input }] }], // Ensure proper content structure
//             generationConfig: {
//               // Adjust these as needed
//               temperature: 0.7,
//               top_p: 1,
//               top_k: 40
//             }
//           };
          
//         //   const response = await getPodcastAudio(ttsRequest);
          
//         const result = (await model.generateContent(ttsRequest)) as GeminiAudioResponse;
//         console.log(result,"audio result")
  
//         const audioContent = result?.response?.candidates?.[0]?.content?.audioData;
//         console.log(audioContent,"audio content")
//         if (!audioContent) {
//           console.error("Gemini Response:", result);
//           throw new Error("Error generating audio: No audio data received.");
//         }

const apiKey = process.env.GOOGLE_API_KEY;
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  
  const requestBody = {
    input: { text: "Hello, this is a test!" },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" }
  };
  
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  });

  const data = await response.json();
  console.log("Audio Content (Base64):", data);
  
        // const buffer = Buffer.from(data.audioContent, "base64");
  
        // return buffer;
  
 
  
      } catch (error) {
        console.error("Error in generateAudioAction:", error);
        throw new Error(`Error generating audio: ${(error as Error).message}`);
      }
    },
  })

  