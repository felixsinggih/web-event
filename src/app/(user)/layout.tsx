import Footer from '@/components/user/footer'
import Menu from '@/components/user/menu'
import Navbar from '@/components/user/navbar'
import '@/styles/user/css/demo.css'
import '@/styles/user/vendor/css/core.css'
import '@/styles/user/vendor/css/theme-default.css'
import '@/styles/user/vendor/fonts/boxicons.css'
import '@/styles/user/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import Script from 'next/script'

const publicSans = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'User Layout',
}

export default function UserRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* <html lang="en" className="light-style layout-menu-fixed layout-wide" dir="ltr" data-theme="theme-default"
             data-assets-path="/assets/user/" data-template="vertical-menu-template-free"> */}
            <head>
                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />

                {/* Page CSS */}

                {/* Helpers */}
                <Script src="/assets/user/vendor/js/helpers.js" />
                {/*! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section */}
                {/*? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  */}
                <Script src="/assets/user/js/config.js" />
            </head>
            <body className={publicSans.className}>
                {/* Layout wrapper */}
                <div className="layout-wrapper layout-content-navbar">
                    <div className="layout-container">
                        {/* Menu */}
                        <Menu />
                        {/* / Menu */}

                        {/* Layout container */}
                        <div className="layout-page">
                            {/* Navbar */}
                            <Navbar />
                            {/* / Navbar */}

                            {/* Content wrapper */}
                            <div className="content-wrapper">
                                {/* Content */}

                                <div className="container-fluid flex-grow-1 container-p-y">
                                    {/* Layout Demo */}
                                    {children}
                                    {/*/ Layout Demo */}
                                </div>
                                {/* / Content */}

                                {/* Footer */}
                                <Footer />
                                {/* / Footer */}

                                <div className="content-backdrop fade"></div>
                            </div>
                            {/* Content wrapper */}
                        </div>
                        {/* / Layout page */}
                    </div>

                    {/* Overlay */}
                    <div className="layout-overlay layout-menu-toggle"></div>
                </div>
                {/* / Layout wrapper */}

                {/* Core JS */}
                <Script src="/assets/user/vendor/js/core.js" />

                {/* Vendors JS */}

                {/* Main JS */}
                <Script src="/assets/user/js/main.js" />

                {/* Page JS */}

                {/* Place this tag in your head or just before your close body tag. */}
                <Script async defer src="https://buttons.github.io/buttons.js" />
            </body>
        </html>
    )
}
