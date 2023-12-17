import { getEvents } from '@/lib/events'
import Link from 'next/link'

async function EventPage() {
    const eventsData = getEvents()
    const events = await eventsData

    const content = events.map((event, index) => (
        <tr key={event.id}>
            <td>{index + 1}</td>
            <td>{event.name}</td>
            <td>{event.eventDate.toLocaleString()}</td>
            <td>{event.registrationStartDate.toLocaleDateString()} s.d {event.registrationEndDate.toLocaleDateString()}</td>
            <td>{event.status ? 'Aktif' : 'Non Aktif'}</td>
            <td>
                <div className="dropdown">
                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" href={`/admin/event/${event.id}`}><i className="bx bx-info-circle me-1"></i>
                            Detail</Link>
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
            <h4 className="py-3 mb-4">Event List</h4>
            <div className="row">
                <div className="col-xxl">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <Link href="/admin/event/add" className='btn btn-primary'>Add Event</Link>
                        </div>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Event</th>
                                        <th>Tanggal Pelaksanaan</th>
                                        <th>Tanggal Pendaftaran</th>
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

export default EventPage

export const revalidate = 0