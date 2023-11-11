import { Button } from '@/components/ui/button';
import { SentenceData } from './ValidatedOutput';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react';

export interface DisplaySourceData {
    data: SentenceData;
    clear: () => void;
}

const DisplaySource = ({ data, clear }: DisplaySourceData) => {
    const [selectedDocIndex, setSelectedDocIndex] = useState(0)

    useEffect(() => {
        setSelectedDocIndex(0);
    }, [data])

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
                <p className='mb-3'>
                    {data.docs[selectedDocIndex].content}
                </p>
                <Button onClick={() => clear()}>Close</Button>
            </div>
        </div>
    );
};

export default DisplaySource;
