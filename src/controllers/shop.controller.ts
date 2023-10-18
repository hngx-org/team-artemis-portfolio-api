import { Request, Response } from "express";
import { connectionSource } from "../database/data-source";
import { User, Product } from "../database/entities";
import { NotFoundError } from "../middlewares/index";

const userRepository = connectionSource.getRepository(User);
const productRepository = connectionSource.getRepository(Product);

export const fetchShop = async (req: Request, res: Response) => {
  console.log("checking");
  try {
    const user_id = req.params.id;

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (!user) {
      res.status(400).json({ error: "A user with this ID does not exist" });
    }

    const findProducts = await productRepository.find({
      where: {
        user_id: user_id,
      },
      relations: ["productImages"],
    });

    if (!findProducts || findProducts.length === 0) {
      res.status(404).json({ error: "No items found in your shop." });
    } else {
      const productImageUrls = findProducts.map((product) =>
        product.productImages.map((image) => image.url)
      );

      const response = {
        message: "Items found in your shop.",
        productImages: productImageUrls.flat(),
      };
      console.log("product", response);
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(error.status || 500).json({ error });
  }
};
