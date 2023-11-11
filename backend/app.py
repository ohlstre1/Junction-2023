from flask import Flask
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from llm.llm import vector_search
from llm.datasaver import datasaver
import json
from llm.openai_query import openai_query
import timeit

app = Flask(__name__)

# from markupsafe import escape

# @app.route('/user/<username>')
# def show_user_profile(username):
#     # show the user profile for that user
#     return f'User {escape(username)}'

# @app.route('/post/<int:post_id>')
# def show_post(post_id):
#     # show the post with the given id, the id is an integer
#     return f'Post {post_id}'

# @app.route('/path/<path:subpath>')
# def show_subpath(subpath):
#     # show the subpath after /path/
#     return f'Subpath {escape(subpath)}'

# @app.route('/')
# def index():
#     return 'Index Page'    


@app.route('/datasave/<number>')
async def load(number):
    if(datasaver(int(number))):
        return "Loaded data sucessfully!"
    else: 
        return "Failed to load data!"

@app.route('/query/<number>')
async def query(number):
    res = await vector_search(int(number))
    return res

@app.route('/sources')
def sources():
    f = open('faiss/sources.json')
    sources = json.load(f)
    return json.dumps(sources)

@app.route('/openai_ask/<number>')
async def openai_ask(number):
    res = await openai_query(int(number))
    return res

@app.route('/openai_validate/<number>')
async def openai_validate(number):
    start = timeit.default_timer()
    query = await openai_query(int(number))
    docs = await vector_search(int(number), query)
    print(docs)
    stop = timeit.default_timer()

    print('Time: ', stop - start)  
    return "jee"
