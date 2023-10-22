import { connectionSource } from "../database/data-source";
import {
    CustomUserSection,
    CustomField,
    Section,
    User,
} from "../database/entities";
import { NotFoundError, BadRequestError } from "../middlewares";
import { success, error } from '../utils/response.util';
const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);
const customUserSectionRepository = connectionSource.getRepository(
    CustomUserSection
);

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



