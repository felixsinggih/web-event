import React from 'react'
import AddEventForm from './addEventForm'

function AddEvent() {
    return (
        <>
            <h4 className="py-3 mb-4">Add Event</h4>
            <div className="row">
                <div className="col-xxl">
                    <div className="card mb-4">
                        <div className="card-body">
                            <AddEventForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEvent