import { useState, useEffect } from 'react';
import a from '../assets/home/a.jpg';
import b from '../assets/home/b.jpg';
import c from '../assets/home/c.jpg';

const HomeComponent = () => {
    const imagePaths = [a, b, c];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [imagePaths.length]);

    const handleDotClick = (index: any) => {
        setCurrentImageIndex(index);
    };

    const renderDots = () => {
        return imagePaths.map((_, index) => (
            <span
                key={index}
                style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer',
                    color: 'black',
                    backgroundColor: index === currentImageIndex ? 'black' : 'transparent',
                    border: '2px solid black',
                    borderRadius: '50%',
                    display: 'inline-block',
                    margin: '0 10px',
                }}
                onClick={() => handleDotClick(index)} // Handle dot click event
            />
        ));
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            {imagePaths.map((imagePath, index) => (
                <div key={index} style={{ display: index === currentImageIndex ? 'block' : 'none', position: 'relative' }}>
                    <img src={imagePath} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
                </div>
            ))}
            <div style={{ position: 'absolute', bottom: '10px', width: '100%', display: 'flex', justifyContent: 'center' }}>{renderDots()}</div>
        </div>
    );
};

export default HomeComponent;
