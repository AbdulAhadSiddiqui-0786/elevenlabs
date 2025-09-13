from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .mongo_utils import get_audio_collection

@api_view(['GET'])
def audio_list(request):
    """Get all audio files"""
    try:
        collection = get_audio_collection()
        audio_data = list(collection.find({}, {'_id': 0}))
        
        # Format response for frontend
        response_data = {}
        for item in audio_data:
            response_data[item['code']] = item['audio_url']
            
        return Response(response_data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def add_audio(request):
    """Add a new audio file (for admin use)"""
    try:
        collection = get_audio_collection()
        
        # Get data from request
        code = request.data.get('code')
        name = request.data.get('name')
        flag_code = request.data.get('flag_code')
        audio_url = request.data.get('audio_url')
        
        # Check if language already exists
        existing = collection.find_one({'code': code})
        if existing:
            return Response(
                {'error': 'Language already exists'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Insert new audio
        result = collection.insert_one({
            'code': code,
            'name': name,
            'flag_code': flag_code,
            'audio_url': audio_url
        })
        
        if result.inserted_id:
            return Response(
                {'message': 'Audio added successfully'}, 
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                {'error': 'Failed to add audio'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )