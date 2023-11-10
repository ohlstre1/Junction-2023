from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS

async def vector_search():
    load_dotenv()

    key = os.environ["OPENAI_API_KEY"]

    query = "What is the current state of the union"

    embeddings = OpenAIEmbeddings(openai_api_key=key)

    new_db = FAISS.load_local("./faiss/state_of_the_union", embeddings)

    docs = await new_db.asimilarity_search(query)

    return docs[0].page_content