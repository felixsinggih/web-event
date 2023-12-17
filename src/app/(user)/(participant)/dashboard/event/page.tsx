import EventList from "@/components/user/participant/eventList"
import { authOptions } from "@/lib/auth"
import { activeEvent } from "@/lib/events"
import { getServerSession } from "next-auth"

async function Event() {
    const session = await getServerSession(authOptions)
    const eventData = activeEvent()
    const event = await eventData

    const eventCategory = event?.eventCategory.map((category) => (
        category.status && <EventList
            key={category.slug}
            slug={category.slug}
            name={category.name}
            price={category.price}
            userEmail={String(session?.user.email)}
        />
    ))

    return (
        <>
            {event && <h4 className="py-3 mb-4">{event.name}</h4>}
            <div className="row">
                {event ? (
                    eventCategory
                ) : (
                    <div className="col-12 mb-4">
                        <div className="alert alert-danger" role="alert">
                            <h5 className="card-title text-danger mb-3">Maaf, tidak ada event yang sedang berlangsung!</h5>
                            <p className="mb-1">
                                Silahkan kembali lagi nanti jika sudah ada event.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Event