import LikeButton from './LikeButton';
import './App.css';

export default function App() {
    const NUM = 999;

    return (
        <main className='container'>
            {Array.from({ length: NUM }).map((_, i) => (
                <LikeButton key={i} />
            ))}
        </main>
    );
}
