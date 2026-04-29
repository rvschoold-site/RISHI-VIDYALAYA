import { Request, Response } from 'express';
import SiteSettings from '../../../src/models/SiteSettings';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await SiteSettings.find();
  
  // Convert array to object for easier consumption
  const settingsObj = settings.reduce((acc: any, setting: any) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});

  return res.status(200).json(new ApiResponse(200, settingsObj, 'Settings fetched successfully'));
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  const updates = req.body; // { key: value, ... }

  const updatePromises = Object.entries(updates).map(([key, value]) => {
    return SiteSettings.findOneAndUpdate(
      { key },
      { value: String(value) },
      { upsert: true, new: true }
    );
  });


  await Promise.all(updatePromises);

  return res.status(200).json(new ApiResponse(200, {}, 'Settings updated successfully'));
});
