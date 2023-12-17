import prisma from "./db"

export async function getEvents() {
    const res = await prisma.event.findMany({
        select: {
            id: true,
            name: true,
            eventDate: true,
            registrationStartDate: true,
            registrationEndDate: true,
            status: true
        }
    })
    return res
}

export async function getEvent(id: string) {
    const res = await prisma.event.findUnique({
        where: { id: Number(id) },
        select: {
            id: true,
            name: true,
            slug: true,
            eventDate: true,
            registrationStartDate: true,
            registrationEndDate: true,
            status: true,
            eventCategory: {
                select: {
                    id: true,
                    name: true,
                    price: true,
                    status: true
                }
            }
        }
    })
    return res
}

export async function activeEvent() {
    const res = await prisma.event.findFirst({
        where: { status: Boolean(1) },
        select: {
            id: true,
            name: true,
            eventDate: true,
            registrationStartDate: true,
            registrationEndDate: true,
            status: true,
            eventCategory: {
                select: {
                    // id: true,
                    name: true,
                    slug: true,
                    price: true,
                    status: true
                }
            }
        }
    })
    return res
}