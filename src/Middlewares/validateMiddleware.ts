import { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";
type AnyZodObject = ZodObject<ZodRawShape>;

interface ValidationError {
  field: string;
  message: string;
}

export const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validationResult = await schema.safeParseAsync(req.body);
      if (!validationResult.success) {
        const zodError = validationResult.error;
        const errors: ValidationError[] = zodError.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
        
        return res.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: errors
        });
      }

      req.body = validationResult.data; // utilise les données validées
      next();
    } catch (error) {
      console.error('Validation error:', error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error during validation",
      });
    }
};