'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

function MenuAdmin() {
    const pathname = usePathname()

    return (
        <ul className="menu-inner py-1">
            {/* Menu */}
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Menu</span></li>

            {/* Dashboard */}
            <li className={`menu-item ${(pathname === '/admin' || pathname === '/admin/dashboard') && 'active'}`}>
                <Link href="/admin" className="menu-link">
                    <i className="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Dashboard">Dashboard</div>
                </Link>
            </li>

            {/* Event */}
            <li className={`menu-item ${pathname.startsWith('/admin/event') && 'active'}`}>
                <Link href="/admin/event" className="menu-link">
                    <i className="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Event">Event</div>
                </Link>
            </li>

            {/* Layouts */}
            <li className="menu-item active open">
                <a href="#" className="menu-link menu-toggle">
                    <i className="menu-icon tf-icons bx bx-layout"></i>
                    <div data-i18n="Layouts">Admin</div>
                </a>
                <ul className="menu-sub">
                    <li className="menu-item active">
                        <a href="layouts-fluid.html" className="menu-link">
                            <div data-i18n="Fluid">Fluid</div>
                        </a>
                    </li>
                </ul>
            </li>


        </ul>
    )
}

export default MenuAdmin