import { checkConnection } from "../api/services/connection-service.js";

describe("Database Connectivity", () => {
  test("should connect to the database", async () => {
    const response = await checkConnection();
    console.log("response: ", response);
    expect(response.status).toBe(200);
  });
});