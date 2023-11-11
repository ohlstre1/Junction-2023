from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS

async def vector_search(number):
    load_dotenv()
    key = os.environ["OPENAI_API_KEY"]
    embeddings = OpenAIEmbeddings(openai_api_key=key)
    
    if(number == 1):
        query = "Did biden say this: 'the State of the Union is strong—because you, the American people, are strong'"
        new_db = FAISS.load_local("./faiss/state_of_the_union", embeddings)
    elif(number == 2):
        query = "How is the climate in Finland?"
        new_db = FAISS.load_local("./faiss/finnish_climate", embeddings)        

    docs = await new_db.asimilarity_search_with_score(query)

    print(docs)

    return docs[0].page_content