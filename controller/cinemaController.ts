import { Request, Response } from "express";
import {
  createCinemaService,
  getCinemaService,
  purchaseConsecutiveSeatsService,
  purchaseSeatService,
} from "../services/cinemaServices";

export const getCinemaList = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const cinemaData = await getCinemaService();
      return res.status(201).json(cinemaData);
    } catch (error) {
      console.error("Failed to fetch cinema", error);
      return res.status(500).json({ error: "Failed to fetch cinema" });
    }
  };

export const createCinema = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { seats, name } = req.body;
    const cinemaData = await createCinemaService(seats, name);
    return res.status(201).json(cinemaData);
  } catch (error) {
    console.error("Failed to create cinema", error);
    return res.status(500).json({ error: "Failed to create cinema" });
  }
};

export const purchaseSeat = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cinemaId, seatNumber } = req.body;
    const purchaseSeatData = await purchaseSeatService(cinemaId, seatNumber);
    return res.json(purchaseSeatData);
  } catch (error) {
    console.error("Failed to purchase seat", error);
    return res.status(500).json({ error: "Failed to purchase seat" });
  }
};

export const purchaseConsecutiveSeats = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { cinemaId } = req.body;
    const purchaseConsecutiveSeatsData =
      await purchaseConsecutiveSeatsService(cinemaId);
    return res.json(purchaseConsecutiveSeatsData);
  } catch (error) {
    console.error("Failed to purchase consecutive seats", error);
    return res
      .status(500)
      .json({ error: "Failed to purchase consecutive seats" });
  }
};
