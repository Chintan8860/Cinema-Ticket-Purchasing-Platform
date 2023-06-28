"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseConsecutiveSeatsService = exports.purchaseSeatService = exports.createCinemaService = exports.getCinemaService = void 0;
const Cinema_1 = require("../modal/Cinema");
const getCinemaService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinemas = yield Cinema_1.Cinema.find({});
        return cinemas.map(({ _id, name, seats, seatsAvailable, seatsOccupied }) => ({
            id: _id,
            name,
            seatsAvailable,
            seatsOccupied,
            seats,
        }));
    }
    catch (error) {
        throw new Error("Failed to fetch cinemas");
    }
});
exports.getCinemaService = getCinemaService;
const createCinemaService = (seats, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = new Cinema_1.Cinema({
            name,
            seats,
            seatsAvailable: Array.from({ length: seats }, (_, i) => i + 1),
        });
        yield cinema.save();
        return { cinemaId: cinema._id };
    }
    catch (error) {
        throw new Error("Failed to create cinema");
    }
});
exports.createCinemaService = createCinemaService;
const purchaseSeatService = (cinemaId, seatNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield Cinema_1.Cinema.findById(cinemaId);
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
        yield cinema.save();
        return { seat: seatNumber };
    }
    catch (error) {
        throw new Error("Failed to purchase seat");
    }
});
exports.purchaseSeatService = purchaseSeatService;
const purchaseConsecutiveSeatsService = (cinemaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinema = yield Cinema_1.Cinema.findById(cinemaId);
        if (!cinema) {
            return { error: "Cinema not found" };
        }
        const { seatsAvailable, seatsOccupied } = cinema;
        let consecutiveSeats = [];
        for (let i = 1; i <= seatsAvailable.length; i++) {
            if (!seatsOccupied.includes(i) && !seatsOccupied.includes(i + 1)) {
                consecutiveSeats = [i, i + 1];
                break;
            }
        }
        if (!consecutiveSeats.length) {
            return { error: "No consecutive seats available" };
        }
        const indexesToRemove = consecutiveSeats.map((seat) => seatsAvailable.indexOf(seat));
        indexesToRemove.forEach((index) => seatsAvailable.splice(index, 1));
        consecutiveSeats.forEach((seat) => seatsOccupied.push(seat));
        yield cinema.save();
        return { seats: consecutiveSeats };
    }
    catch (error) {
        throw new Error("Failed to purchase consecutive seats");
    }
});
exports.purchaseConsecutiveSeatsService = purchaseConsecutiveSeatsService;
//# sourceMappingURL=cinemaServices.js.map