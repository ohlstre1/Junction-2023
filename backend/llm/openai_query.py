import os
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from .llm import vector_search
from data.dictionary import query_dict
import textwrap

template = """Given a question defined below, give a proper and a well-grounded answer.
Additionally, you are given information of data split up into pieces that you should base your answer on if it is relevant to the question.
DO NOT USE ANY OTHER INFORMATION! Only answer based on the given information pieces.
Your answer should try to include as much word-by-word phrases from the given information.

The information is given in the following form:

The various information pieces may contain overlap in information. That is okay.

Question: {question}

Information: {context}

Only use Information if it is relevant to the question

Answer: Include your answer, and specific parts of the relevant information given you checked against."""

async def create_info(source):
    rough_maximum_tokens = 4000 - 300
    rough_max_char = rough_maximum_tokens * 3.8 # 1 token ~= 4 chars
    info = ""
    for doc in source:
        info = info + doc[0].page_content + "\n\n"

    lines = textwrap.fill(info, rough_max_char)
    return lines

async def openai_query(user_query, dataset_path):
    load_dotenv()
    key = os.environ["OPENAI_API_KEY"]
    prompt = PromptTemplate(template=template, input_variables=["question", "context"])

    sources = await vector_search(user_query, dataset_path)
    info = await create_info(sources)

    llm = OpenAI(openai_api_key=key)
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    openai_res = llm_chain.run(question=user_query, context=info)

    return openai_res

