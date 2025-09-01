import { Request, Response } from "express";
import Wallet from "../models/Wallet";
import { CustomRequest } from "../Types/CustomReequest";

//  Créer un portefeuille
export const createWallet = async (req: CustomRequest, res: Response) => {
  try {
    const { name, description, currency, initialBudget } = req.body;
    
    const wallet = await Wallet.create({
        name,
        description,
        currency,
        initialBudget,
        balance: initialBudget, // balance = initialBudget au départ
        owner: req.user._id,
        users: [req.user._id],
    });

    return res.status(201).json({
      status: "success",
      message: "Wallet created successfully",
      data: wallet,
    });
  } catch (error) {
      return res.status(500).json({
          status: "error",
          message: error instanceof Error ? error.message : "Server error",
    });
  }
};

//  Obtenir tous les wallets de l’utilisateur
export const getWallets = async (req: CustomRequest, res: Response) => {
  try {
    const wallets = await Wallet.find({ users: req.user._id });

    return res.status(200).json({
      status: "success",
      count: wallets.length,
      data: wallets,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Server error",
    });
  }
};

//  Mettre à jour un wallet
export const updateWallet = async (req: CustomRequest, res: Response) => {
  try {
    const { name, description, currency, initialBudget } = req.body;

    const wallet = await Wallet.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, description, currency, initialBudget },
      { new: true, runValidators: true }
    );

    if (!wallet) {
      return res.status(404).json({
        status: "error",
        message: "Wallet not found or unauthorized",
      });
    }

    //  si on change initialBudget, on reset aussi balance
    if (initialBudget !== undefined) {
      wallet.balance = initialBudget;
      await wallet.save();
    }

    return res.status(200).json({
      status: "success",
      message: "Wallet updated successfully",
      data: wallet,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

//  Supprimer un wallet
export const deleteWallet = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!wallet) {
      return res.status(404).json({
        status: "error",
        message: "Wallet not found or unauthorized",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Wallet deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};

//  Ajouter un utilisateur à un wallet
export const addUserToWallet = async (req: CustomRequest, res: Response) => {
  try {
    const { userId } = req.body;

    const wallet = await Wallet.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!wallet) {
      return res.status(404).json({
        status: "error",
        message: "Wallet not found or unauthorized",
      });
    }

    if (!wallet.users.includes(userId)) {
      wallet.users.push(userId);
      await wallet.save();
    }else{
       return res.status(403).json({

      message: "User already exists in this wallet",

    });
    }

    return res.status(200).json({
      status: "success",
      message: "User added to wallet successfully",
      data: wallet,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Server error",
    });
  }
};
