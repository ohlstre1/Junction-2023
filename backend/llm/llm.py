from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from data.dictionary import query_dict

load_dotenv()
key = os.environ["OPENAI_API_KEY"]

async def vector_search(number, query = ""):
    embeddings = OpenAIEmbeddings(openai_api_key=key)
    
    query = query_dict[number]["query"] if query == "" else query
    print("?????????????++")
    print(query)
    new_db = FAISS.load_local(query_dict[number]["faiss_files"], embeddings)

    docs = await new_db.asimilarity_search_with_score(query)

    for doc in docs:
        print("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        print(doc)

    return docs

# async def openai_vector_search(number, query):
#     embeddings = OpenAIEmbeddings(openai_api_key=key)
    
#     new_db = FAISS.load_local(query_dict[number]["faiss_files"], embeddings)

#     docs = await new_db.asimilarity_search_with_score(query)

#     print("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
#     print(docs)

#     return docs