import {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import ValidateOutput, {SentenceData} from './ValidatedOutput';
import {Skeleton} from '@/components/ui/skeleton';
import dummy from './dummy.json';
import './Content.scss';

const Demo = () => {
    const [prompt, setPrompt] = useState('');
    const [fetchingResults, setFetchingResults] = useState(false);
    const [result, setResult] = useState<SentenceData[] | null>(null);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const sendPrompt = () => {
        setFetchingResults(true);
        setTimeout(() => {
            if (dummy) {
                setResult(dummy);
                setFetchingResults(false);
            }
        }, 2000);
    };

    const clearResults = () => {
        setResult(null);
    };

    return (
        <>
            <div className="main-container">
                {!result ? (
                    <>
                        {!fetchingResults ? (
                            <div className="chat-container">
                                <Textarea
                                    rows={10}
                                    placeholder="Type your message here."
                                    value={prompt}
                                    onChange={(e) => handlePromptChange(e)}
                                />
                                <Button
                                    className="float-right mt-3"
                                    onClick={sendPrompt}
                                    // disabled={prompt === ""}
                                >
                                    Send
                                </Button>
                            </div>
                        ) : (
                            <Skeleton className="fetching-skeleton" />
                        )}
                    </>
                ) : (
                    <ValidateOutput
                        data={result}
                        clear={clearResults}
                    />
                )}
            </div>
        </>
    );
};

export default Demo;
