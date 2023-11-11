import { Button } from '@/components/ui/button';
import { SentenceData } from './ValidatedOutput';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';
import axios from 'axios';

export interface DisplaySourceData {
    data: SentenceData;
    clear: () => void;
}

const DisplaySource = ({ data, clear }: DisplaySourceData) => {
    const [selectedDocIndex, setSelectedDocIndex] = useState(0);
    const [highlightSentence, setHighlightSentence] = useState("");
    const [beforeHightlight, setBeforeHightlight] = useState("");
    const [currentHightlight, setCurrentHightlight] = useState("");
    const [afterHightlight, setAfterHightlight] = useState("");


    useEffect(() => {
        similarSentence();
    }, [selectedDocIndex])

    useEffect(() => {
        if (selectedDocIndex === 0) {
            similarSentence();
        }
        setSelectedDocIndex(0);
    }, [data])

    const similarSentence = async () => {
        const reqData = {
            sentence: data.sentence,
            content: data.docs[selectedDocIndex].content,
        }

        try {
            const response = await axios.post("http://localhost:5000/similar_sentence", reqData);
            setHighlightSentence(response.data.similar_sentence);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useEffect(() => {
        const highlightText = (targetElementId: string, searchText: string): void => {
            const targetElement = document.getElementById(targetElementId);

            if (targetElement) {
                const textContent = targetElement.textContent || "";
                const highlightedText = textContent.replace(new RegExp(searchText, 'gi'), match => `<span class="highlight">${match}</span>`);
                targetElement.innerHTML = highlightedText;
            }
        }
        highlightText("displaySourceDocContent", highlightSentence);
    }, [highlightSentence])

    return (
        <div className="source-container">
            <div className="relative">
                {/* <h3 className='mb-3'>Selected Sentence: {data.sentence}</h3> */}
                <DropdownMenu>
                    <DropdownMenuTrigger className="w-full mb-3">
                        <Button variant={"outline"} className="w-full">
                            {`Doc ${selectedDocIndex}`}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {data.docs.map((doc, index) => {
                            return (
                                <DropdownMenuItem
                                    className='cursor-pointer'
                                    key={index}
                                    onClick={() => setSelectedDocIndex(index)}
                                >{`Doc ${index}`}</DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <h3 className='mb-3'>Similarity score: <b>{`${((1 - parseFloat(data.docs[selectedDocIndex].distance)) * 100).toFixed(2)}%`}</b></h3>
                <p id="displaySourceDocContent" className='mb-3'>
                    {data.docs[selectedDocIndex].content}
                </p>
                <Button onClick={() => clear()}>Close</Button>
            </div>
        </div>
    );
};

export default DisplaySource;
