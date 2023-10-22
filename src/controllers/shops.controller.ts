import { connectionSource } from "../database/data-source";
import { Request, Response, NextFunction } from "express";
import {
    CustomUserSection,
    CustomField,
    Section,
    User,
} from "../database/entities";
import { NotFoundError, BadRequestError } from "../middlewares";

const userRepository = connectionSource.getRepository(User);
const sectionRepository = connectionSource.getRepository(Section);
const customUserSectionRepository = connectionSource.getRepository(
    CustomUserSection
);
const customFieldRepository = connectionSource.getRepository(CustomField);


//create a custom Sectionname shop
export const createShopSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sectionName = "shop";
        const { user_slug } = req.params;

        const user = await userRepository.findOne({ where: { slug: user_slug } });
        if (!user) {
            throw new NotFoundError("User does not exist");
        }

        const section = await sectionRepository.findOne({
            where: { name: "custom" },
        });


        if (!section) {
            throw new NotFoundError("Section does not exist");
        }

        //check if user has a shop
        const shopIds = await connectionSource.manager.query(
            `SELECT
                id AS shop_id
                FROM shop
                WHERE shop.merchant_id = '${user.id}';`);

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
                WHERE shop.merchant_id = '${user.id}'
                GROUP BY shop.id, shop.name;`);

        if (userShopDetails.length < 1) {
            throw new NotFoundError("User does not have a products or product images");
        }

        const shopNameField = new CustomField();
        shopNameField.fieldName = "Shops";
        shopNameField.fieldType = "text";
        shopNameField.value = userShopDetails[0].shop_name;

        //check i user has a custom section name shop
        const isAvailabeShopSection = await customUserSectionRepository.findOne({
            where: { user: { id: user.id }, title: "shop" },
        });
        if (isAvailabeShopSection) {
            throw new BadRequestError("User already has a shop section");
        }

        const customUserSection = new CustomUserSection();
        customUserSection.user = user;
        customUserSection.section = section;
        customUserSection.title = sectionName;
        customUserSection.customFields = [shopNameField];

        await customUserSectionRepository.save(customUserSection);
        res.status(201).json({ message: "Shop Section retrieved with Details from your Shop", ...customUserSection, userShopDetails });


        // await customUserSectionRepository.save(customUserSection);
        // res.status(200).json({ message: "Custom Section retrieved", userShopDetails });
    } catch (error) {
        return next(error);
    }

};

