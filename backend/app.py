from flask import Flask, request
from flask_cors import CORS
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from llm.llm import vector_search
from llm.datasaver import datasaver, datasaver_url
from llm.openai_query import openai_query
import timeit
import json

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])


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

@app.route('/openai_validate', methods=['POST'])
async def openai_validate():

    start = timeit.default_timer()
    user_query = request.get_json()["query"]
    dataset_folder = request.get_json()["dataset"]
    dataset_path = "./faiss/{}".format(dataset_folder)

    openai_res_query = await openai_query(user_query, dataset_path)
    docs = await vector_search(openai_res_query, dataset_path, True)
    stop = timeit.default_timer()

    print('Time: ', stop - start)  
    return json.dumps(docs)

@app.route('/upload/url', methods=['POST'])
def upload_url():
    dataset = request.form['dataset']
    name = request.form['name']
    url = request.form['url']
    
    datasaver_url(dataset, name, url)

    return "hey"
