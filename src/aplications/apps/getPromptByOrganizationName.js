import prisma from "../../infrastructure/prismaClient.js"

const getPromptByOrganizationName = async (organizationName) => {
    try {
        const organization = await prisma.organization.findUnique({
            where: {
                name: organizationName
            }
        })

        const prompt = organization.currentPrompt || undefined

        return prompt
    } catch (err){
        throw new Error('failed find prompt')
    }
}

export default getPromptByOrganizationName
