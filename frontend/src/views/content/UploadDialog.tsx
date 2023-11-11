import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios"
import { useEffect, useState } from "react"
import { snakeCaseToWords } from "./utils"
import { Loader2 } from "lucide-react"

interface UploadURL {
    dataset: string,
    name: string,
    url: string
}

export interface UploadDialogProps {
    refresh: () => void;
}

export function UploadDialog({ refresh }: UploadDialogProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [databaseNames, setDatabaseNames] = useState<string[]>([]);
    const [uploadURLData, setUploadURLData] = useState<UploadURL>({
        dataset: "",
        name: "",
        url: ""
    })
    const [upLoading, setUpLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/sources');
                setDatabaseNames(response.data.map((d: any) => d.name));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleUpload = async () => {
        if (upLoading) {
            return
        }
        if (uploadURLData.dataset === "" || uploadURLData.name === "" || uploadURLData.url === "") {
            console.log("Error in handleUpload values");
            return
        }
        try {
            setUpLoading(true);
            const formData = new FormData();
            formData.append('dataset', uploadURLData.dataset);
            formData.append('name', uploadURLData.name);
            formData.append('url', uploadURLData.url);

            await axios.post('http://localhost:5000/upload/url', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Data successfully uploaded!');

            setUploadURLData({
                dataset: "",
                name: "",
                url: ""
            })

            setDialogOpen(false);
            refresh();
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleInputChange = (name: string, value: string) => {
        setUploadURLData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDropDown = (value: string) => {
        handleInputChange("dataset", value);
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
            <Button onClick={() => setDialogOpen(!dialogOpen)}>Upload</Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader >
                    <DialogTitle>Upload Data</DialogTitle>
                    {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> */}
                </DialogHeader>
                <Tabs defaultValue="url">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="url">URL</TabsTrigger>
                        <TabsTrigger value="file">FILE</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full mb-3">
                                <Button variant={"outline"} className="w-full">
                                    Selected Dataset: {snakeCaseToWords(uploadURLData.dataset)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {databaseNames.map((databaseName) => {
                                    return (
                                        <DropdownMenuItem
                                            className='cursor-pointer'
                                            onClick={() => handleDropDown(databaseName)}>{snakeCaseToWords(databaseName)}</DropdownMenuItem>
                                    )
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Input className="mb-3" value={uploadURLData.name} type="text" placeholder="Name of source" onChange={e => {
                            handleInputChange("name", e.target.value);
                        }} />
                        <Input className="mb-3" value={uploadURLData.url} type="url" placeholder="Source URL" onChange={e => {
                            handleInputChange("url", e.target.value);
                        }} />
                    </TabsContent>
                    <TabsContent value="file">
                        FILE
                    </TabsContent>
                </Tabs>
                <DialogFooter>

                    <Button type="submit" onClick={() => handleUpload()}>
                        {upLoading ?
                            <Loader2 className="spinner" />
                            :
                            <>
                                Upload
                            </>
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}