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
exports.purchaseConsecutiveSeats = exports.purchaseSeat = exports.createCinema = exports.getCinemaList = void 0;
const cinemaServices_1 = require("../services/cinemaServices");
const getCinemaList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cinemaData = yield (0, cinemaServices_1.getCinemaService)();
        return res.status(201).json(cinemaData);
    }
    catch (error) {
        console.error("Failed to fetch cinema", error);
        return res.status(500).json({ error: "Failed to fetch cinema" });
    }
});
exports.getCinemaList = getCinemaList;
const createCinema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { seats, name } = req.body;
        const cinemaData = yield (0, cinemaServices_1.createCinemaService)(seats, name);
        return res.status(201).json(cinemaData);
    }
    catch (error) {
        console.error("Failed to create cinema", error);
        return res.status(500).json({ error: "Failed to create cinema" });
    }
});
exports.createCinema = createCinema;
const purchaseSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaId, seatNumber } = req.body;
        const purchaseSeatData = yield (0, cinemaServices_1.purchaseSeatService)(cinemaId, seatNumber);
        return res.json(purchaseSeatData);
    }
    catch (error) {
        console.error("Failed to purchase seat", error);
        return res.status(500).json({ error: "Failed to purchase seat" });
    }
});
exports.purchaseSeat = purchaseSeat;
const purchaseConsecutiveSeats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaId } = req.body;
        const purchaseConsecutiveSeatsData = yield (0, cinemaServices_1.purchaseConsecutiveSeatsService)(cinemaId);
        return res.json(purchaseConsecutiveSeatsData);
    }
    catch (error) {
        console.error("Failed to purchase consecutive seats", error);
        return res
            .status(500)
            .json({ error: "Failed to purchase consecutive seats" });
    }
});
exports.purchaseConsecutiveSeats = purchaseConsecutiveSeats;
//# sourceMappingURL=cinemaController.js.map