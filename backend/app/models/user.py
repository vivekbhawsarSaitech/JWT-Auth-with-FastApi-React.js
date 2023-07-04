from pydantic import BaseModel , Field , EmailStr
from typing import Optional

# User model
class UserSchema(BaseModel):
    name : str = Field(..., min_length=2)
    phone: int = Field(..., ge=1000000000)
    email: str = Field(..., min_length=5)
    password: str = Field(..., min_length=8)
    dob: str = Field(..., min_length=4)
    gender: str = Field(...,min_length=1)
    country : str = Field(..., min_length=2)
    profilePhoto: Optional[str] = None


    class Config:
        schema_extra = {
            "example": {
                "name" : "Joe Doe",
                "email" : "joe@xyz.com",
                "phone": 0000000000 ,
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