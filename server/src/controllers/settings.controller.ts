import { Request, Response } from 'express';
import prisma from '../config/db';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await prisma.siteSettings.findMany();
  
  // Convert array to object for easier consumption
  const settingsObj = settings.reduce((acc: any, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return res.status(200).json(new ApiResponse(200, settingsObj, 'Settings fetched successfully'));
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const updates = req.body; // { key: value, ... }

  const updatePromises = Object.entries(updates).map(([key, value]) => {
    return prisma.siteSettings.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) }
    });
  });

  await Promise.all(updatePromises);

  return res.status(200).json(new ApiResponse(200, {}, 'Settings updated successfully'));
});
