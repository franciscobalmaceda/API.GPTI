import prisma from "../../infrastructure/prismaClient.js"

const updateOrganizationPromptByName = async (organizationName, newContext) => {
    try {
        const organization = await prisma.organization.update({
            where: {
                name: organizationName
            },
            data: {
                currentPrompt: newContext || null
              },
        })

        return organization
    } catch (err){
        throw new Error('failed find prompt')
    }
}

export default updateOrganizationPromptByName
