from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader, SeleniumURLLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import os
from dotenv import load_dotenv
from langchain.vectorstores import FAISS
import json

def datasaver(number):
    load_dotenv()

    key = os.environ["OPENAI_API_KEY"]
    faiss_folder = ""
    documents = None

    if(number == 1):
        raw_documents = TextLoader('./data/state_of_the_union.txt').load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        documents = text_splitter.split_documents(raw_documents)
        faiss_folder = "state_of_the_union"
    elif (number == 2):
        urls = [
            "https://www.infofinland.fi/en/information-about-finland/finnish-climate"
        ]

        raw_documents = SeleniumURLLoader(urls=urls).load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        documents = text_splitter.split_documents(raw_documents)
        faiss_folder = "finnish_climate"
    else:
        return 0

    embeddings = OpenAIEmbeddings(openai_api_key=key)
    # Create vectors
    vectors = FAISS.from_documents(documents, embeddings)
    # Persist the vectors locally on disk
    vectors.save_local("./faiss/{}".format(faiss_folder))

    return 1

def datasaver_url(dataset, name, url):

        load_dotenv()

        key = os.environ["OPENAI_API_KEY"]
        faiss_folder = dataset
        urls = [url]

         # fetch previous data from dataset

        f = open('./faiss/sources.json')
        sources = json.load(f)
        for d in sources:
            if d["name"] == dataset:
                for s in d["sources"]:
                    urls.append(s["source"])

        raw_documents = SeleniumURLLoader(urls=urls).load()
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
        documents = text_splitter.split_documents(raw_documents)

        embeddings = OpenAIEmbeddings(openai_api_key=key)
        # Create vectors
        vectors = FAISS.from_documents(documents, embeddings)
        # Persist the vectors locally on disk
        vectors.save_local("./faiss/{}".format(faiss_folder))
        return