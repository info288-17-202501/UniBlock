import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.REDIS_URL) {
  throw new Error(
    "[*] REDIS_URL no definida. Revisa .env o la carga de dotenv"
  );
}

const redisClient = new Redis(process.env.REDIS_URL, {
  connectTimeout: 10000,
});

redisClient.on("connect", () => console.log("[*] Conectado a Redis"));
export default redisClient;
