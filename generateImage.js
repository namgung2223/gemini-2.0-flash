const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIImage(filePath, promptText, isBase64 = false) {
    try {
        let base64Image;

        if (isBase64) {
            // 기존 AI 생성된 Base64 이미지 사용
            base64Image = filePath.replace(/^data:image\/(png|jpeg);base64,/, ""); // Base64 데이터 추출
        } else {
            // 새로 업로드된 이미지 변환
            const imageData = fs.readFileSync(filePath);
            base64Image = imageData.toString("base64");
        }

        // 📌 MIME 타입 설정
        const mimeType = isBase64 ? "image/png" : (path.extname(filePath).toLowerCase() === ".png" ? "image/png" : "image/jpeg");

        // 📌 요청 데이터 구성
        const contents = [
            { text: promptText }, // AI에게 요청할 프롬프트
            { inlineData: { mimeType, data: base64Image } },
        ];

        // 📌 모델 설정
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp-image-generation",
            generationConfig: {
                responseModalities: ['Text', 'Image'],
            },
        });

        // 📌 AI 요청 보내기
        const response = await model.generateContent(contents);

        let base64ImageResponse = null;
        let aiText = "AI 설명을 생성할 수 없습니다.";

        for (const part of response.response.candidates[0].content.parts) {
            if (part.text) {
                aiText = part.text;
            } else if (part.inlineData) {
                base64ImageResponse = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }

        return { aiText, base64Image: base64ImageResponse };
    } catch (error) {
        console.error("❌ 이미지 생성 오류:", error);
        return null;
    }
}

module.exports = { generateAIImage };
