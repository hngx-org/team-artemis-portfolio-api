import { connectionSource } from "../database/data-source";
import { Request, Response, NextFunction } from "express";
import {
    CustomUserSection,
    CustomField,
    Section,
    User,
} from "../database/entities";
import { NotFoundError, BadRequestError } from "../middlewares";
import { success, error } from '../utils/response.util';
import { getShopService, validateSlug } from "../services/shop.service";


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

        await validateSlug(user_slug, res)

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

        const userShopDetails = await getShopService(user.id)

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
        //res.status(201).json({ message: "Shop Section retrieved with Details from your Shop", ...customUserSection, userShopDetails });
        return success(res, { ...customUserSection, userShopDetails }, "Shop Section retrieved with Details from your Shop")

        // await customUserSectionRepository.save(customUserSection);
        // res.status(200).json({ message: "Custom Section retrieved", userShopDetails });
    } catch (error) {
        return next(error);
    }

};

export const getUserShopSection = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_slug } = req.params;

        await validateSlug(user_slug, res)

        const user = await userRepository.findOne({ where: { slug: user_slug } });
        if (!user) {
            throw new NotFoundError("User does not exist");
        }

        const section = await customUserSectionRepository.findOne({
            where: { user: { id: user.id } },
        });

        if (!section) {
            throw new NotFoundError("Section does not exist");
        }

        const userShopDetails = await getShopService(user.id)

        //res.status(200).json({ message: "Custom Section retrieved", userShopDetails });
        return success(res, userShopDetails, "Custom Section retrieved")
    } catch (error) {
        return next(error);
    }
}

