import { Response } from "express";
import { connectionSource } from "../database/data-source";
import {
    CustomUserSection,
    CustomField,
    Section,
    User,
} from "../database/entities";
import { NotFoundError, BadRequestError } from "../middlewares";
import { success, error } from '../utils/response.util';
import { ZodError, z } from "zod";

const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);
const customUserSectionRepository = connectionSource.getRepository(
    CustomUserSection
);

const slugSchema = z.string({
    required_error: "user_slug is not present in params",
    invalid_type_error: "user_slug must be a string"
})
.trim()
.min(0, "user_slug cannot be an empty string")


export const validateSlug = async (user_slug: string, res: Response) => {
    /*
    try {
        await slugSchema.parseAsync(user_slug)
    } catch(err) {
        const { errors } = err as ZodError;
        throw new BadRequestError(errors[0].message)
    }*/

    if(user_slug.trim().length < 1) {
        return error(res, "user_slug cannot be an empty string", 400)
    }
}

export const getShopService = async (user_id: string) => {
    const shopIds = await connectionSource.manager.query(
        `SELECT
            id AS shop_id
            FROM shop
            WHERE shop.merchant_id = '${user_id}';`);


    if (shopIds.length < 1) {
        throw new NotFoundError("User does not have a shop");
    }
    const userShopDetails = await connectionSource.manager.query(
        `SELECT
            shop.id AS shop_id,
            shop.name AS shop_name,
            ARRAY_AGG(product_image.url) AS product_images
            FROM shop
            INNER JOIN product ON shop.id = product.shop_id
            INNER JOIN product_image ON product.id = product_image.product_id
            WHERE shop.merchant_id = '${user_id}'
            GROUP BY shop.id, shop.name;`);

    return userShopDetails;
}

export const checkForShop = async (user_id: string) => {
    const shopIds = await connectionSource.manager.query(
        `SELECT
            id AS shop_id
            FROM shop
            WHERE shop.merchant_id = '${user_id}';`);


    return shopIds.length < 1 ? false : true;

}



