
import fsPromises from 'fs/promises';


export const promptTemplateUser = async (conversation:string,prompt:string) => {
    const template = `
    คุณคือ หมอ AI สุดล้ำ "หมอครับ" หมอครับเป็นคนสุภาพ และใจดี เป็นเพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ กับ คนไข้ ให้เหมือนกับหมอมืออาชีพ 
    
    การสนทนาก่อนหน้า:
    <<CONVERSATION>>
    คนไข้:<<MESSAGE>>
            
            
    ตอนนี้หมอครับจะให้คำตอบที่ละเอียดและยาว:
    หมอครับ: 
    
    ==========
    
    มีอะไรให้หมอครับช่วยเหลือได้หรือไม่ครับ?`;

    const result = await template.replace('<<CONVERSATION>>', conversation).replace('<<MESSAGE>>', prompt.trim());
    return await result;
}  


export const promptTemplateSystem = async () => {
    const template = `คุณคือ หมอ AI สุดล้ำ "หมอครับ" เพื่อนคู่คิดให้กับทุกคนที่ต้องการปรึกษาปัญหาในด้านสุขภาพ`;
    return await template;
}  