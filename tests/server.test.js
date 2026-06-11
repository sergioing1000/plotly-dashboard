import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../server.js";

describe("Plotly Dashboard Server", () => {

  describe("GET /api/charts", () => {

    it("should return status 200", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.status).toBe(200);
    });

    it("should return JSON content type", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.headers["content-type"])
        .toContain("application/json");
    });

    it("should contain sales data", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body).toHaveProperty("sales");
    });

    it("should contain visits data", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body).toHaveProperty("visits");
    });

    it("should contain productivity data", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body).toHaveProperty("productivity");
    });

    it("should return 5 sales labels", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.sales.labels).toHaveLength(5);
    });

    it("should return 5 sales values", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.sales.values).toHaveLength(5);
    });

    it("should return matching label/value lengths for sales", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.sales.labels.length)
        .toBe(response.body.sales.values.length);
    });

    it("should return matching label/value lengths for visits", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.visits.labels.length)
        .toBe(response.body.visits.values.length);
    });

    it("should return matching label/value lengths for productivity", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.productivity.labels.length)
        .toBe(response.body.productivity.values.length);
    });

    it("should return numeric values for sales", async () => {
      const response = await request(app).get("/api/charts");

      response.body.sales.values.forEach(value => {
        expect(typeof value).toBe("number");
      });
    });

    it("should return numeric values for visits", async () => {
      const response = await request(app).get("/api/charts");

      response.body.visits.values.forEach(value => {
        expect(typeof value).toBe("number");
      });
    });

    it("should return numeric values for productivity", async () => {
      const response = await request(app).get("/api/charts");

      response.body.productivity.values.forEach(value => {
        expect(typeof value).toBe("number");
      });
    });

    it("should contain expected first sales month", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.sales.labels[0]).toBe("January");
    });

    it("should contain expected last sales value", async () => {
      const response = await request(app).get("/api/charts");

      expect(response.body.sales.values[4]).toBe(300);
    });

  });

  describe("Invalid Routes", () => {

    it("should return 404 for unknown routes", async () => {
      const response = await request(app)
        .get("/api/not-found");

      expect(response.status).toBe(404);
    });

  });

});