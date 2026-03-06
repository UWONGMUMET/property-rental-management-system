import { createPropertyService, deletePropertyService, getPropertyByIdService, listPropertyService, updatePropertyService } from "./property.service.js";
import { success } from "../../utils/response.js";
import { createPropertySchema } from "./property.validation.js";

export const createProperty = async (req, res, next) => {
    try {
        const data = createPropertySchema.parse(req.body);

        const result = await createPropertyService({
            userId: req.user.id,
            data
        });

        return success(res, result, "Property created successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getPropertyById = async (req, res, next) => {
    try {
        const result = await getPropertyByIdService(req.params.id);
        return success(res, result, "Success", 200);
    } catch (error) {
        next(error);
    }
};

export const listProperty = async (req, res, next) => {
    try {
        const result = await listPropertyService(req.validatedQuery);
        return success(res, result, "Success", 200);
    } catch (err) {
        next(err);
    }
};

export const updateProperty = async (req, res, next) => {
    try {
        const result = await updatePropertyService({
            userId: req.user.id,
            propertyId: req.params.id,
            data: req.body
        });
        return success(res, result, "Property updated successfully", 200);
    } catch (err) {
        next(err);
    }
};

export const deleteProperty = async (req, res, next) => {
    try {
        const result = await deletePropertyService({
            userId: req.user.id,
            propertyId: req.params.id
        });

        return success(res, result, "Property deleted successfully", 200);
    } catch (err) {
        next(err);
    }
};