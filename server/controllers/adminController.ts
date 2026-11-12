import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { prisma } from "../config/prisma.js";

//Get admin dashboard data
export const getAdminStats = async (req: Request, res: Response) => {
  const [
    totalOrders,
    totalUsers,
    totalProducts,
    outOfStockProducts,
    totalPartners,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({
      where: { NOT: [{ paymentMethod: "card", isPaid: false }] },
    }),
    prisma.user.count(),
    prisma.product.count(),
    prisma.product.count({ where: { stock: 0 } }),
    prisma.deliveryPartner.count(),
    prisma.order.findMany({
      where: { NOT: { paymentMethod: "card", isPaid: false } },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: { select: { name: true, email: true } },
        deliveryPartner: { select: { name: true, phone: true } },
      },
    }),
  ]);
  res.json({
    totalOrders: totalOrders,
    totalUsers: totalUsers,
    totalProducts: totalProducts,
    outOfStockProducts: outOfStockProducts,
    totalPartners: totalPartners,
    recentOrders: recentOrders,
  });
};

//Get delivery partners list for admin
export const getDeliveryPartners = async (req: Request, res: Response) => {
  const deliveryPartners = await prisma.deliveryPartner.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json({ deliveryPartners: deliveryPartners });
};

//Create delivery partner profile
export const createDeliveryPartner = async (req: Request, res: Response) => {
  const { name, email, password, phone, vehicleType } = req.body;

  if (!name || !email || !password || !phone) {
    res.status(400).json({ message: "Please provide all required fields" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newDeliveryPartner = await prisma.deliveryPartner.create({
    data: {
      name: name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone,
      vehicleType: vehicleType,
    },
  });

  res.status(201).json({
    message: "New delivery partner successfully created",
    newDeliveryPartner: newDeliveryPartner,
  });
};

//Update delivery partner profile
export const updateDeliveryPartner = async (req: Request, res: Response) => {
  const { name, phone, vehicleType, isActive } = req.body;

  const data: any = {};

  if (name) {
    data.name = name;
  }
  if (phone) {
    data.phone = phone;
  }
  if (vehicleType) {
    data.vehicleType = vehicleType;
  }
  if (isActive) {
    data.isActive = isActive;
  }

  try {
    const updatedDeliveryPartner = await prisma.deliveryPartner.update({
      where: { id: req.params.id as string },
      data: data,
    });
    res.json({
      message: "Delivery partner updated successfully",
      updatedDeliveryPartner: updatedDeliveryPartner,
    });
  } catch (error: any) {
    res.status(404).json({ message: "Delivery partner not found" });
  }
};

//Assign delivery partner to order
export const assignDeliveryPartner = async (req: Request, res: Response) => {
  const { partnerId } = req.body;

  const order = await prisma.order.findUnique({
    where: { id: req.params.id as string },
  });

  const deliveryPartner = await prisma.deliveryPartner.findUnique({
    where: { id: partnerId },
  });

  const otp = String(Math.floor(100000 + Math.random() * 900000));

  let status = order!.status;

  const history: any[] = Array.isArray(order!.statusHistory)
    ? order!.statusHistory
    : [];

  if (order!.status === "Placed" || order!.status === "Confirmed") {
    status = "Assigned";
    history.push({
      status: "Assigned",
      note: `Assigned to ${deliveryPartner!.name}`,
      timestamp: new Date(),
    });
  }

  await prisma.order.update({
    where: { id: order!.id },
    data: {
      deliveryPartnerId: deliveryPartner!.id,
      deliveryOtp: otp,
      status: status,
      statusHistory: history,
    },
  });

  res.json({ order: order });
};
