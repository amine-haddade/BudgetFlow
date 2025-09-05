// Controllers/categoryController.ts
import type  { Request, Response } from "express";
import Category from "../models/Category";

// 🔹 Créer une catégorie
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    const category = await Category.create({
      name,
      color,

    });

    return res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

// 🔹 Obtenir toutes les catégories d’un utilisateur
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      status: "success",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
      
    });
  }
};

// 🔹 Mettre à jour une catégorie
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id},
      { name, color },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found or unauthorized",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

// 🔹 Supprimer une catégorie
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,

    });

    if (!category) {
      return res.status(404).json({
        status: "error",
        message: "Category not found or unauthorized",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};
