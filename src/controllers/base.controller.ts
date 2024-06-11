import { Request, Response } from "express";

export async function baseController(req: Request, res: Response) {
  try {
    res.status(200).json({ status: "success", message: "Server is running" });
  } catch (error) {
    res.status(500).json({ message: "Error accessing endpoint" });
  }
}
