import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  const healthData: any = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  };

  try {
    // Check Database Connectivity
    await dbConnect();
    const dbStatus = mongoose.connection.readyState;
    const dbStatusMap = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };
    
    healthData.database = {
      status: dbStatus === 1 ? 'connected' : 'unhealthy',
      connectionType: dbStatusMap[dbStatus as keyof typeof dbStatusMap] || 'unknown',
    };

    if (dbStatus !== 1) {
      healthData.status = 'degraded';
    }

    return NextResponse.json(healthData, { status: healthData.status === 'healthy' ? 200 : 503 });

  } catch (error: any) {
    console.error('Health Check Error:', error);
    healthData.status = 'unhealthy';
    healthData.error = error.message;
    return NextResponse.json(healthData, { status: 503 });
  }
}
