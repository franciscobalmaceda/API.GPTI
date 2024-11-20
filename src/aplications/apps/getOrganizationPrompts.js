import prisma from "../../infrastructure/prismaClient.js"

const getOrganizationPrompts = async (organizationName) => {
    try {
        const prompts = await prisma.generatedPrompt.findMany({
            take: 10,
            where: {
                organization:{
                    name: organizationName
                }
            }
        })

        return prompts
    } catch (err){
        throw new Error('failed find prompt')
    }
}

export default getOrganizationPrompts
