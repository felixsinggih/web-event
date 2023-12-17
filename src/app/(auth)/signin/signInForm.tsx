'use client'

import { signInSchema, TSignInSchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

function SignInForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInSchema>({
        resolver: zodResolver(signInSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: TSignInSchema) => {
        const signInData = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (signInData?.error) {
            // toast({
            //     title: "Error!",
            //     description: "Oops, something went wrong!",
            //     variant: 'destructive'
            // })
            alert("Email/password salah!")
        } else {
            router.refresh()
            router.push('/dashboard')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    {...register('email')}
                    type="text"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    placeholder="Enter your email" />
                {errors.email && (
                    <div className="invalid-feedback">
                        {`${errors.email.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3 form-password-toggle">
                <label className="form-label" >Password</label>
                <div className="input-group input-group-merge">
                    <input
                        {...register('password')}
                        type="password"
                        className={`form-control ${errors.password && 'is-invalid'}`}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password" />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    {errors.password && (
                        <div className="invalid-feedback">
                            {`${errors.password.message}`}
                        </div>
                    )}
                </div>
            </div>

            <button className="btn btn-primary d-grid w-100">Login</button>
        </form>
    )
}

export default SignInForm