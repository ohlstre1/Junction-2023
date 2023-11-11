import { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import ValidatedOutput, { SentenceData } from './ValidatedOutput';
import { Skeleton } from '@/components/ui/skeleton';
import './Content.scss';
import DisplaySource from './DisplaySource';
import DatabaseSideNav from './DatabaseSideNav';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { snakeCaseToWords } from './utils';

const Demo = () => {
    const [prompt, setPrompt] = useState('');
    const [fetchingResults, setFetchingResults] = useState(false);
    const [result, setResult] = useState<SentenceData[] | null>(null);
    const [selectedSource, setSelectedSource] = useState<SentenceData | null>(
        null
    );
    const [databaseNames, setDatabaseNames] = useState<string[]>([]);
    const [selectedDatabaseName, setSelectedDatabaseName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/sources');
                const names = response.data.map((d: any) => d.name)
                setDatabaseNames(names);
                setSelectedDatabaseName(names[0])
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrompt(e.target.value);
    };

    const sendPrompt = async () => {
        if (selectedDatabaseName === "" || prompt === "") {
            console.log("sendPrompt failed, one of the required fields were empty");
            return
        }
        try {
            setFetchingResults(true);
            // Assuming you have the selectedDatabaseName and prompt variables defined
            const requestData = {
                query: prompt,
                dataset: selectedDatabaseName,
            };

            const response = await axios.post('http://localhost:5000/openai_validate', requestData);

            // Do something with the response if needed
            console.log('Response from server:', response.data);
            setResult(response.data);
            setFetchingResults(false);

            // Continue with your logic
        } catch (error) {
            console.error('Error sending prompt:', error);
            // Handle the error as needed
        }
    };

    const clearResults = () => {
        setResult(null);
    };

    return (
        <>
            <div className="main-container">
                <DatabaseSideNav />
                <div className="content-container">
                    {!result ? (
                        <>
                            {!fetchingResults ? (
                                <div className="chat-container">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="w-full mb-3">
                                            <Button variant={"outline"} className="w-full">
                                                {snakeCaseToWords(selectedDatabaseName)}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {databaseNames.map((databaseName) => {
                                                return (
                                                    <DropdownMenuItem onClick={() => setSelectedDatabaseName(databaseName)}>{snakeCaseToWords(databaseName)}</DropdownMenuItem>
                                                )
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                            selectSource={(source: SentenceData) =>
                                setSelectedSource(source)
                            }
                        />
                    )}
                </div>
                {selectedSource && (
                    <DisplaySource
                        clear={() => {
                            setSelectedSource(null);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Demo;
