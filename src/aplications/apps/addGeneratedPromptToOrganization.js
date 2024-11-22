import prisma from "../../infrastructure/prismaClient.js"

const addGeneratedPromptToOrganization = async (organizationName, promptParams, generated, keywords) => {
    try {
        const _prompt = {
            tituloTrabajo: promptParams.tituloTrabajo,
            area: promptParams.area,
            ubicacion: promptParams.ubicacion,
            tipoEmpleo: promptParams.tipoEmpleo,
            responsabilidades: promptParams.responsabilidades,
            requisitos: promptParams.requisitos,
            beneficios: promptParams.beneficios,
            formato: promptParams.formato,
            keywords: keywords
        };

        const generatedPrompt = await prisma.generatedPrompt.create({
            data: {..._prompt,
                generated, 
                organization: {
                    connect:{
                        name: organizationName
                    }
                }
            },
        })

        return generatedPrompt
    } catch (err){
        throw new Error('Failed to save prompt')
    }
}

export default addGeneratedPromptToOrganization
