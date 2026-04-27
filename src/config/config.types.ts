import { z } from "zod";

// Server Configuration
export const ServerEndpointsSchema = z.object({
  api: z.string().min(1, "API endpoint is required"),
  docs: z.string().min(1, "Docs endpoint is required"),
  openApiSpec: z.string().min(1, "OpenAPI spec endpoint is required"),
  health: z.string().min(1, "Health check endpoint is required"),
});

export const AuthConfigSchema = z.object({
  jwtSecret: z.string().optional(),
  jwtRefreshSecret: z.string().optional(),
});

export const ServerConfigSchema = z.object({
  port: z.number().int().min(1).max(65535),
  env: z.string().min(1, "Environment is required"),
  isProduction: z.boolean(),
  isDevelopment: z.boolean(),
  hostname: z.string().min(1, "Hostname is required"),
  protocol: z.enum(["http", "https"]),
  baseUrl: z.string().url("Base URL must be a valid URL"),
  clientUrl: z.string().url("Client URL must be a valid URL").optional(),
  endpoints: ServerEndpointsSchema,
  shutdownTimeout: z.number().int().min(0),
  trustProxy: z.union([z.string(), z.number()]),
  environment: z.string(),
});

// Database Configuration
export const RedisConfigSchema = z.object({
  url: z.string().url().optional(),
  port: z.number().int().min(1).max(65535).optional(),
  host: z.string().optional(),
});

export const PostgresConfigSchema = z.object({
  url: z.string().url("PostgreSQL URL must be a valid URL"),
});

export const DatabaseConfigSchema = z.object({
  postgres: PostgresConfigSchema,
  redis: RedisConfigSchema.optional(),
});

// External Services Configuration
export const GoogleMapsConfigSchema = z.object({
  apiKey: z.string().optional(),
});

export const WhatsappConfigSchema = z.object({
  phoneNumberId: z.string().optional(),
  businessAccountId: z.string().optional(),
  accessToken: z.string().optional(),
  webhookVerifyToken: z.string().optional(),
});

// Main Services Configuration
export const ServicesConfigSchema = z.object({
  googleMaps: GoogleMapsConfigSchema,
  whatsapp: WhatsappConfigSchema,
});

// Infrastructure Configuration
export const LokiConfigSchema = z.object({
  host: z.string().url().default("http://127.0.0.1:3100"),
  labels: z.record(z.string(), z.string()).default({ app: "my-api" }),
  batching: z.boolean().default(true),
});

export const InfraConfigSchema = z.object({
  loki: LokiConfigSchema.optional(),
});

// Type definitions
export type IServerEndpoints = z.infer<typeof ServerEndpointsSchema>;
export type IServerConfig = z.infer<typeof ServerConfigSchema>;
export type IDatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
export type IServicesConfig = z.infer<typeof ServicesConfigSchema>;
export type IAuthConfig = z.infer<typeof AuthConfigSchema>;
export type IInfraConfig = z.infer<typeof InfraConfigSchema>;
export type IWhatsappConfig = z.infer<typeof WhatsappConfigSchema>;
