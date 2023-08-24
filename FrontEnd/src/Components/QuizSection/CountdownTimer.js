import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ duration, onTimeUp }) => {
    const [seconds, setSeconds] = useState(duration);

    useEffect(() => {
        let intervalId = null;

        if (seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
        } else {
            onTimeUp();
        }

        return () => clearInterval(intervalId);
    }, [seconds, onTimeUp]);

    const displayTime = () => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return ` ${minutes} min : ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} secs `;
    };

    return (
        // <div>{displayTime()}</div>
        <span id="time" className="text-danger">{displayTime()}</span>
    );
};

export default CountdownTimer;
