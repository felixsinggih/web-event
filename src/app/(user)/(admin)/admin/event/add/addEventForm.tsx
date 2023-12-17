'use client'

import { addEventSchema, TAddEventSchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

function AddEventForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<TAddEventSchema>({
        resolver: zodResolver(addEventSchema)
    })
    const router = useRouter()

    const onSubmit = async (data: TAddEventSchema) => {
        const response = await fetch('/api/event', {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                slug: data.slug,
                eventDate: data.eventDate,
                registrationStartDate: data.registrationStartDate,
                registrationEndDate: data.registrationEndDate,
                status: data.status
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
            } else if (errors.slug) {
                setError('slug', {
                    type: 'server',
                    message: errors.slug
                })
            } else if (errors.eventDate) {
                setError('eventDate', {
                    type: 'server',
                    message: errors.eventDate
                })
            } else if (errors.registrationStartDate) {
                setError('registrationStartDate', {
                    type: 'server',
                    message: errors.registrationStartDate
                })
            } else if (errors.registrationEndDate) {
                setError('registrationEndDate', {
                    type: 'server',
                    message: errors.registrationEndDate
                })
            } else if (errors.status) {
                setError('status', {
                    type: 'server',
                    message: errors.status
                })
            } else {
                alert('Something went wrong!')
            }
        }
        router.refresh()
        router.push(`/admin/event/${responseData.data.id}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input
                        {...register('name')}
                        type="text"
                        className={`form-control ${errors.name && 'is-invalid'}`}
                        placeholder="Event Name" />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {`${errors.name.message}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Slug</label>
                <div className="col-sm-10">
                    <input
                        {...register('slug')}
                        type="text"
                        className={`form-control ${errors.slug && 'is-invalid'}`}
                        placeholder="Slug" />
                    {errors.slug && (
                        <div className="invalid-feedback">
                            {`${errors.slug.message}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Tanggal Pelaksanaan</label>
                <div className="col-sm-10">
                    <input
                        {...register('eventDate')}
                        className={`form-control ${errors.eventDate && 'is-invalid'}`}
                        type="datetime-local" />
                    {errors.eventDate && (
                        <div className="invalid-feedback">
                            {`${errors.eventDate.message}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Tanggal Pendaftaran</label>
                <div className="col-sm-5">
                    <input
                        {...register('registrationStartDate')}
                        className={`form-control ${errors.registrationStartDate && 'is-invalid'}`}
                        type="date" />
                    {errors.registrationStartDate && (
                        <div className="invalid-feedback">
                            {`${errors.registrationStartDate.message}`}
                        </div>
                    )}
                </div>
                <div className="col-sm-5">
                    <input
                        {...register('registrationEndDate')}
                        className={`form-control ${errors.registrationEndDate && 'is-invalid'}`}
                        type="date" />
                    {errors.registrationEndDate && (
                        <div className="invalid-feedback">
                            {`${errors.registrationEndDate.message}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                    <select
                        {...register('status')}
                        className={`form-select ${errors.status && 'is-invalid'}`}
                        required>
                        <option selected disabled>Pilih Status</option>
                        <option value="1">Aktif</option>
                        <option value="0">Non Aktif</option>
                    </select>
                    {errors.status && (
                        <div className="invalid-feedback">
                            {`${errors.status.message}`}
                        </div>
                    )}
                </div>
            </div>
            <div className="row justify-content-end">
                <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </div>
        </form>
    )
}

export default AddEventForm