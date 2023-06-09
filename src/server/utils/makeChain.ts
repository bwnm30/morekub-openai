import { Configuration, OpenAIApi } from "openai";
import customConfig from "../config/default";
import { prisma } from "./prisma";
import { createChatMessage, findAllMessage } from "../services/chat.service";
import { promptTemplateSystem, promptTemplateUser } from "./prompTemplate";

const configuration = new Configuration({
    apiKey: customConfig.openAIApiKey,
});
const openai = new OpenAIApi(configuration);

export const openAICompletion = async(prompt:string,userId:string) => {
   const conversation =  await findAllMessage(1,5,userId);
   const templateSystem = await promptTemplateSystem();
   const templateUser = await promptTemplateUser(conversation,prompt);
   console.log(templateUser);
   const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": templateSystem},
            {"role": "user", "content": templateUser},
        ],
        temperature: 0.0,
        // max_tokens:1000,
    });

    await createChatMessage({
        userId: userId,
        contentUser:prompt,
        contentAI:(await completion.data.choices[0]?.message?.content as string).replace('หมอครับ:','')
    })

    return await completion.data.choices[0]?.message?.content ;


    // const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages:[
    //         {"role": "system", "content": `คุณคือ หมอ AI สุดล้ำ "หมอครับ" เพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ`},
    //         {"role": "user", "content": 
    //         `คุณคือ หมอ AI สุดล้ำ "หมอครับ" หมอครับเป็นคนสุภาพ และใจดี เป็นเพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ กับ คนไข้ ให้เหมือนกับหมอมืออาชีพ 



    //         การสนทนาก่อนหน้า:
    //         คนไข้:สวัสดีฉันชื่อปาล์ม
    //         หมอครับ:สวัสดีครับ ปาล์ม มีอะไรให้หมอครับช่วยเหลือได้หรือไม่ครับ?
    //         คนไข้:ปวดท้อง
    //         หมอครับ:สำหรับอาการปวดท้อง หมออยากทราบว่าปวดมานานเท่าไหร่และมีอาการอื่นๆ เช่น คลื่นไส้ อาเจียน ท้องผูกหรือท้องเสียไหมครับ?
    //         คนไข้: ${prompt}
            
            
            
    //         ตอนนี้หมอครับจะให้คำตอบที่ละเอียดและยาว ตามด้วยคำถาม:
    //         หมอครับ: 
            
    //         ==========
            
    //         มีอะไรให้หมอครับช่วยเหลือได้หรือไม่ครับ?`
        
        
    //     }
    //     ],
    //     temperature: 0.0,
    // });
    // await createChatMessage({
    //     userId: userId,
    //     contentUser:prompt,
    //     contentAI:await completion.data.choices[0]?.message?.content as string
    // })

    return await "test";
}