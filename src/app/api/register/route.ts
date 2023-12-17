import prisma from "@/lib/db"
import { NextResponse } from "next/server"
import { Invoice as InvoiceClient, Xendit } from "xendit-node"
import { now } from "next-auth/client/_utils"
import { CreateInvoiceRequest, Invoice } from 'xendit-node/invoice/models'

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_API_KEY as string })
const { Invoice } = xenditClient

const xenditInvoiceClient = new InvoiceClient({ secretKey: process.env.XENDIT_API_KEY as string })

export async function POST(req: Request) {
    const body = await req.json()

    // const result = signUpSchema.safeParse(body)
    // const { name, email, phoneNumber, password, confirmPassword } = signUpSchema.parse(body)
    // let zodErrors = {}
    // if (!result.success) {
    //     result.error.issues.forEach((issue) => {
    //         zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
    //     })
    // }

    // cek user 
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })
    if (!user) {
        return NextResponse.json(
            { data: null, message: "User tidak ditemukan!" },
            { status: 409 }
        )
    }

    // cek event category
    const eventCategory = await prisma.eventCategory.findFirst({
        where: {
            slug: body.slug,
            status: true
        }, include: {
            event: true
        }
    })
    if (!eventCategory) {
        return NextResponse.json(
            { data: null, message: "Event tidak ditemukan!" },
            { status: 409 }
        )
    }

    // cek active invoice user
    const activeInvoiceByUser = await prisma.invoice.findFirst({
        where: {
            userId: user.id,
            eventCategoryId: eventCategory.id,
            isPaid: 0
        }
    })
    if (activeInvoiceByUser) {
        return NextResponse.json(
            { data: null, message: "Anda memiliki invoice yang belum dibayar!" },
            { status: 409 }
        )
    }

    // cek active event yang diikuti user
    const activeEventParticipant = await prisma.invoice.findFirst({
        where: {
            userId: user.id,
            eventCategoryId: eventCategory.id,
            isPaid: 1
        }
    })
    if (activeEventParticipant) {
        return NextResponse.json(
            { data: null, message: "Anda hanya dapat mendaftar satu kali!" },
            { status: 409 }
        )
    }

    // buat invoice xendit
    const data: CreateInvoiceRequest = {
        "externalId": `${process.env.XENDIT_EXTERNAL_ID}${Number(new Date(now()))}`,
        "amount": eventCategory.price,
        "payerEmail": user.email,
        "description": `Pembayaran ${eventCategory.event.name} ${eventCategory.name} a.n ${user.name}`,
        "currency": "IDR"
    }
    const xenditResponse: Invoice = await xenditInvoiceClient.createInvoice({ data })
    if (!xenditResponse.id) {
        return NextResponse.json(
            { data: null, message: "Gagal membuat invoice!" },
            { status: 409 }
        )
    }

    // buat invoice
    const [newInvoice] = await prisma.$transaction([
        prisma.invoice.create({
            data: {
                userId: user.id,
                eventCategoryId: eventCategory.id,
                xenditExternalId: xenditResponse.externalId,
                xenditId: xenditResponse.id,
                xenditUrl: xenditResponse.invoiceUrl,
                isPaid: 0
            }
        })
    ])

    return NextResponse.json(
        // Object.keys(zodErrors).length > 0
        //     ? { errors: zodErrors }
        //     : { invoice: newInvoice, message: "User created successfully" }, { status: 201 }

        { data: newInvoice, message: "Invoice created successfully" }, { status: 201 }
    )
}