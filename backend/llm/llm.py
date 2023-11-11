from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from data.dictionary import query_dict

async def vector_search(number):
    load_dotenv()
    key = os.environ["OPENAI_API_KEY"]
    embeddings = OpenAIEmbeddings(openai_api_key=key)
    
    query = query_dict[number]["query"]
    new_db = FAISS.load_local(query_dict[number]["faiss_files"], embeddings)

    docs = await new_db.asimilarity_search_with_score(query)

    return docs