# import json

# query_json =  """{ 
#     "1": {
#         "query": "Did biden say this: 'the State of the Union is strong—because you, the American people, are strong'",
#         "faiss_files": "./faiss/state_of_the_union"
#     },
#     "2": {
#         "query": "How is the climate in Finland?",
#         "faiss_files": "./faiss/finnish_climate"
#     }
# }"""


query_dict = {
    1: {
        "query": "Did biden say this: 'the State of the Union is strong—because you, the American people, are strong'",
        "faiss_files": "./faiss/state_of_the_union"
    },
    2: {
        "query": "How is the climate in Finland?",
        "faiss_files": "./faiss/finnish_climate"
    }
}