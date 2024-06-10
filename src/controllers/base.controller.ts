import { Request, Response } from "express";

import { prisma } from "../config/settings";

export async function baseController(req: Request, res: Response) {
  try {
    // await prisma.baseTable.findMany({
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // });

    res.status(200).json({ status: "success", message: "Server is running" });
  } catch (error) {
    res.status(500).json({ message: "Error accessing endpoint" });
  }
}
