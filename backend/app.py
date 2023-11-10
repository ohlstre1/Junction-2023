from flask import Flask
from langchain.vectorstores import FAISS
import os
from dotenv import load_dotenv
from langchain.embeddings.openai import OpenAIEmbeddings
from llm.llm import vector_search
from llm.datasaver import datasaver

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

@app.route('/load')
async def load():
    datasaver()
    return "Loaded data sucessfully!"

@app.route('/query')
async def query():
    res = await vector_search()
    return res