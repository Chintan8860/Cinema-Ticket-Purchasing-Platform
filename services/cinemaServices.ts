import { Cinema } from "../modal/Cinema";

export const getCinemaService = async (): Promise<
  {
    name: string;
    seats: number;
    seatsAvailable: number[];
    seatsOccupied: number[];
  }[]
> => {
  try {
    const cinemas = await Cinema.find({});
    return cinemas.map(
      ({ _id, name, seats, seatsAvailable, seatsOccupied }) => ({
        id: _id,
        name,
        seatsAvailable,
        seatsOccupied,
        seats,
      })
    );
  } catch (error) {
    throw new Error("Failed to fetch cinemas");
  }
};

export const createCinemaService = async (
  seats: number,
  name: string
): Promise<{ cinemaId: string }> => {
  try {
    const cinema = new Cinema({
      name,
      seats,
      seatsAvailable: Array.from({ length: seats }, (_, i) => i + 1),
    });
    await cinema.save();
    return { cinemaId: cinema._id };
  } catch (error) {
    throw new Error("Failed to create cinema");
  }
};

export const purchaseSeatService = async (
  cinemaId: string,
  seatNumber: number
): Promise<{
  error?: string;
  seat?: number;
}> => {
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return { error: "Cinema not found" };
    }

    const { seatsAvailable, seatsOccupied } = cinema;
    if (seatsOccupied.includes(Number(seatNumber))) {
      return { error: "Seat already purchased" };
    }

    const index = seatsAvailable.indexOf(Number(seatNumber));
    if (index === -1) {
      return { error: "Seat not found" };
    }

    seatsAvailable.splice(index, 1);
    seatsOccupied.push(Number(seatNumber));
    await cinema.save();

    return { seat: seatNumber };
  } catch (error) {
    throw new Error("Failed to purchase seat");
  }
};

export const purchaseConsecutiveSeatsService = async (
  cinemaId: string
): Promise<{
  error?: string;
  seats?: number[];
}> => {
  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return { error: "Cinema not found" };
    }
    const { seatsAvailable, seatsOccupied } = cinema;
    let consecutiveSeats: number[] = [];

    for (let i = 1; i <= seatsAvailable.length; i++) {
      if (!seatsOccupied.includes(i) && !seatsOccupied.includes(i + 1)) {
        consecutiveSeats = [i, i + 1];
        break;
      }
    }

    if (!consecutiveSeats.length) {
      return { error: "No consecutive seats available" };
    }

    const indexesToRemove = consecutiveSeats.map((seat) =>
      seatsAvailable.indexOf(seat)
    );
    indexesToRemove.forEach((index) => seatsAvailable.splice(index, 1));
    consecutiveSeats.forEach((seat) => seatsOccupied.push(seat));
    await cinema.save();

    return { seats: consecutiveSeats };
  } catch (error) {
    throw new Error("Failed to purchase consecutive seats");
  }
};
