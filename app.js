require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { generateAIImage } = require("./generateImage");

const app = express();
const port = process.env.PORT || 8000;

// 📌 정적 파일 제공 (index.html)
app.use(express.static(path.join(__dirname, "public")));

// Multer 설정 (파일 업로드)
const upload = multer({ dest: "uploads/" });

// 📌 API: 업로드 및 AI 이미지 생성
app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        let filePath;
        let isBase64 = false;

        if (req.body.baseImage) {
            // 사용자가 기존 AI 이미지에서 계속 생성 요청한 경우
            filePath = req.body.baseImage;
            isBase64 = true; // Base64 이미지 여부 플래그
        } else if (req.file) {
            // 사용자가 처음 이미지를 업로드한 경우
            filePath = req.file.path;
        } else {
            return res.status(400).json({ error: "파일을 업로드하세요." });
        }

        const promptText = req.body.prompt || "이 이미지에 AI 효과를 추가해주세요.";

        // 📌 AI 이미지 생성 요청
        const generatedImage = await generateAIImage(filePath, promptText, isBase64);

        if (generatedImage) {
            res.json({ imageUrl: generatedImage });
        } else {
            res.status(500).json({ error: "이미지 생성 실패" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 서버 실행
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
