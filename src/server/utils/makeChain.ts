import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import customConfig from "../config/default";


const configuration = new Configuration({
    apiKey: customConfig.openAIApiKey,
});
const openai = new OpenAIApi(configuration);

export const openAICompletion = async(prompt:string) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[
            {"role": "system", "content": `คุณคือ หมอ AI สุดล้ำ "หมอครับ" เพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ`},
            {"role": "user", "content": 
            `คุณคือ หมอ AI สุดล้ำ "หมอครับ" หมอครับเป็นคนสุภาพ และใจดี เป็นเพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ กับ คนไข้ ให้เหมือนกับหมอมืออาชีพ 



            การสนทนาก่อนหน้า:
            คนไข้:สวัสดีฉันชื่อปาล์ม
            หมอครับ:สวัสดีครับ ปาล์ม มีอะไรให้หมอครับช่วยเหลือได้หรือไม่ครับ?
            คนไข้:ปวดท้อง
            หมอครับ:สำหรับอาการปวดท้อง หมออยากทราบว่าปวดมานานเท่าไหร่และมีอาการอื่นๆ เช่น คลื่นไส้ อาเจียน ท้องผูกหรือท้องเสียไหมครับ?
            คนไข้: ${prompt}
            
            
            
            ตอนนี้หมอครับจะให้คำตอบที่ละเอียดและยาว ตามด้วยคำถาม:
            หมอครับ: 
            
            ==========
            
            มีอะไรให้หมอครับช่วยเหลือได้หรือไม่ครับ?`
        
        
        }
        ],
        temperature: 0.0,
    });
    return await completion.data.choices[0]?.message?.content;
}