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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cinemaController_1 = require("./controller/cinemaController");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        // Connect to the MongoDB database
        // not creating any .env , as for demo perpose
        yield mongoose_1.default
            .connect("mongodb+srv://testTask:testTasktestTask@cluster0.x2yeouv.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
            .then(() => {
            console.log("Connected to API Database - Initial Connection");
        })
            .catch((err) => {
            console.log(`Initial API Database connection error occured -`, err);
        });
        const port = 3000;
        //List all conema
        app.get("/cinemas", cinemaController_1.getCinemaList);
        // Create cinema
        app.post("/cinemas", cinemaController_1.createCinema);
        // Book cinema seat
        app.post("/cinemas/purchase/", cinemaController_1.purchaseSeat);
        // Find consecutive seat
        app.post("/cinemas/purchase/consecutive", cinemaController_1.purchaseConsecutiveSeats);
        app.get("*", (req, res) => {
            return res.send({ status: "true" });
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    });
}
startServer().catch((error) => {
    console.error("Failed to start the server", error);
    process.exit(1);
});
//# sourceMappingURL=app.js.map