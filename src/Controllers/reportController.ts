// controllers/reportController.ts
import mongoose from "mongoose";
import Transaction from "../models/Transaction";
import { Request, Response } from "express";
import Wallet from "../models/Wallet";
import { CustomRequest } from "../Types/CustomReequest";


export const getMonthlyReport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // wallet id
    const { month, year } = req.query; // ex: ?month=8&year=2025

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const report = await Transaction.aggregate([
      { $match: { wallet: new mongoose.Types.ObjectId(id), date: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    // transformer les résultats
    const income = report.find(r => r._id === "income")?.total || 0;
    const expense = report.find(r => r._id === "expense")?.total || 0;

    return res.status(200).json({
      status: "success",
      month,
      year,
      income,
      expense,
      balance: income - expense,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Server error" });
  }
};

// controllers/reportController.ts



// Rapport global (tous les wallets d'un utilisateur)
export const getUserMonthlyReport = async (req: CustomRequest, res: Response) => {
  try {
    const { month, year } = req.query;
    const userId = req.user._id; // depuis authMiddleware

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    // 1️ récupérer tous les wallets de l'utilisateur (owner OU partagé)
    const wallets = await Wallet.find({ 
      $or: [
        { owner: userId },
        { users: userId }
      ]
    }).select("_id name");

    if (!wallets.length) {
      return res.status(404).json({ status: "error", message: "Aucun wallet trouvé" });
    }

    const walletIds = wallets.map(w => w._id);

    // 2️ agréger toutes les transactions de ces wallets
    const report = await Transaction.aggregate([
      { 
        $match: { 
          wallet: { $in: walletIds }, 
          date: { $gte: startDate, $lte: endDate } 
        } 
      },
      {
        $group: {
          _id: { wallet: "$wallet", type: "$type" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    // 3️ transformer les résultats
    const result: any[] = wallets.map(w => {
      const income = report.find(r => 
        r._id.wallet.toString() === w._id.toString() && r._id.type === "income"
      )?.total || 0;

      const expense = report.find(r => 
        r._id.wallet.toString() === w._id.toString() && r._id.type === "expense"
      )?.total || 0;

      return {
        walletId: w._id,
        walletName: w.name, 
        income,
        expense,
        balance: income - expense
      };
    });

    // 4️ ajouter un résumé global (tous wallets confondus)
    const totalIncome = result.reduce((acc, r) => acc + r.income, 0);
    const totalExpense = result.reduce((acc, r) => acc + r.expense, 0);

    return res.status(200).json({
      status: "success",
      month,
      year,
      wallets: result,
      total: {
        income: totalIncome,
        expense: totalExpense,
        balance: totalIncome - totalExpense,
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error"
    });
  }
};

