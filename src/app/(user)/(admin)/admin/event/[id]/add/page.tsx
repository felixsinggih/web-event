import { getEvent } from '@/lib/events'
import React from 'react'
import AddEventCategoryForm from './addEventCategoryForm'

type Params = {
    params: {
        id: string
    }
}

async function AddCategory({ params: { id } }: Params) {
    const eventData = getEvent(id)
    const event = await eventData

    return (
        <>
            <h4 className="py-3 mb-4">Add Event Category | {event?.name}</h4>
            <div className="row">
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-body">
                            <AddEventCategoryForm eventId={String(event?.id)} eventSlug={String(event?.slug)} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCategory