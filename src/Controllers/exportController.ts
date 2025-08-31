import { Request, Response } from "express";
import Transaction from "../models/Transaction";
import { format } from "date-fns";
import { writeToString } from "@fast-csv/format";

export const exportCSV = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { month, year } = req.query;

    const startDate = new Date(Number(year), Number(month) - 1, 1);
    const endDate = new Date(Number(year), Number(month), 0, 23, 59, 59);

    const transactions = await Transaction.find({
      wallet: id,
      date: { $gte: startDate, $lte: endDate },
    }).populate("category", "name");
    // transformer les transactions pour le CSV
    const data = transactions.map((tx) => ({
      date: format(tx.date, "yyyy-MM-dd"), // formatage lisible
      type: tx.type,
      amount: tx.amount,
      category: (tx.category as any).name,
      note: tx.note || "",
    }));
const csv = await writeToString(data, {
  headers: true,// ajoute la première ligne avec les noms des colonnes (name, age).
  quoteColumns: false,//ar défaut, Fast-CSV met " " autour des valeurs de texte. Ici, on ne veut pas de guillemets, donc on met false.
  delimiter: ';', //  delimiter: ';', // pour Excel
});

res.header("Content-Type", "text/csv");
res.attachment(`wallet_${id}_${month}_${year}.csv`);
res.send(csv);

  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: error instanceof Error ? error.message : "Server error",
      });
  }
};
