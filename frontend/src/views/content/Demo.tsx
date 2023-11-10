import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button';
import ValidateOutput, { OutputData, SentenceData } from './ValidatedOutput';
import dummy from './dummy.json'
import './Content.scss';

const Demo = () => {
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState<SentenceData[] | null>(null);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    }

    const sendPrompt = () => {
        if (dummy) {
            setResult(dummy);
        }

    }

    return (
        <>
            <div className='main-container'>
                {!result ?
                    < div className='chat-container'>
                        <Textarea rows={10} placeholder="Type your message here." value={prompt} onChange={(e) => handlePromptChange(e)} />
                        <Button className="float-right mt-3" onClick={sendPrompt} disabled={prompt === ""}>Send</Button>
                    </div>
                    :
                    <ValidateOutput data={result} />
                }


            </div >
        </>
    );
};

export default Demo;
