from fastapi import Body, FastAPI , HTTPException , Depends , status , Query
from passlib.context import CryptContext
from models.user import UserSchema , UserLoginSchema 
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File

from bson.binary import Binary
import base64

from auth.auth_handler import signJWT
from auth.auth_bearer import JWTBearer

from config.db import (
    fetch_one_user , 
    create_new_user , 
    fetch_all_users ,
    save_blacklisted_token ,
    update_user_profile_picute,
    update_user_profile_data
    )

app = FastAPI() 

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create a CryptContext object
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# App Home page
@app.get("/", tags=["Home"])
async def index():
    return {"message": "Hello User"}


# User signup API endpoint
@app.post("/user/sign-up",   tags=["user-sign-up"], status_code=status.HTTP_201_CREATED)
async def signup(user: UserSchema = Body(...)):
    # Check if the user email already exists
    existing_user = await fetch_one_user(user.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username already exists")

    hashed_password = pwd_context.hash(user.password) # Hash the password using the CryptContext

    # Create a new user document
    user_data = {
        "name": user.name,
        "phone": user.phone,
        "email": user.email,
        "password": hashed_password,
        "dob": user.dob,
        "gender": user.gender,
        "country": user.country
    }

    result = await create_new_user(user_data) # Insert the user document into the collection

    if result:
        # Generate JWT token
        USER_JWT_TOKEN = signJWT(user.email)
        return {"message": "User created successfully", "token": USER_JWT_TOKEN,}
    else:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error")


# User sign-in API endpoint
@app.post("/user/sign-in", tags=["user-sign-in"])
async def login(user: UserLoginSchema = Body(...)):
    # Retrieve the user from the database using the email
    existing_user = await fetch_one_user(user.email)
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    # Compare the provided password with the stored hashed password
    if not pwd_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong login details")

    # Generate JWT token
    USER_JWT_TOKEN = signJWT(user.email)

    # return signJWT(user.email)
    return {"message": "User logged in successfully", "token": USER_JWT_TOKEN, "status_code": 200}


# Protected Route
@app.post("/test/authentication", dependencies=[Depends(JWTBearer())], tags=["Protected-Testing-Route"])
def add_post(post: UserLoginSchema):
    email = post.email 
    password = post.password
    return {
        "email": email,
        "password" : password
    }


# Blacklist the token 
@app.post("/token/blacklist"  , tags=["Blacklist the token "])
async def set_blacklist_token(token:dict):
    result = await save_blacklisted_token(token)
    if result:
        return {"message":"Token blacklisted Succesfully" , "status_code":200}
    else:
        return {"message":"There is an error" , "status_code":400}



# Fetch all users 
@app.get("/test/users/all" ,  tags=["All-users-Testing"])
async def all_users():
    result = await fetch_all_users()
    return result


# Fetch one user with email 
@app.get("/users/profile", dependencies=[Depends(JWTBearer())] , tags=["Fetch Single user data with email "])
async def single_user_data(email: str = Query(...)):
    result = await fetch_one_user(email)
    return result


@app.post("/users/profile/data", tags=["Update user profile data"])
async def set_user_profile_data(user:UserSchema):

    
    result = await update_user_profile_data(user)

    if result:
        return {"message":"User Data Updated Succesfully" , "status_code":200}
    else:
        return {"message":"There is an error" , "status_code":400}