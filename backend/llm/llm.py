from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from data.dictionary import query_dict
from langchain.text_splitter import NLTKTextSplitter
import numpy as np

load_dotenv()
key = os.environ["OPENAI_API_KEY"]

async def create_openai_docs_arr(texts, docs_arr, sentence_arr, new_db):
    for text in texts:
        sentence = text.split("\n\n")
        for s in sentence:
            docs_arr.append(await new_db.asimilarity_search_with_score(s))
            sentence_arr.append(s)

    return 1


async def vector_search(query, dataset_path, openai_res = False):
    embeddings = OpenAIEmbeddings(openai_api_key=key)
    new_db = FAISS.load_local(dataset_path, embeddings)

    if(openai_res):
        # Split each sentence and similarity search against it
        docs_arr = []
        sentence_arr = []
        dict_arr = []
        text_splitter = NLTKTextSplitter(chunk_size=1000)
        texts = text_splitter.split_text(query)

        await create_openai_docs_arr(texts, docs_arr, sentence_arr, new_db)

        for i in range(0, len(docs_arr)):
            doc = docs_arr[i]
            s = sentence_arr[i]
            docs_dic = []
            for d in doc:
                d_dict = {
                    "content": d[0].page_content,
                    "distance": str(d[1]),
                    "ref": d[0].metadata["source"]
                }
                docs_dic.append(d_dict)
            dic = {
                "sentence": s,
                "docs": docs_dic
            }
            dict_arr.append(dic)

        return dict_arr
        
    else:
        # Similarity search the whole query
        return (await new_db.asimilarity_search_with_score(query))