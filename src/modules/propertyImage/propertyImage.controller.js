import { success } from "../../utils/response.js";
import {
  createPropertyImageService,
  getPropertyImagesService,
  deletePropertyImageService
} from "./propertyImage.service.js";

export const createPropertyImage = async (req, res, next) => {
  try {

    const propertyImage = await createPropertyImageService({
      propertyId: req.params.propertyId,
      url: req.body.url,
      userId: req.user.id
    });

    return success(res, propertyImage, "Property image created successfully");

  } catch (error) {
    next(error);
  }
};


export const getPropertyImages = async (req, res, next) => {
  try {

    const images = await getPropertyImagesService(req.params.propertyId);

    return success(res, images, "Success", 200);

  } catch (error) {
    next(error);
  }
};


export const deletePropertyImage = async (req, res, next) => {
  try {

    await deletePropertyImageService({
      id: req.params.id,
      userId: req.user.id
    });

    return success(res, null, "Property image deleted successfully", 200);

  } catch (error) {
    next(error);
  }
};