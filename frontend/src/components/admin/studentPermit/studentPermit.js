import axios from "axios";
import { api } from "../../api";


export const collectStudent = (setLoading, setStudent,token, navigate) =>{
    axios.get(`${api}/collect_all_student`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        }).then((object)=>{
            // console.log(object.data);
            setLoading(false);
            setStudent(object.data);
        }).catch((err)=>{
            console.log(err, '####some err')
            navigate("/signIn")
        })
}

export const approveStudent = (userId,setApprovingId, setStudent, token, navigate) =>{
    setApprovingId(userId);

    axios.put(`${api}/users/${userId}/approve`,
        {},
        {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
    ).then((object)=>{
        console.log(object);
        setStudent((prevStudent)=>
                    prevStudent.map((item)=>
                    item.user.userId == userId ? {
                        ...item,
                        user : {
                            ...item.user,
                            status : 'ACTIVE'
                        }                        
                    } : item))
    }).catch((err)=>{
        console.log(err, '###')
        navigate('/signIn')
    }).finally(()=>{
        setApprovingId(null);
    })
}