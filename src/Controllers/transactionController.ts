// Controllers/transactionController.ts
import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { CustomRequest } from "../Types/CustomReequest";
import Wallet from "../models/Wallet";
import redis from "../Config/Redis";

// Créer une transaction
// Créer une transaction avec gestion du solde
export const createTransaction = async (req: CustomRequest, res: Response) => {
  try {
    const { wallet, category, type, amount, date, note } = req.body;

    // 1️ Vérifier si le wallet existe et appartient à l’utilisateur
    const walletDoc = await Wallet.findOne({ _id: wallet, users: req.user._id });
    if (!walletDoc) {
      return res.status(404).json({
        status: "error",
        message: "Wallet not found or unauthorized",
      });
    }

    // 2️ Vérifier le type et mettre à jour le solde
    if (type === "expense") {
      if (walletDoc.balance < amount) {
        return res.status(400).json({
          status: "error",
          message: "Insufficient balance in wallet",
        });
      }
      walletDoc.balance -= amount; // Déduire du solde
    } else if (type === "income") {
      walletDoc.balance += amount; // Ajouter au solde
    }

    // 3️ Sauvegarder la transaction
    const transaction = await Transaction.create({
      wallet,
      user: req.user._id,
      category,
      type,
      amount,
      date,
      note,
    });

    // 4️ Sauvegarder le wallet mis à jour
    await walletDoc.save();

    // Extraire l'année et le mois de la date de la transaction
    const transactionDate = new Date(date);
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;

    // Invalider le cache du rapport mensuel
    await redis.del(`report:${req.user._id}:${year}-${month}`);

    return res.status(201).json({
      status: "success",
      message: "Transaction created successfully",
      data: transaction,
      balance: walletDoc.balance, // 🔹 renvoyer le solde mis à jour
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};


// 🔹 Obtenir toutes les transactions d’un utilisateur
export const getTransactions = async (req: CustomRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit 


    const transactions = await Transaction.find({ user: req.user._id })
      .sort({createdAt : -1})
      .skip(skip)
      .limit(limit)
      .populate("wallet")
      .populate("category");

    return res.status(200).json({
      status: "success",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

//  Mettre à jour une transaction
export const updateTransaction = async (req: CustomRequest, res: Response) => {
  try {
    const { wallet, category, type, amount, date, note } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { wallet, category, type, amount, date, note },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found or unauthorized",
      });
    }
    // Extraire l'année et le mois de la date de la transaction
    const transactionDate = new Date(date);
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;

    // Invalider le cache du rapport mensuel
    await redis.del(`report:${req.user._id}:${year}-${month}`);
    
    return res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

// 🔹 Supprimer une transaction
export const deleteTransaction = async (req: CustomRequest, res: Response) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found or unauthorized",
      });
    }
        // Extraire l'année et le mois de la date de la transaction
    const transactionDate = new Date(transaction.date);
    const year = transactionDate.getFullYear();
    const month = transactionDate.getMonth() + 1;

    // Invalider le cache du rapport mensuel
    await redis.del(`report:${req.user._id}:${year}-${month}`);

    return res.status(200).json({
      status: "success",
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};
