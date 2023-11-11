import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react";
import dummy from './dummy2.json';
import { ChevronDown, ChevronUp } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@radix-ui/react-label";

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
    const [selectedDatabaseNames, setSelectedDatabaseNames] = useState<string[]>([]);

    const snakeCaseToWords = (input: string): string => {
        const words = input.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    }

    const updateSelectedDatabaseName = (name: string) => {
        // Check if the name is already in the list
        const isNameSelected = selectedDatabaseNames.includes(name);

        // If the name is already selected, remove it; otherwise, add it
        if (isNameSelected) {
            // Remove the name from the list
            setSelectedDatabaseNames(selectedDatabaseNames.filter(n => n !== name));
        } else {
            // Add the name to the list
            setSelectedDatabaseNames([...selectedDatabaseNames, name]);
        }
    }

    return (
        <div className="left-sidebar-container">
            <div className="left-sidebar-content">
                <h2 className="mt-3 mb-2 px-4 text-lg font-semibold tracking-tight">
                    Your Data:
                </h2>
                <div className="space-y-1 p-2">
                    {databases.map((database) => (
                        <Collapsible>
                            <CollapsibleTrigger asChild key={database.name}>
                                <Button
                                    className="w-full justify-between"
                                    onClick={() => updateSelectedDatabaseName(database.name)}
                                >
                                    {snakeCaseToWords(database.name)}
                                    {selectedDatabaseNames.includes(database.name) ?
                                        <ChevronUp className="h-4 w-4" />
                                        :
                                        <ChevronDown className="h-4 w-4" />
                                    }
                                </Button>

                            </CollapsibleTrigger>
                            {database.sources.map((source) => {
                                return (
                                    <CollapsibleContent className="ml-3" key={source.name}>
                                        <Button variant="outline" size="sm" className="w-full justify-start">{snakeCaseToWords(source.name)}</Button>
                                    </CollapsibleContent>
                                )
                            })}

                        </Collapsible>
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-around p-3">
                <Button>Upload</Button>
                <Button>Create DB</Button>
            </div>
        </div>
    )
}

export default DatabaseSideNav;