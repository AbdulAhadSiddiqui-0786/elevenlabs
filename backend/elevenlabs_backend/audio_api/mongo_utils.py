from pymongo import MongoClient
from django.conf import settings

def get_mongo_client():
    """Create and return a MongoDB client"""
    return MongoClient(settings.MONGODB_CONFIG['URI'])

def get_mongo_db():
    """Get the MongoDB database instance"""
    client = get_mongo_client()
    return client[settings.MONGODB_CONFIG['NAME']]

def get_audio_collection():
    """Get the audio collection from MongoDB"""
    db = get_mongo_db()
    return db['audio_languages']