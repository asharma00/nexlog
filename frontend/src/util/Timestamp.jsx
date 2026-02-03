import { useState, useEffect } from 'react';

function timeAgo(postedDate) {
    const now = new Date();
    const posted = new Date(postedDate);
    const seconds = Math.floor((now - posted) / 1000);

    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    for (let interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
}


export default function Timestamp({ savedTimestamp }) {
    const [timeAgoString, setTimeAgoString] = useState(timeAgo(savedTimestamp));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgoString(timeAgo(savedTimestamp));
        }, 30000);

        return () => clearInterval(interval);
    }, [savedTimestamp]);

    return (
        <span>{timeAgoString}</span>
    );
}