import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from '@/components/ui/button';

const Demo = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className='h-screen flex items-center justify-center'>
                <Button>Test</Button>
            </div>
        </>
    );
};

export default Demo;
