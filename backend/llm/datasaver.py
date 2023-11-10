# from langchain.document_loaders import UnstructuredFileLoader
# from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
import os
from dotenv import load_dotenv
from langchain.vectorstores import FAISS
from dataloader import vector_search

load_dotenv()

key = os.environ["OPENAI_API_KEY"]

raw_documents = TextLoader('../data/state_of_the_union.txt').load()
text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
documents = text_splitter.split_documents(raw_documents)
# db = Chroma.from_documents(documents, OpenAIEmbeddings())

embeddings = OpenAIEmbeddings(openai_api_key=key)
# Create vectors
vectorstore = FAISS.from_documents(documents, embeddings)
# Persist the vectors locally on disk
vectorstore.save_local("../faiss/state_of_the_union")