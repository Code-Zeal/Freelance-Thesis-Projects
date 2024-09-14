import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
import axios from "axios";
import sharp from "sharp";
import fs from 'fs';
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
dotenv.config();
function getRandomPrompts(prompts, num) {
  const shuffled = prompts.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const hf = new HfInference(process.env.HFKEY);
export const createImage = async (req, res) => {
  try {
    // Función auxiliar para convertir el blob en buffer
    async function bufferImage(blob) {
      const arrayBuffer = await blob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    }

    // Ruta del archivo prompts.json
    const promptsPath = path.join(__dirname, 'prompts.json');

    // Leer el archivo prompts.json
    const data = fs.readFileSync(promptsPath, 'utf-8');
    const { background_prompts } = JSON.parse(data);

    // Obtener 3 prompts aleatorios
    const randomPrompts = getRandomPrompts(background_prompts, 3);

    // Array para almacenar las imágenes generadas
    const images = [];

    // Generar imágenes para cada prompt aleatorio
    for (const prompt of randomPrompts) {
      const response = await hf.textToImage({
        inputs: prompt,
        model: "CompVis/stable-diffusion-v1-4",
      });

      const finalImage = await bufferImage(response);

      if (finalImage) {
        const base64Image = `data:image/jpeg;base64,${finalImage.toString("base64")}`;
        images.push(base64Image);
      }
    }

    // Devolver el array de imágenes
    return res.status(200).json(images);

  } catch (error) {
    return res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};


export const addBackground = async (req, res) => {
  try {
    const { frontImage, backgroundImage } = req.body;

    // Descargar las imágenes
    const [frontImageResponse, backgroundImageResponse] = await Promise.all([
      axios.get(frontImage, { responseType: "arraybuffer" }),
      axios.get(backgroundImage, { responseType: "arraybuffer" }),
    ]);

    // Convertir las imágenes a Buffer
    const frontImageBuffer = Buffer.from(frontImageResponse.data, "binary");
    const backgroundImageBuffer = Buffer.from(
      backgroundImageResponse.data,
      "binary"
    );

    // Obtener las dimensiones de frontImage
    const frontImageMetadata = await sharp(frontImageBuffer).metadata();

    // Cambiar el tamaño de backgroundImage para que sea igual a frontImage
    const resizedBackgroundImageBuffer = await sharp(backgroundImageBuffer)
      .resize(frontImageMetadata.width, frontImageMetadata.height)
      .toBuffer();

    // Colocar frontImage encima de backgroundImage
    const outputBuffer = await sharp(resizedBackgroundImageBuffer)
      .composite([{ input: frontImageBuffer, gravity: "center" }])
      .toBuffer();

    // Convertir outputBuffer a una cadena base64
    const outputBase64 = `data:image/jpeg;base64,${outputBuffer.toString(
      "base64"
    )}`;

    // Devolver la imagen en la respuesta
    res
      .status(200)
      .json({ message: "Imagen procesada correctamente", image: outputBase64 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const IAQuestion = async (req, res) => {
  try {
    const MODEL_NAME = "gemini-1.0-pro";
    const API_KEY = process.env.GEMINI_KEY;
    const { input } = req.body;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 0,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
    const result = await chat.sendMessage(input);
    const response = result.response;
    console.log(response.text());
    res.status(200).json({ message: response.text() });
  } catch (error) {
    res.status(500).json({ error });
  }
};
