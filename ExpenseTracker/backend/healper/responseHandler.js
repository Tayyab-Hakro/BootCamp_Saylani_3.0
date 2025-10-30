
const responseHandler = ()=>{


}

// const DocmentnNOtfound()=>{}

const sendSucess =  (res,data,status)=>{

    res.json({
        status : 200,
        data,
        message: "operation completed Successfully"
    })
}


const ZodValidation = zod.object({})