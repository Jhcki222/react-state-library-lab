import { useEffect, useState } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db } from './firebase';

const likeRef = ref(db, 'like');

export default function LikeButton() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const unsubscribe = onValue(likeRef, (snapshot) => {
            setCount(snapshot.val() || 0);
        });

        return () => unsubscribe();
    }, []);

    const handleClick = () => {
        runTransaction(likeRef, (current) => (current || 0) + 1);
    };

    return (
        <div className='like-card'>
            <h2>{count} people liked me 😁</h2>
            <button onClick={handleClick}>❤️ Like</button>
        </div>
    );
}
