import { Request, Response, NextFunction } from "express";
import redis from "../Config/Redis";


// Vérifie si le cache existe avant d’aller dans le controller
export const cache = (keyGenerator: (req: Request) => string, ttl = 60) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    try {
      const cached = await redis.get(key);
      if (cached) {
        console.log("⚡ Cache hit:", key);
        return res.status(200).json(JSON.parse(cached));
      }
      // Injecte la méthode res.send pour mettre en cache après réponse
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redis.setex(key, ttl, JSON.stringify(body));
        return originalJson(body);
      };
      next();
    } catch (err) {
      console.error("Redis error", err);
      next(); // fallback si erreur Redis
    }
  };
};
