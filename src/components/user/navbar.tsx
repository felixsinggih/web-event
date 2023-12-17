import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import SignOut from './signOut'
import Image from 'next/image'

async function Navbar() {
    const session = await getServerSession(authOptions)

    return (
        <nav
            className="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="#">
                    <i className="bx bx-menu bx-sm"></i>
                </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                {/* Search */}
                <div className="navbar-nav align-items-center">
                    <div className="nav-item d-flex align-items-center">
                        <i className="bx bx-search fs-4 lh-0"></i>
                        <input type="text" className="form-control border-0 shadow-none ps-1 ps-sm-2" placeholder="Search..."
                            aria-label="Search..." />
                    </div>
                </div>
                {/* /Search */}

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                    {/* User */}
                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <Image
                                    width={50} height={50} alt='avatar-image'
                                    src="/assets/user/img/avatars/1.png"
                                    className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <Image
                                                    width={50} height={50} alt='avatar image'
                                                    src="/assets/user/img/avatars/1.png"
                                                    className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-medium d-block">{session?.user.name}</span>
                                            <small className="text-muted">{session?.user.role}</small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-cog me-2"></i>
                                    <span className="align-middle">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <span className="d-flex align-items-center align-middle">
                                        <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                        <span className="flex-grow-1 align-middle ms-1">Billing</span>
                                        <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <SignOut />
                            </li>
                        </ul>
                    </li>
                    {/*/ User */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar