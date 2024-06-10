import Link from 'next/link'
import Content from '@/components/layouts/Content';

export default function NotFound() {
    return (
        <Content typeView={'fullScreen'}>
            <div className='flex flex-column'>
                <h1>Страница не найдена</h1>
                <p>Не удалось получить доступ к этой странице</p>
                <Link href="/">Вернуться на главную</Link>
            </div>
        </Content>
    )
}