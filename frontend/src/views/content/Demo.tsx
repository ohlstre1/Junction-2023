import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import './Content.scss';

const Demo = () => {
    const [prompt, setPrompt] = useState("");

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const sendPrompt = () => {
        window.alert(prompt);
    }

    return (
        <>
            <div className='main-container'>
                <div className='chat-container'>
                    <Textarea rows={10} placeholder="Type your message here." value={prompt} onChange={(e) => handlePromptChange(e)} />
                    <Button className="float-right mt-3" onClick={sendPrompt} disabled={prompt === ""}>Send</Button>
                </div>
            </div>
        </>
    );
};

export default Demo;
