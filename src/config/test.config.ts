import dotenv from "dotenv";
import {
  ServerConfigSchema,
  DatabaseConfigSchema,
  IServerConfig,
  IDatabaseConfig,
  InfraConfigSchema,
  IInfraConfig,
} from "./config.types";
dotenv.config();

// Test Server Configuration
export const testServerConfig = ServerConfigSchema.parse({
  port: 3001, // Different port for testing
  env: "test",
  isProduction: false,
  isDevelopment: false,
  jwtSecret: "test-jwt-secret-key",
  hostname: "localhost",
  protocol: "http",
  baseUrl: "http://localhost:3001",
  endpoints: {
    api: "/api",
    docs: "/docs",
    openApiSpec: "/api-docs",
    health: "/health",
  },
  shutdownTimeout: 5000,
  trustProxy: "loopback",
  environment: "test",
}) satisfies IServerConfig;

// Test Database Configuration
export const testDbConfig = DatabaseConfigSchema.parse({
  postgres: {
    url:
      process.env.TEST_DATABASE_URL ||
      "postgres://postgres@localhost:5432/mahakama_test",
  },
}) satisfies IDatabaseConfig;

// Test Infrastructure Configuration
export const testInfraConfig = InfraConfigSchema.parse({
  loki: {
    host: process.env.TEST_LOKI_HOST ?? "http://127.0.0.1:3101", // Different port for testing
    labels: { app: "my-api-test" },
    batching: process.env.TEST_LOKI_BATCHING !== "false",
  },
}) satisfies IInfraConfig;

const testConfig = {
  server: testServerConfig,
  db: testDbConfig,
  infraConfig: testInfraConfig,
};

// Export everything
export { testConfig };
export default testConfig;

// Test Environment
export const isTest = true;

// Test CORS
export const testCorsOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

// Test API Servers
export const testivyiServers = [
  {
    url: `http://localhost:${testServerConfig.port}${testServerConfig.endpoints.api}`,
    description: "Test server",
  },
];
