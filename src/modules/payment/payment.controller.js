import { success } from "../../utils/response.js";
import { createPaymentService } from "./payment.service.js";
import { createPaymentSchema } from "./payment.validation.js";

export const createPayment = async (req, res, next) => {
    try {
        const data = createPaymentSchema.parse(req.body);

        const payment = await createPaymentService({
            userId: req.user.id,
            bookingId: data.bookingId
        });

        return success(res, payment, "Payment created successfully");
    } catch (error) {
        next(error)
    };
}

export const getPaymentById = async (req, res, next) => {
    try {
        const payment = await getPaymentByIdService(req.params.id);

        return success(res, payment, "Payment retrieved successfully");
    } catch (error) {
        next(error)
    };
};