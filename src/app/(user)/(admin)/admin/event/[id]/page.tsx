import { getEvent } from '@/lib/events'
import Link from 'next/link'

type Params = {
    params: {
        id: string
    }
}

async function EventDetail({ params: { id } }: Params) {
    const eventData = getEvent(id)
    const event = await eventData

    const content = event?.eventCategory.map((category, index) => (
        <tr key={event.id}>
            <td>{index + 1}</td>
            <td>{category.name}</td>
            <td>{category.price}</td>
            <td>{category.status ? 'Aktif' : 'Non Aktif'}</td>
            <td>
                <div className="dropdown">
                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#"><i className="bx bx-edit-alt me-1"></i>
                            Edit</a>
                        <a className="dropdown-item" href="#"><i className="bx bx-trash me-1"></i>
                            Delete</a>
                    </div>
                </div>
            </td>
        </tr>
    ))

    return (
        <>
            <h4 className="py-3 mb-4">Event Detail</h4>
            <div className="row">
                <div className="col-xxl">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <Link href={`/admin/event/${id}/add`} className='btn btn-primary'>Add Event Category</Link>
                        </div>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Harga</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default EventDetail