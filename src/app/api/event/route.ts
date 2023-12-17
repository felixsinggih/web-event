import prisma from "@/lib/db"
import { addEventSchema } from "@/lib/formSchema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()

    const result = addEventSchema.safeParse(body)
    const { name, slug, eventDate, registrationStartDate, registrationEndDate, status } = addEventSchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    const existEventBySlug = await prisma.event.findUnique({
        where: { slug }
    })
    if (existEventBySlug) {
        return NextResponse.json(
            { data: null, message: "Slug sudah digunakan!" },
            { status: 409 }
        )
    }

    const [newEvent] = await prisma.$transaction([
        prisma.event.create({
            data: {
                name,
                slug,
                eventDate: new Date(eventDate),
                registrationStartDate: new Date(registrationStartDate),
                registrationEndDate: new Date(registrationEndDate),
                status: Boolean(Number(status))
            },
        })
    ])

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { data: newEvent, message: "Event created successfully" }, { status: 201 }
    )
}