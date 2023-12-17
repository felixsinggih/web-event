'use client'

import { addEventCategorySchema, TAddEventCategorySchema } from "@/lib/formSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

type Props = {
    eventId: string,
    eventSlug: string
}

function AddEventCategoryForm({ eventId, eventSlug }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm<TAddEventCategorySchema>({
        resolver: zodResolver(addEventCategorySchema)
    })
    const router = useRouter()

    const onSubmit = async (data: TAddEventCategorySchema) => {
        const response = await fetch(`/api/event/category`, {
            method: 'POST',
            body: JSON.stringify({
                eventId: eventId,
                name: data.name,
                slug: data.slug,
                price: data.price,
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
            } else if (errors.price) {
                setError('price', {
                    type: 'server',
                    message: errors.price
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
        router.push(`/admin/event/${eventId}`)
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
                        defaultValue={eventSlug}
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
                <label className="col-sm-2 col-form-label">Harga</label>
                <div className="col-sm-10">
                    <input
                        {...register('price')}
                        type="text"
                        className={`form-control ${errors.price && 'is-invalid'}`}
                        placeholder="Harga" />
                    {errors.price && (
                        <div className="invalid-feedback">
                            {`${errors.price.message}`}
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

export default AddEventCategoryForm