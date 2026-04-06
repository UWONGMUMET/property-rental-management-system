import { AppError } from "../../utils/AppError.js";
import { propertyImageRepository } from "./propertyImage.repository.js";

export const createPropertyImageService = async ({ propertyId, url, userId }) => {

  const property = await propertyImageRepository.findPropertyById(propertyId);

  if (!property) {
    throw new AppError({
      message: "Property not found",
      statusCode: 404,
      code: "PROPERTY_NOT_FOUND"
    });
  }

  if (property.ownerId !== userId) {
    throw new AppError({
      message: "Forbidden",
      statusCode: 403,
      code: "FORBIDDEN"
    });
  }

  return propertyImageRepository.create({
    propertyId,
    url
  });
};


export const getPropertyImagesService = async (propertyId) => {

  const property = await propertyImageRepository.findPropertyById(propertyId);

  if (!property) {
    throw new AppError({
      message: "Property not found",
      statusCode: 404,
      code: "PROPERTY_NOT_FOUND"
    });
  }

  return propertyImageRepository.findImagesByPropertyId(propertyId);
};


export const deletePropertyImageService = async ({ id, userId }) => {

  const image = await propertyImageRepository.findImageById(id);

  if (!image) {
    throw new AppError({
      message: "Image not found",
      statusCode: 404,
      code: "IMAGE_NOT_FOUND"
    });
  }

  const property = await propertyImageRepository.findPropertyById(image.propertyId);

  if (property.ownerId !== userId) {
    throw new AppError({
      message: "Forbidden",
      statusCode: 403,
      code: "FORBIDDEN"
    });
  }

  return propertyImageRepository.delete(id);
};