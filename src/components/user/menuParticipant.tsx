'use client'

import { usePathname } from 'next/navigation'

function MenuParticipant() {
    const pathname = usePathname()

    return (
        <ul className="menu-inner py-1">
            {/* Menu */}
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Menu</span></li>

            {/* Dashboard */}
            <li className={`menu-item ${pathname === '/dashboard' && 'active'}`}>
                <a href="/dashboard" className="menu-link">
                    <i className="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Dashboard">Dashboard</div>
                </a>
            </li>


        </ul>
    )
}

export default MenuParticipant