import { signUpSchema } from "@/lib/formSchema"
import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/lib/db"

export async function POST(req: Request) {
    const body = await req.json()

    const result = signUpSchema.safeParse(body)
    const { name, email, phoneNumber, password, confirmPassword } = signUpSchema.parse(body)
    let zodErrors = {}
    if (!result.success) {
        result.error.issues.forEach((issue) => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })
    }

    // cek email yang sudah ada 
    const existUserByEmail = await prisma.user.findUnique({
        where: { email }
    })
    if (existUserByEmail) {
        return NextResponse.json(
            { data: null, message: "Email sudah digunakan oleh pengguna lain!" },
            { status: 409 }
        )
    }

    // cek email yang sudah ada 
    const existUserByPhone = await prisma.userDetail.findUnique({
        where: { phoneNumber }
    })
    if (existUserByPhone) {
        return NextResponse.json(
            { data: null, message: "No Handphone sudah digunakan oleh pengguna lain!" },
            { status: 409 }
        )
    }

    // buat user baru
    const hashedPassword = await hash(password, 10)
    const [newUser] = await prisma.$transaction([
        prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'Participant',
                userDetail: {
                    create: {
                        phoneNumber
                    }
                }
            },
            include: { userDetail: true }
        })
    ])
    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
        Object.keys(zodErrors).length > 0
            ? { errors: zodErrors }
            : { data: rest, message: "User created successfully" }, { status: 201 }
    )
}