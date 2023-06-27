from pydantic import BaseModel , Field , EmailStr
from typing import Optional

# User model
class UserSchema(BaseModel):
    fullname : str = Field(..., min_length=2)
    phone: int = Field(..., ge=1000000000)
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=8)
    dob: str = Field(..., min_length=4)
    gender: str = Field(...,min_length=1)
    country : str = Field(..., min_length=2)
    profilePhoto: Optional[bytes] = None


    class Config:
        schema_extra = {
            "example": {
                "fullname" : "Joe Doe",
                "email" : "joe@xyz.com",
                "password" : "anyanyany",
                "dob" : "03-03-2001",
                "gender" : "male",
                "country" : "India",
                "profilePhoto":"base64"
            }
        }

class UserLoginSchema(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "email": "joe@xyz.com",
                "password": "any"
            }
        }

class ImageData(BaseModel):
    image_data: str
    user_email: str