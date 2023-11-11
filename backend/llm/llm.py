from dotenv import load_dotenv
import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from data.dictionary import query_dict
from langchain.text_splitter import NLTKTextSplitter
from nltk.tokenize import word_tokenize
from nltk.metrics import accuracy



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

async def padding(shorter, longer, n):
    for i in range(0, n):
        shorter.append("")

async def find_similar_sentence(original_sentence, content):
    original_sentence_tokens = word_tokenize(original_sentence)
    print(original_sentence_tokens)

    best_match = None
    best_similarity = 0

    for sentence in content:
        sentence_tokens = word_tokenize(sentence)
        
        orig_len = len(original_sentence_tokens)
        sen_len = len(sentence_tokens)

        if (orig_len > sen_len):
            await padding(sentence_tokens, original_sentence_tokens, orig_len - sen_len)
        elif (sen_len > orig_len):
            await padding(original_sentence_tokens, sentence_tokens, sen_len - orig_len)

        simi = accuracy(original_sentence_tokens, sentence_tokens)

        if simi > best_similarity:
            best_similarity = simi
            best_match = sentence

    return best_match, best_similarity