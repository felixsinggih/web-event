'use client'
import { signOut } from "next-auth/react"

function SignOut() {
    return (
        <button
            onClick={() => signOut({
                redirect: true,
                callbackUrl: `/signin`
            })}
            className="dropdown-item">
            <i className="bx bx-power-off me-2"></i>
            <span className="align-middle">Log Out</span>
        </button>
    )
}

export default SignOut