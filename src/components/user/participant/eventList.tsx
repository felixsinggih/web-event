'use client'

import { SyntheticEvent } from "react"
import { useRouter } from "next/navigation"

type Props = {
    slug: string,
    name: string,
    price: number,
    userEmail: string
}

function EventList({ slug, name, price, userEmail }: Props) {
    const router = useRouter()

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                slug: slug,
                email: userEmail
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

        // if (responseData.errors) {
        //     const errors = responseData.errors

        //     if (errors.name) {
        //         setError('name', {
        //             type: 'server',
        //             message: errors.name
        //         })
        //     } else if (errors.slug) {
        //         setError('slug', {
        //             type: 'server',
        //             message: errors.slug
        //         })
        //     } else if (errors.eventDate) {
        //         setError('eventDate', {
        //             type: 'server',
        //             message: errors.eventDate
        //         })
        //     } else if (errors.registrationStartDate) {
        //         setError('registrationStartDate', {
        //             type: 'server',
        //             message: errors.registrationStartDate
        //         })
        //     } else if (errors.registrationEndDate) {
        //         setError('registrationEndDate', {
        //             type: 'server',
        //             message: errors.registrationEndDate
        //         })
        //     } else if (errors.status) {
        //         setError('status', {
        //             type: 'server',
        //             message: errors.status
        //         })
        //     } else {
        //         alert('Something went wrong!')
        //     }
        // }
        // router.refresh()
        // router.push(`/admin/event/${responseData.event.id}`)
    }

    return (
        <div className="d-inline-block col-sm-12 col-md-6 col-lg-6 mb-4">
            <div className="card">
                <div className="card-body">
                    <div className="card-title d-flex">
                        <div className="flex-shrink-0">
                            <h4 className="card-title text-primary">{`${name}!`}</h4>
                        </div>
                    </div>
                    <span className="fw-medium d-block mb-1">Biaya Pendaftaran</span>
                    <h5 className="card-title mb-2">{price}</h5>
                    <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ratione maiores voluptatem quisquam perspiciatis asperiores? Numquam vero porro recusandae natus facere? Ipsa ipsam voluptate, cupiditate molestiae laudantium odio tenetur repellat?</p>

                    <div className='d-flex align-items-start justify-content-between'>
                        <p>&nbsp;</p>
                        <form onSubmit={onSubmit}>
                            <input type='hidden'></input>
                            <button type="submit" className="btn btn-outline-primary">Daftar Sekarang</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventList