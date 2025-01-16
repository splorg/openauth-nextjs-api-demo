import type { Request, Response, NextFunction } from "express";
import { subjects } from "subjects";
import { client } from "./auth";

declare global {
  namespace Express {
    interface Request {
      user?: {
        type: string;
        properties: {
          id: string;
        }
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let accessToken: string | undefined;

    if (req.cookies.access_token) {
      accessToken = req.cookies.access_token;
    } else {
      const authHeader = req.headers.authorization;

      if (authHeader) {
        const [type, token] = authHeader.split(" ");
        if (type === "Bearer") {
          accessToken = token;
        }
      }
    }

    if (!accessToken) {
      throw new Error("No authentication token provided");
    }

    const verified = await client.verify(subjects, accessToken)

    if (verified.err) {
      throw new Error("Invalid authentication token");
    }

    req.user = verified.subject;
    next();
  } catch (error) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}