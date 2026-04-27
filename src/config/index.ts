import dotenv from "dotenv";
import {
  AuthConfigSchema,
  ServerConfigSchema,
  DatabaseConfigSchema,
  IServerConfig,
  IDatabaseConfig,
  ServicesConfigSchema,
  IServicesConfig,
  IAuthConfig,
  InfraConfigSchema,
  IInfraConfig,
  WhatsappConfigSchema,
  IWhatsappConfig,
} from "./config.types";
dotenv.config();

// Server Configuration
export const serverConfig = ServerConfigSchema.parse({
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
  jwtSecret: process.env.JWT_SECRET,
  hostname: process.env.HOSTNAME || "localhost",
  protocol: process.env.NODE_ENV === "production" ? "https" : "http",
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  endpoints: {
    api: "/api",
    docs: "/docs",
    openApiSpec: "/api-docs",
    health: "/health",
  },
  shutdownTimeout: 5000,
  trustProxy: process.env.TRUST_PROXY || "loopback",
  environment:
    process.env.NODE_ENV === "production" ? "production" : "development",
}) satisfies IServerConfig;

// Database Configuration
export const dbConfig = DatabaseConfigSchema.parse({
  postgres: {
    url:
      process.env.DATABASE_URL || "postgres://postgres@localhost:5432/postgres",
  },
  redis: {
    host: process.env.REDIS_HOST || "localhost",
    port: Number(process.env.REDIS_PORT) || 6379,
    url: process.env.REDIS_URL,
  },
}) satisfies IDatabaseConfig;

// Services Configuration
export const servicesConfig = ServicesConfigSchema.parse({
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
  },
  whatsapp: {
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
    webhookVerifyToken: process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
  },
}) satisfies IServicesConfig;

export const infraConfig = InfraConfigSchema.parse({
  loki: {
    host: process.env.LOKI_HOST ?? "http://127.0.0.1:3100",
    labels: { app: "my-api" },
    batching: process.env.LOKI_BATCHING !== "false",
  },
}) satisfies IInfraConfig;

export const authConfig = AuthConfigSchema.parse({
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
}) satisfies IAuthConfig;

const config = {
  auth: authConfig,
  db: dbConfig,
  server: serverConfig,
  services: servicesConfig,
  infrastructure: infraConfig,
};

// Export everything
export { config };
export default config;

// Environment
export const isDev = process.env.NODE_ENV !== "production";

// CORS
export const corsOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// API Servers
export const ivyiServers = [
  {
    url: `http://localhost:${serverConfig.port}${serverConfig.endpoints.api}`,
    description: "Local development server",
  },
];
