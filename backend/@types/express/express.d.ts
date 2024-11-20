import express from 'express';

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number
        username: string
        staff: number
      }
    }
  }
}