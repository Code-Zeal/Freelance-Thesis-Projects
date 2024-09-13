import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
try {
  const pathRouter = __dirname;

  const removeExtension = (fileName) => {
    return fileName.split(".").shift();
  };

  fs.readdirSync(pathRouter).forEach(async (file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ["index"].includes(fileWithOutExt || "");
    if (!skip) {
      const module = await import(`./${fileWithOutExt}.js`);
      router.use(`/${fileWithOutExt}`, module.default);
      console.log("Loaded route ---->", fileWithOutExt);
    }
  });
} catch (error) {
  console.log(error);
}
export default router;
