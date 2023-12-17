import type { Metadata } from 'next'
import Script from 'next/script'

import '@/styles/user/vendor/fonts/boxicons.css'
import '@/styles/user/vendor/css/core.css'
import '@/styles/user/vendor/css/theme-default.css'
import '@/styles/user/css/demo.css'
import '@/styles/user/vendor/libs/perfect-scrollbar/perfect-scrollbar.css'
import '@/styles/user/vendor/css/pages/page-auth.css'
import { Public_Sans } from 'next/font/google'

const publicSans = Public_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Auth Layout',
}

export default function AuthRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            {/* <html lang="en" className="light-style layout-wide customizer-hide" dir="ltr" data-theme="theme-default"
            data-assets-path="/assets/user/" data-template="vertical-menu-template-free"> */}

            <head>
                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />

                {/* Helpers */}
                <Script src="/assets/user/vendor/js/helpers.js"></Script>
                {/*! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section */}
                {/*? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  */}
                <Script src="/assets/user/js/config.js"></Script>
            </head>

            <body className={publicSans.className}>
                {/* Content */}
                {children}
                {/* / Content */}

                {/* Core JS */}
                <Script src="/assets/user/vendor/js/core.js"></Script>

                {/* Vendors JS */}

                {/* Main JS */}
                <Script src="/assets/user/js/main.js"></Script>

                {/* Page JS */}

                {/* Place this tag in your head or just before your close body tag. */}
                <Script async defer src="https://buttons.github.io/buttons.js"></Script>
            </body>

        </html>
    )
}
