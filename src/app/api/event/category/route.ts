import prisma from "@/lib/db"
import { addEventCategorySchema } from "@/lib/formSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    const result = addEventCategorySchema.safeParse(body)
    const { name, slug, price, status } = addEventCategorySchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    const checkEvent = await prisma.event.findUnique({
        where: { id: Number(body.eventId) }
    })
    if (!checkEvent) {
        return NextResponse.json(
            { data: null, message: "Event tidak ada!" },
            { status: 409 }
        )
    }

    const existEventCategoryBySlug = await prisma.eventCategory.findUnique({
        where: { slug }
    })
    if (existEventCategoryBySlug) {
        return NextResponse.json(
            { data: null, message: "Slug sudah digunakan!" },
            { status: 409 }
        )
    }

    const [newEventCategory] = await prisma.$transaction([
        prisma.eventCategory.create({
            data: {
                eventId: Number(body.eventId),
                name,
                slug,
                price: Number(price),
                status: Boolean(Number(status))
            },
        })
    ])

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { data: newEventCategory, message: "Event category created successfully" }, { status: 201 }
    )
}