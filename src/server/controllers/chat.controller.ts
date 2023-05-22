import { TRPCError } from '@trpc/server';
import type { Context } from '../createContext';
import { client } from '../utils/lineSdk';
import { openAICompletion } from '../utils/makeChain';

export const webhook = async ({ ctx }: { ctx: Context }):Promise<any> => {
  try {
   const events = ctx.req.body.events 
   if(events.length ==  0) { return ctx.res.status(200).send("OK") }
   if(events[0] .message.type === "text"){
        return client.replyMessage(events[0] .replyToken,{type:"text",text: await openAICompletion(events[0].message.text) as string});
   } 
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
