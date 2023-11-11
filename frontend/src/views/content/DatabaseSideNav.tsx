import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react";
import dummy from './dummy2.json';

type DatabaseSource = {
    name: string;
    source: string;
    docType: string;
};

type DatabaseData = {
    name: string;
    sources: DatabaseSource[];
};

const DatabaseSideNav = () => {
    const [databases, setDatabases] = useState<DatabaseData[]>(dummy)

    const snakeCaseToWords = (input: string): string => {
        const words = input.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }

    return (
        <div className="left-sidebar-container">
            <h2 className="mt-3 mb-2 px-4 text-lg font-semibold tracking-tight">
                Databases
            </h2>
            <div className="space-y-1 p-2">
                {databases.map((database, index) => (
                    <Collapsible>
                        <CollapsibleTrigger asChild key={database.name}>
                            <Button className="w-full justify-start">{snakeCaseToWords(database.name)}</Button>
                        </CollapsibleTrigger>
                        {database.sources.map((source) => {
                            return (
                                <CollapsibleContent className="ml-3" key={source.name}>
                                    <Button variant="outline" size="sm" className="w-full justify-start">{snakeCaseToWords(source.name)}</Button>
                                </CollapsibleContent>
                            )
                        })}

                    </Collapsible>
                    // <Button
                    //     key={index}
                    //     variant="ghost"
                    //     // className={`w-full justify-between font-normal ${imageName === labelDrawerStore.selectedImage
                    //     //     ? 'bg-accent'
                    //     //     : ''
                    //     //     }`}
                    //     className={`w-full justify-between font-normal`}
                    // // onClick={() => handleImageSelection(imageName)}
                    // >
                    //     {database.name}
                    // </Button>
                ))}
            </div>
        </div>
    )
}

export default DatabaseSideNav;