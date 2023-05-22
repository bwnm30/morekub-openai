import { Prisma, Chat,Message } from '@prisma/client';
import { prisma } from '../utils/prisma';

export const createChatMessage = async (input: Prisma.ChatCreateInput) => {
  const oldChat = await findUserId({userId: input.userId},{id:true})
  if(oldChat === null){
    const chat = await prisma.chat.create({
      data: {
        userId:input.userId
      },
    })
    await createMessage(chat.id,input);
  }else{
    await createMessage(oldChat.id,input);
  }
  console.log("chat created");
};


const createMessage = async (id:number,input: Prisma.MessageCreateInput) => {
  await prisma.message.create({
    data: {
      chatId:id,
      contentUser:input.contentUser,
      contentAI:input.contentAI,
    },
  })

  console.log("message created");
}


export const findUserId = async (
  where: Partial<Prisma.ChatWhereInput>,
  select?: Prisma.ChatSelect
) => {
  return (await prisma.chat.findFirst({
    where,
    select,
  })) as Chat;
};

// export const findUniquePost = async (
//   where: Prisma.PostWhereUniqueInput,
//   select?: Prisma.PostSelect
// ) => {
//   return (await prisma.post.findUnique({
//     where,
//     select,
//   })) as Post;
// };

export const findAllMessage = async (
  page: number, limit: number,
  userId:string,
) => {
  const chat = await findUserId({userId: userId},{id:true})
  if(!chat) return "";

  const take = limit || 10;
  const skip = (page - 1 ) * limit
  const messages = await prisma.message.findMany({
    where:{
      chatId: chat.id,
    },
    // skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
  });
  if(messages.length > 0 ){
    let conversation:string = "";
    messages.reverse().map((msg:any,index:number) => {
        conversation += messages.length-1 == index ? "คนไข้:"+msg.contentUser.trim()+"\n"+"หมอครับ:"+msg.contentAI.trim():"คนไข้:"+msg.contentUser.trim()+"\n"+"หมอครับ:"+msg.contentAI.trim()+"\n";
    })
    return conversation;
  }
  return "";
};


// export const updatePost = async (
//   where: Partial<Prisma.PostWhereUniqueInput>,
//   data: Prisma.PostUpdateInput,
//   select?: Prisma.PostSelect
// ) => {
//   return (await prisma.post.update({ where, data, select })) as Post;
// };

// export const deletePost = async (where: Prisma.PostWhereUniqueInput)=> {
//   return await prisma.post.delete({where})
// }
