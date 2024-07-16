import '../styles/layout.scss'
import Footer from "@/components/footer/Footer";

export default function Layout({children}: { children: React.ReactNode }) {
    return (
        <div className='public-layout'>
            <header>

            </header>
            <main>
                {children}
            </main>
        </div>
    )
}