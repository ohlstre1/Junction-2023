import {useState} from 'react';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import ValidatedOutput, {SentenceData} from './ValidatedOutput';
import {Skeleton} from '@/components/ui/skeleton';
import dummy from './dummy.json';
import './Content.scss';
import DisplaySource from './DisplaySource';

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
                <div className="content-container">
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
                                        className="float-right mt-3 pb-3 "
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
                        <ValidatedOutput
                            data={result}
                            clear={clearResults}
                        />
                    )}
                </div>
                <DisplaySource />
            </div>
        </>
    );
};

export default Demo;
