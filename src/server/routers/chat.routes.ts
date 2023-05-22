import { lineProcedure, t } from "../createRouter";
import { webhook } from "../controllers/chat.controller";

const chatRouter = t.router({
  webhook: lineProcedure.mutation(({ ctx }) => webhook({ ctx })),
});

export default chatRouter;
