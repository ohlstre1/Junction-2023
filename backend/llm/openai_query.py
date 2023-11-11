import os
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from .llm import vector_search
from data.dictionary import query_dict

template = """Given a question defined below, give a proper and a well-grounded answer.
Additionally, you are given information of data split up into pieces that you should base your answer on.
DO NOT USE ANY OTHER INFORMATION! Only answer based on the given information pieces.
Your answer should try to include as much word-by-word phrases from the given information.

The information is given in the following form:
1. "information text"
2. "(newline)(newline) END OF THIS PIECE! (newline)(newline)"

The various information pieces may contain overlap in information. That is okay.

Question: {question}

Information: {context}

Answer: Include your answer, and specific parts of the information given you checked against."""

async def create_info(sources):
    info = ""
    for doc in sources:
        info = info + doc[0].page_content + "\n\n END OF THIS PIECE! \n\n"
    return info

async def openai_query(number):
    load_dotenv()
    key = os.environ["OPENAI_API_KEY"]
    prompt = PromptTemplate(template=template, input_variables=["question", "context"])
    query = query_dict[number]["query"]

    sources = await vector_search(number)
    info = await create_info(sources)

    llm = OpenAI(openai_api_key=key)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    query_res = llm_chain.run(question=query, context=info)

    return query_res

