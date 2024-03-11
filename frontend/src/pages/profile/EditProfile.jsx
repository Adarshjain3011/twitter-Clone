import React, { useState } from 'react'

import { MdOutlineEmail } from "react-icons/md";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { MdLink } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";

import { BiBody } from "react-icons/bi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import ximage from "../../assets/ximage.png";

import user from "../../assets/defaultUser.png";
import AuthServices from '../../services/AuthService';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditProfile = () => {

    const location = useLocation();

    const data = location.state;  // it is used to extract the data which is sent during the useNaviagte hook  

    console.log("so whole user profile data is ", data);

    // Split the date string into day, month, and year components

    const dateParts = data[0]?.addtionalDetails?.Dob?.split("-");


    // Extract the day, month, and year

    console.log(data[0]?.addtionalDetails.Dob);

    let day ;
    let month;
    let year;

    if(dateParts){

        console.log("dat parts ",dateParts);
        day = parseInt(dateParts[2]);
        month = parseInt(dateParts[1]);
        year = parseInt(dateParts[0]);

    }


    console.log(day,month,year);

    // Create a new Date object
    let date = new Date(year, month - 1, day); // Month in JavaScript starts from 0

    // Format the date object to the desired format "yyyy-MM-dd"
    // let formattedDate = date?.toISOString()?.slice(0, 10);


    // console.log("new format ",formattedDate);

    let formattedDate;

    const[profileImage,setProfileImage] = useState(data[0]?.userImage);

    const[actualProfileImage,setActualProfileImage] = useState('');


    const AdditionalFields = [

        {

            name: "name",
            placeHolder: "Enter Your Name",
            value: data[0].name,
            type: "text",
            isReadOnly: true,
            icon: <FaRegUser></FaRegUser>

        },
        {

            name: "email",
            type: "email",
            value: data[0].email,
            placeHolder: "Enter your Email",
            isReadOnly: true,
            icon: <MdOutlineEmail></MdOutlineEmail>

        },
        {

            name: "bio",
            type: "text",
            value: data[0].bio,
            placeHolder: "Enter about YourSelf",
            isReadOnly: false,
            icon: <FaRegMessage></FaRegMessage>

        },

        {

            name: "city",
            type: "text",
            value: data[0].addtionalDetails.city,
            placeHolder: "Enter your City",
            isReadOnly: false,
            icon: <IoLocationOutline></IoLocationOutline>

        },


        {

            name: "ContactNo",
            type: "number",
            value: data[0].addtionalDetails.ContactNo,
            placeHolder: "Enter Your Phone Number",
            isReadOnly: false,
            icon: <MdOutlinePermPhoneMsg></MdOutlinePermPhoneMsg>

        },
        {

            name: "gender",
            type: "text",
            value: data[0].addtionalDetails.gender,
            placeHolder: "Enter Your Gender",
            isReadOnly: false,
            icon: <BiBody></BiBody>

        },
        {

            name: "dob",
            type: "date",
            value: formattedDate,
            placeHolder: "Enter Your Birth Of Date",
            isReadOnly: false,
            icon: <BiBody></BiBody>

        }


    ]


    const [formData, setFromData] = useState({ name: `${data[0].name}`,
     email:`${data[0].email}`, bio:`${data[0].addtionalDetails.bio}`,
      city:`${data[0]?.addtionalDetails?.city}`,
       ContactNo:`${data[0]?.addtionalDetails.ContactNo}`,
        gender:`${data[0]?.addtionalDetails.gender}`,
        Dob:`${formattedDate}`});



    function changeHandler(event) {

        console.log(event.target.value);

        console.log(event.target.name);

        setFromData((values) => ({ ...values, [event.target.name]: event.target.value }));

        console.log(formData);

    }



    async function submitHandler() {


        try {

            let forms = new FormData();


            console.log("form ka data ", formData);

            console.log("form ka data",formData[`email`]);

            let updatedUserProfileDetails ={};

            Object.keys(data[0].addtionalDetails).forEach((key)=>{



                if((data[0]?.addtionalDetails[key] !== formData[`${key}`] && key!=='_id' && key!=='__v' && key!=='coverImage') ){

                    if(formData[`${key}`]!==null && formData[`${key}`]!== undefined){

                        console.log("key name ",key);
                        console.log("add",data[0].addtionalDetails[key]);
    
                        console.log("from key ",formData[`${key}`]);
    
                        if(data[0].addtionalDetails[key]!== formData[`${key}`]){
    
                            updatedUserProfileDetails[key] = formData[`${key}`];

                            
                            // forms.append(key,formData[`${key}`]);

                            // console.log("from fay0",forms.get(key));
    
                        }

                    }

                }

            })

            console.log("new upadted data is ",updatedUserProfileDetails);


            Object.keys(updatedUserProfileDetails).forEach((key)=>{

                forms.append(key,updatedUserProfileDetails[key]);

            })

            if(actualProfileImage[0]){


                forms.append("userImage",actualProfileImage[0],actualProfileImage[0]?.name);

            }

            

            // console.log("new upadted data is ",forms.getAll());

            // forms.append()

            // console.log("actual user image",actualProfileImage[0],actualProfileImage[0].name);

            const response = await AuthServices.updateUserProfile(forms);

            console.log("response ka data ", response);

            toast.success("your Profile is upadted successfully ");



        }
        catch (error) {

            console.log(error);

        }

    }




    function fileAccessHandler() {

        var input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt, .pdf, .doc , .png , .jpg ,.jpeg ,.PNG,mp4,webm'; // specify accepted file types if needed

        // input.multiple = true;  // Allow selecting multiple files

        input.onchange = function (event) {

            if (event.target.files) {

                const selectedImages = Array.from(event.target.files);

                // console.log(Object.values(selectedImages)[0]);
                const imageUrls = selectedImages.map((file) => URL.createObjectURL(file));
                // const imageUrls = URL.createObjectURL(selectedImages);

                console.log("image url ",imageUrls[0]);

                setProfileImage(imageUrls[0]);

                setActualProfileImage(selectedImages);


            }

        };


        input.click();

    }




    return (

        <div className='w-full'>

            <div className='w-full border border-white/20 flex flex-col items-center overflow-y-auto p-3 gap-4'>

                <div className='w-[80px] h-[80px] flex justify-center items-center relative rounded-full'>

                    {/* X -logo  */}

                    <img src={ximage} alt="" className='h-full w-full bg-cover rounded-full'/>


                </div>

                <div className='relative'>

                    <div className='w-[150px] h-[150px] rounded-full p-3 border border-white/25'>

                        <img src={profileImage} alt="" className='w-full h-full bg-cover rounded-full'id='userImage'/>

                    </div>


                    <div className=' flex justify-center ietms-center absolute right-0 bottom-0' onClick={fileAccessHandler}>

                        <MdOutlineCameraAlt className='text-4xl'></MdOutlineCameraAlt>

                    </div>

                </div>

                <div className='flex flex-col gap-6'>

                    {

                        AdditionalFields.map((data) => (

                            <div className='flex w-[600px] bg-black'>

                                <div className='flex text-xl justify-center items-center p-2 rounded-l-xl bg-[#16181c]'>

                                    {data.icon}

                                </div>


                                <input type={data.type} placeholder={data.placeHolder} name={data.name}
                                    readOnly={data.isReadOnly} value={formData[data.name]}
                                    className='w-full h-12 p-7 text-xl
                              font-bold outline-none rounded-r-xl
                               bg-[#16181c]'

                                    onChange={changeHandler} />

                            </div>

                        ))
                    }
                </div>

                <div className='flex flex-col gap-8'>

                    <h1 className='text-4xl font-semibold text-center'>Click to save updates</h1>

                    <div className='flex justify-center text-black 
                    font-bold items-center w-[300px] 
                  bg-white/85 h-12 rounded-full' onClick={submitHandler}>

                        <p>Save</p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditProfile



