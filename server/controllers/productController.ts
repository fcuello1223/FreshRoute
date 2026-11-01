import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { Product } from "../generated/prisma/client.js";

//GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;

  const where: any = {};

  if (category && category !== "all") {
    where.category = category as string;
  }

  if (search) {
    where.name = { contains: search as string, mode: "insensitive" };
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) {
      where.price.gte = Number(minPrice);
    }
    if (maxPrice) {
      where.price.lte = Number(maxPrice);
    }
  }

  const orderBy: any = {};

  if (sort === "price-low") {
    orderBy.price = "asc";
  } else if (sort === "price-high") {
    orderBy.price = "desc";
  } else {
    orderBy.createdAt = "desc";
  }

  const products = await prisma.product.findMany({
    where: where,
    orderBy: orderBy,
  });

  const productsWithDiscount = products.map((product: Product) => {
    const discount =
      product.originalPrice && product.price
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100,
          )
        : 0;
    return { ...product, discount: discount };
  });

  res.json({ products: productsWithDiscount });
};

//GET /api/products/flash-deals
export const getFlashDeals = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { stock: { gt: 0 } },
    orderBy: { originalPrice: "desc" },
  });

  const productsWithDiscount = products.map((product: Product) => {
    const discount =
      product.originalPrice && product.price
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100,
          )
        : 0;

    return { ...product, discount: discount };
  });
  res.json({ products: productsWithDiscount.slice(0, 10) });
};

//GET /api/products/:id
export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id as string },
  });
  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }
  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;
  res.json({ product: { ...product, discount: discount } });
};

//POST /api/products
export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({ data: req.body });
  res
    .status(201)
    .json({ message: "Product created", product: product });
};

//PUT /api/products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: { id: req.params.id as string },
    data: req.body,
  });
  res.json({ message: "Product information updated", product: product });
};

//DELETE /api/products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  await prisma.product.delete({ where: { id: req.params.id as string } });
  res.json({ message: "Product deleted" });
};
