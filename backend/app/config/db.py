from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import datetime

# MongoDB configuration
MONGO_HOST = "localhost"
MONGO_PORT = 27017
MONGO_DB = "authentication"
# MONGO_COLLECTION = "users"

# Connect to MongoDB
mongo_client = AsyncIOMotorClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}")
db = mongo_client[MONGO_DB]
user_details_collection = db["users"]
blacklisted_tokens_collection = db["blacklisted_tokens"]


async def fetch_one_user(email):
    document = await user_details_collection.find_one({"email": email})
    if document:
        document['_id'] = str(document['_id'])  # Convert ObjectId to string
    return document

async def fetch_all_users():
    cursor = user_details_collection.find()
    documents = []
    async for document in cursor:
        document['_id'] = str(document['_id'])  # Convert ObjectId to string
        documents.append(document)
    return documents

async def create_new_user(user_data):
    document = user_data
    result = await user_details_collection.insert_one(user_data)
    return document

async def save_blacklisted_token(token) -> bool:
    ttl = datetime.timedelta(hours=2)  # Set the desired TTL duration, such as 1 hour
    
    # Set the expiry time by adding the TTL duration to the current time
    expiry_time = datetime.datetime.utcnow() + ttl

    # Add the expiry time to the token document
    token['expiry_time'] = expiry_time

    document = await blacklisted_tokens_collection.insert_one(token)

    if document:
        # Create an index on the "expiry_time" field with the TTL option
        await blacklisted_tokens_collection.create_index("expiry_time", expireAfterSeconds=0)
        return True
    else:
        return False

async def is_token_blacklisted(token):
    result = await blacklisted_tokens_collection.find_one({'token':token})
    if result:
        return True
    else:
        return False

async def update_user_profile_picute(image_document):

    # Filter the document based on the user_email and update it with the image
    result = await user_details_collection.update_one(
        {"email":image_document['user_email']},
        {"$set": {"profilePhoto": image_document['image_bytes']}}
    )

    if result:
        return True
    else:
        return False
    
    
async def update_user_profile_data(user_data):

    # Filter the document based on the user_email and update it with the user_data
    result = await user_details_collection.update_one(
        {"email":user_data.email},
        {"$set": {"profilePhoto":user_data.profilePhoto , "gender":user_data.gender , "dob":user_data.dob , "phone": user_data.phone, "name":user_data.name}}
    )

    if result:
        return True
    else:
        return False