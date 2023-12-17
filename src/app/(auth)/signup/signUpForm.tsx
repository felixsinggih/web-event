'use client'

import { signUpSchema, TSignUpSchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<TSignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: TSignUpSchema) => {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
                confirmPassword: data.confirmPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const responseData = await response.json()

        if (!response.ok) {
            alert(responseData.message)
            return
        }

        if (responseData.errors) {
            const errors = responseData.errors

            if (errors.name) {
                setError('name', {
                    type: 'server',
                    message: errors.name
                })
            } else if (errors.email) {
                setError('email', {
                    type: 'server',
                    message: errors.email
                })
            } else if (errors.phoneNumber) {
                setError('phoneNumber', {
                    type: 'server',
                    message: errors.phoneNumber
                })
            } else if (errors.password) {
                setError('password', {
                    type: 'server',
                    message: errors.password
                })
            } else if (errors.confirmPassword) {
                setError('confirmPassword', {
                    type: 'server',
                    message: errors.confirmPassword
                })
            } else {
                alert('Something went wrong!')
            }
        }

        router.refresh()
        router.push('/signin')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input
                    {...register('name')}
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="Masukan nama lengkap anda" />
                {errors.name && (
                    <div className="invalid-feedback">
                        {`${errors.name.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="text"
                    {...register('email')}
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    placeholder="Masukan email anda" />
                {errors.email && (
                    <div className="invalid-feedback">
                        {`${errors.email.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">No Handphone</label>
                <input
                    {...register('phoneNumber')}
                    type="text"
                    className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                    placeholder="Masukan nama lengkap anda" />
                {errors.phoneNumber && (
                    <div className="invalid-feedback">
                        {`${errors.phoneNumber.message}`}
                    </div>
                )}
            </div>
            <div className="mb-3 form-password-toggle">
                <label className="form-label">Password</label>
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
            <div className="mb-3 form-password-toggle">
                <label className="form-label">Konfirmasi Password</label>
                <div className="input-group input-group-merge">
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                        aria-describedby="password" />
                    <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">
                            {`${errors.confirmPassword.message}`}
                        </div>
                    )}
                </div>
            </div>

            <button className="btn btn-primary d-grid w-100">Daftar Sekarang</button>
        </form>
    )
}

export default SignUpForm