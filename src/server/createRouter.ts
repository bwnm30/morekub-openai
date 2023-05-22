import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";
import connectDB from "./utils/prisma";
import {
    Client,
    middleware,
  } from "@line/bot-sdk";
import { lineConfig } from "./utils/lineSdk";

// Connect to Prisma
connectDB();

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next();
});

const isAuthedLine = t.middleware(({ next, ctx }) => {
  try {
    middleware(lineConfig);
  } catch (error) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be Acccess token to access this resource",
    });
  }    
  return next();
});


export const protectedProcedure = t.procedure.use(isAuthed);
export const publicProcedure = t.procedure;
export const lineProcedure = t.procedure.use(isAuthedLine);